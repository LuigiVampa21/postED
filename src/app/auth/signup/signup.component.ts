import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading!:boolean
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSignup(f:NgForm){
    this.authService.onSignup(f.value);   
  }

}
