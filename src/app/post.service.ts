import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { any } from 'joi';



@Injectable({
  providedIn: 'root'
})
export class PostService {

 posts$ = new Subject<Post[]>();

 private posts: Post[] = [];

  constructor(private http:HttpClient, private router:Router) { }

  getPosts(){
    return this.http.get<Post[]>('http://localhost:3030/api/posts')
    .pipe(map((data:any) => {
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
          this.posts$.next(this.posts)
        })
  }

  getPostUpdated(){
    return this.posts$.asObservable();
  }

  getSinglePost(id:string|null){
    console.log(id);
    
    return this.http.get(`http://localhost:3030/api/posts/${id}`)
  }

  addPost(title:string, content: string, image: File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image);
    this.http.post('http://localhost:3030/api/posts', postData)
        .subscribe((data:any) => {
          const post: Post = {
            id: data.data.id,
            title: title,
            content: content,
            imagePath: data.data.imagePath
          }
          this.posts.push(post);
          this.posts$.next(this.posts);
          this.router.navigateByUrl('/')
        })
  }

  deletePost(id:string){
    this.http.delete(`http://localhost:3030/api/posts/${id}`)
      .subscribe(()=> {
        const updatedPost = this.posts.filter(post => post.id !== id);
        this.posts = updatedPost;
        this.posts$.next(this.posts);
        this.router.navigateByUrl('/')
      })
  }

  updatePost(post:Post){
    const {id, title, content, imagePath} = post;
    console.log(id);
    console.log(typeof imagePath);
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
      console.log(postData);
      
    }
    this.http.patch(`http://localhost:3030/api/posts/${id}`, postData)
        .subscribe( (data:any) => {
          console.log(data.data.imagePath);
          
          const postIndex = this.posts.findIndex(p => p.id === id);
          this.posts[postIndex]= data.data;
          const post: Post = {
            id,
            title,
            content,
            imagePath
          }
          // this.posts.push(post);
          // console.log(this.posts);
          this.posts$.next(this.posts);
          this.router.navigateByUrl('/')
        } )
  }
}
