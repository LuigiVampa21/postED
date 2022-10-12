import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getisAuth()
    this.authService.getisAuth$()
    .subscribe(
      (t:boolean) => {
        this.isAuth = t;
        console.log(t)
      }
      )
    }

    onLogout(){
      this.authService.logout()
    }

}
