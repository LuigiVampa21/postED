import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth.model'
import { Observable, Subject } from 'rxjs'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;
  private token!: string | undefined;
  private isAuth$ = new Subject<boolean>()
  private tokenTimer!: NodeJS.Timer;

  constructor(private http:HttpClient, private router: Router) { }

  onSignup(f:AuthData){
    this.http.post<AuthData>('http://localhost:3030/api/auth/signup', {
      email:f.email, password:f.password
    }).subscribe()
  }
  onLogin(f:AuthData){
    this.http.post<{token:string, expiring:number}>('http://localhost:3030/api/auth/login', {
      email:f.email, password:f.password
    }).subscribe(data => { 
      this.token = data.token;
      if(this.token){
        const expiresInDuration = data.expiring;   
        this.setAuthTimer(expiresInDuration)     
        this.isAuth = true;
        this.isAuth$.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime()+ expiresInDuration *1000);
        this.saveAuthData(this.token, expirationDate)
        this.router.navigateByUrl('/')
      }
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
    this.setAuthTimer(expiresIn / 1000)
    this.isAuth$.next(true)
  }

  getisAuth(){
    return this.isAuth;
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
    this.router.navigateByUrl('/')
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
  }

  private saveAuthData(token:string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString())
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate) return;
    return {
      token, 
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration:number){
    console.log(duration);
    this.tokenTimer = setTimeout(()=> {
      this.logout()
    },duration * 1000);
  }
}
