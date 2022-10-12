import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private http:HttpClient) { }

  onSignup(f:AuthData){
    this.http.post<AuthData>('http://localhost:3030/api/auth/signup', {
      email:f.email, password:f.password
    }).subscribe(data => console.log(data))
  }
  onLogin(f:AuthData){
    this.http.post<{token:string}>('http://localhost:3030/api/auth/login', {
      email:f.email, password:f.password
    }).subscribe(data => 
      this.token = data.token
      )
  }

  getToken(){
    return this.token;
  }

}
