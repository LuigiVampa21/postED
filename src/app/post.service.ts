import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {

 posts$ = new Subject<Post[]>();

 private posts: Post[] = [];

  constructor(private http: HttpClient) { }

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

  addPost(title:string, content: string){
    const post: Post = {id:null, title:title, content: content}
    this.http.post('http://localhost:3030/api/posts', post)
        .subscribe((data:any) => {
          post.id = data.data._id
          console.log(post);
          
          this.posts.push(post);
          this.posts$.next(this.posts)
        })
  }

  deletePost(id:string){
    this.http.delete(`http://localhost:3030/api/posts/${id}`)
      .subscribe(()=> {
        const updatedPost = this.posts.filter(post => post.id !== id);
        this.posts = updatedPost;
        this.posts$.next(this.posts)
      })
  }
}
