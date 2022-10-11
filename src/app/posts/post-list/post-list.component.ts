import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSubs = new Subscription();
  isLoading = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.isLoading = true;
    this.postSubs = this.postService.getPostUpdated()
      .subscribe((posts:any) => { 
        this.isLoading = false;
        this.posts = posts;
    })
  }

  ngOnDestroy(){
    this.postSubs.unsubscribe()
  }

  onEdit(){}
  
  onDelete(post:Post){
    const {id} = post;
    if(!id) return;
    this.postService.deletePost(id)
  }
}

