import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() storedPost: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    
  }
  
}
