import { Component } from '@angular/core';
import { any } from 'joi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'postED';

  posts:{title:string,content:string}[] = [];

  onReceivePost(post:any){
    console.log(post);
    this.posts.push(post)
  }
}
