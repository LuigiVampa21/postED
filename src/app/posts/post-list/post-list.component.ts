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
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubs = this.postService.getPostUpdated()
      .subscribe((posts:any) => { 
        this.posts = posts;
    })
    // this.route.paramMap.subscribe(v => console.log(v))

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

