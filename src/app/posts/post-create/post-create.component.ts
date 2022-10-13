import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/posts/post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service';




@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  private mode = 'create';
  private id!:string | null;
  private authSub = new Subscription()
  post: Post | undefined;
  isLoading = false;
  postForm!: FormGroup;
  imagePreview!: string;

constructor(private postService: PostService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.getisAuth$().subscribe( () => {
      this.isLoading = false;
    })
    this.postForm = new FormGroup({
      'title': new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl('', {validators: [Validators.required, Validators.minLength(1)]}),
      'image': new FormControl('', Validators.required)
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.postService.getSinglePost(this.id)
        .subscribe((data:any) => {
          this.post = data.data
          this.postForm.controls['title'].setValue(this.post?.title);
          this.postForm.controls['content'].setValue(this.post?.content);
          this.postForm.controls['image'].setValue(this.post?.imagePath);
        });
        this.isLoading = false;
      }else{
        this.mode = 'create';
        this.id = null;        
      }
    })

  }

  onImageDropped(event: Event){
    const file = (event.target as any).files[0];
    this.postForm.patchValue({image: file});
    this.postForm.get('image')?.updateValueAndValidity()
    console.log(this.postForm.value.image);
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  onSavePost(){
    if(this.postForm.invalid) return;
    this.isLoading = true;
    if(this.mode === 'create'){
      const post:Post = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
      }
      this.postService.addPost(post.title, post.content, this.postForm.value.image)
      
    }else{
      const post:Post = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        id: this.id,
        imagePath: this.postForm.value.image
      }
      this.postService.updatePost(post)
    }
    this.isLoading = false;
  }

    onGetSinglePost(){
      this.postService.getSinglePost(this.id)
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }
}
