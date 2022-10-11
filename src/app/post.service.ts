import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



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
          id: post._id
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
    return this.http.get(`http://localhost:3030/api/posts/${id}`)
  }

  addPost(title:string, content: string){
    const post: Post = {id:null, title:title, content: content}
    this.http.post('http://localhost:3030/api/posts', post)
        .subscribe((data:any) => {
          post.id = data.data._id
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
    const {id, title, content} = post;
    this.http.patch(`http://localhost:3030/api/posts/${id}`, {title,content})
        .subscribe( () => {
          this.posts.push(post);
          this.posts$.next(this.posts);
          this.router.navigateByUrl('/')
        } )
  }
}
