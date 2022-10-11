import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm){
    if(form.invalid) return;
      const post:Post = {
        title: form.value.title,
        content: form.value.content
      }
      this.postService.addPost(post.title, post.content)
      form.reset();
    }
 }
