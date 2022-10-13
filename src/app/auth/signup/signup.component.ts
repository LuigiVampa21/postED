import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  authSubs = new Subscription();
  isLoading = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubs = this.authService.getisAuth$()
      .subscribe(()=>{
        this.isLoading = false
      }
      )
  }

  onSignup(f:NgForm){
    this.isLoading = true;
    this.authService.onSignup(f.value);
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe()
  }
}
