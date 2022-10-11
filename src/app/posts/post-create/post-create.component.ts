import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  newPost!:string;
  @Output() postCreated = new EventEmitter<Post>();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm){
    if(form.invalid){
       return
      }else{

        const post:Post = {
          title: form.value.title,
          content: form.value.content
        }
        console.log(form);
        
        this.postCreated.emit(post)
      }
    }

}
