import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs'


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
    this.postSubs = this.postService.getPostUpdated()
      .subscribe((posts:Post[]) => {
        this.posts = posts;
    })
  }

  ngOnDestroy(){
    this.postSubs.unsubscribe()
  }

  onEdit(){}
  
  onDelete(){}
  
}
