import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSubs = new Subscription();
  isLoading = false;
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.isLoading = true;
    this.postSubs = this.postService.getPostUpdated()
      // .subscribe((posts:any) => { 
      .subscribe((postData:{posts:Post[], postCount: number}) => { 
        // console.log(postData);
        this.isLoading = false;
        this.posts = postData.posts;
        console.log(postData.postCount); 
        this.totalPosts = postData.postCount;
        // console.log(this.posts);
        
    })
  }

  ngOnDestroy(){
    this.postSubs.unsubscribe()
  }
  
  onDelete(post:Post){
    const {id} = post;
    if(!id) return;
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage)
    })
    this.isLoading = false;
  }

  onEdit(){}

  onChangedPage(pageData:PageEvent){
    this.isLoading = true;
    console.log(pageData.pageSize);
    console.log(pageData);
    
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = +pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage)
    this.isLoading = false;
  }
}

