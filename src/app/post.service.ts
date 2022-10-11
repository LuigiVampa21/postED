import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

 private posts: Post[] = [];

  constructor() { }

  getPosts(){
    return this.posts.slice();
  }

  addPost(title:string, content: string){
    const post: Post = {title:title, content: content}
    this.posts.push(post)
  }
}
