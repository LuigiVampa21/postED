import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  newPost!:string;
  enteredTitle= '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(){
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    }
    this.postCreated.emit(post)
  }

}
