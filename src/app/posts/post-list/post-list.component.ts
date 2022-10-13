import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/posts/post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSubs = new Subscription();
  authSubs = new Subscription();
  isLoading = false;
  totalPosts = 0;
  postPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  isAuth!:string|boolean;
  userID!:string|null;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.isLoading = true;
    this.userID = this.authService.getUserID();
    this.postSubs = this.postService.getPostUpdated()
      .subscribe((postData:{posts:Post[], postCount: number}) => { 
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
        this.userID = this.authService.getUserID();        
    });
    this.isAuth = this.authService.getisAuth();
    // this.authSubs = this.authService.getTokenObs().subscribe((t:string)=>{
    //   this.token = t;
    //   console.log(this.token);
    //   console.log(t);
    // })
  }

  ngOnDestroy(){
    this.postSubs.unsubscribe();
    // this.authSubs.unsubscribe();
  }
  
  onDelete(post:Post){
    const {id} = post;
    if(!id) return;
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage)
    }, () => {
      this.isLoading = false;
    })
  }

  onEdit(){}

  onChangedPage(pageData:PageEvent){
    this.isLoading = true;    
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = +pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage)
    this.isLoading = false;
  }
}

