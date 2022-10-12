import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  onSignup(f:AuthData){
    this.http.post<AuthData>('http://localhost:3030/api/auth/signup', {
      email:f.email, password:f.password
    }).subscribe(data => console.log(data))
  }
  onLogin(f:AuthData){
    this.http.post<AuthData>('http://localhost:3030/api/auth/login', {
      email:f.email, password:f.password
    }).subscribe(data => console.log(data))
  }
}
