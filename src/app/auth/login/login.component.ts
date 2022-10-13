import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  authSubs = new Subscription();
  isLoading= false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubs = this.authService.getisAuth$()
      .subscribe(()=>{
        this.isLoading = false
      }
      )
  }

  onLogin(f:NgForm){
    this.isLoading = true;
    this.authService.onLogin(f.value);
  }
  
  ngOnDestroy(): void {
    this.authSubs.unsubscribe()
  }

}


