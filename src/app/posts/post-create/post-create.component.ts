import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private id!:string | null;
  post: Post | undefined;
  isLoading = false;
  postForm!: FormGroup;
  imagePreview!: string;

constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {

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
    this.postForm.reset();         
    this.isLoading = false;
  }

    onGetSinglePost(){
      this.postService.getSinglePost(this.id)
    }

 }
