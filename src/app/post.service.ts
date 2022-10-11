import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';
import { Subject } from 'rxjs';
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
        .subscribe((data:any) => {
          this.posts = data.data;          
          this.posts$.next(this.posts)
        })
  }

  getPostUpdated(){
    return this.posts$.asObservable();
  }

  addPost(title:string, content: string){
    const post: Post = {id:null, title:title, content: content}
    this.http.post('http://localhost:3030/api/posts', post)
        .subscribe(data => {
          console.log(data); 
        })
    // // this.posts.push(post);
    // this.posts$.next(this.posts)
  }
}
