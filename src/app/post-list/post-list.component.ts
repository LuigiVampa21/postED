import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() storedPost: any;

  posts:{title:string,content:string}[] = [
  ]
  constructor() { }

  ngOnInit(): void {
  }
  
}
