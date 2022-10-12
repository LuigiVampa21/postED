import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading!: boolean;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onLogin(f:NgForm){
     this.authService.onLogin(f.value)
  }

}
