import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';
import { Subscription, tap } from 'rxjs'


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSubs = new Subscription();
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubs = this.postService.getPostUpdated()
      .subscribe((posts:any) => {
        console.log(posts);    
        this.posts = posts;
    })
  }

  ngOnDestroy(){
    this.postSubs.unsubscribe()
  }

  onEdit(){}
  
  onDelete(){}
  
}

