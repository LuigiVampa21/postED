import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class PostService {

 posts$ = new Subject<{posts: Post[], postCount: number}>();
 results!:number;

 private posts: Post[] = [];

  constructor(private http:HttpClient, private router:Router) { }

  getPosts(postsPerPage:number, currentPage:number){
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`
    return this.http.get<{results: number, data:any}>('http://localhost:3030/api/posts' + queryParams)
    .pipe(map((data:any) => {  
      console.log(data);
          this.results = data.results 
      return data.data.map((post: any) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath
        }
      })
    }))
      .subscribe((data:any) => {
          this.posts = data;   
          // console.log(data);                 
          this.posts$.next({posts: data, postCount: this.results})
        })
  }

  getPostUpdated(){
    return this.posts$.asObservable();
  }

  getSinglePost(id:string|null){
    // console.log(id);
    
    return this.http.get(`http://localhost:3030/api/posts/${id}`)
  }

  addPost(title:string, content: string, image: File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image);
    this.http.post('http://localhost:3030/api/posts', postData)
        .subscribe((data:any) => {
          this.router.navigateByUrl('/')
        })
  }

  deletePost(id:string){
   return this.http.delete(`http://localhost:3030/api/posts/${id}`)
  }

  updatePost(post:Post){
    const {id, title, content, imagePath} = post;
    let postData: Post | FormData;
    if(typeof imagePath === "object"){
      postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', imagePath); 
    }else{
      postData = {
        id,
        title,
        content,
        imagePath
      }      
    }
    this.http.patch(`http://localhost:3030/api/posts/${id}`, postData)
        .subscribe( (data:any) => {
          this.router.navigateByUrl('/')
        } )
  }
}
