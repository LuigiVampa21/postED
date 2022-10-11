import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private id!:string | null;
  public post: Post | undefined;

constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.post = this.postService.getSinglePost(this.id);
      }else{
        this.mode = 'create';
        this.id = null;        
      }
    })

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

    onGetSinglePost(){
      this.postService.getSinglePost(this.id)
    }
 }
