import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth.model'
import { Observable, Subject } from 'rxjs'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;
  private token!: string | undefined;
  private isAuth$ = new Subject<boolean>()
  private tokenTimer!: NodeJS.Timer;
  private userID!: string|null;
  private API = environment.API_URL;

  constructor(private http:HttpClient, private router: Router) { }

  onSignup(f:AuthData){
   this.http.post<AuthData>(`${this.API}/auth/signup`, {
      email:f.email, password:f.password
    }).subscribe(() => {
      this.router.navigateByUrl('/')
    }, () => {
      this.isAuth$.next(false)
    } )
  }
  onLogin(f:AuthData){
    this.http.post<{token:string, expiring:number, data:{_id:string}}>(`${this.API}/auth/login`, {
      email:f.email, password:f.password
    }).subscribe(data => { 
      this.token = data.token;
      this.userID = data.data._id;
      if(this.token){
        const expiresInDuration = +data.expiring;   
        this.setAuthTimer(expiresInDuration)     
        this.isAuth = true;
        this.isAuth$.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime()+ expiresInDuration *1000);
        this.saveAuthData(this.token, expirationDate, this.userID)
        this.router.navigateByUrl('/')
      }
    }, () => {
      this.isAuth$.next(false)
    }
      )
  }

  autoAuth(){
    const authInfo = this.getAuthData();
    if(!authInfo) return;
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn < 0) return;
    this.token = authInfo.token;
    this.isAuth = true;
    this.userID = authInfo.userID;
    // this.setAuthTimer(expiresIn / 1000)
    this.setAuthTimer(expiresIn)
    this.isAuth$.next(true)
  }

  getisAuth(){
    return this.isAuth;
  }

  getUserID(){
    return this.userID;
  }

  getToken(){
    return this.token;
  }
  getisAuth$():Observable<boolean>{
    return this.isAuth$.asObservable()
  }

  logout(){
    this.token = undefined;
    this.isAuth= false;
    this.isAuth$.next(false);
    this.router.navigateByUrl('/');
    clearTimeout(this.tokenTimer);
    this.userID = null;
    this.clearAuthData();
  }

  private saveAuthData(token:string, expirationDate: Date, userID:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('userID', userID);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userID = localStorage.getItem('userID');
    if(!token || !expirationDate || !userID) return;
    return {
      token, 
      expirationDate: new Date(expirationDate),
      userID
    }
  }

  private setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(()=> {
      this.logout()
    },duration * 1000);
  }
}
