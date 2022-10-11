import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

 posts$ = new Subject<Post[]>();

 private posts: Post[] = [];

  constructor() { }

  getPosts(){
    return this.posts.slice();
  }

  getPostUpdated(){
    return this.posts$.asObservable();
  }

  addPost(title:string, content: string){
    const post: Post = {title:title, content: content}
    this.posts.push(post);
    this.posts$.next(this.posts)
  }
}
