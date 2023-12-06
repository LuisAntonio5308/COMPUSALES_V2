import { Component, OnInit} from "@angular/core";

import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { postImage } from "./post-image.validator";
import { FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
  })

export class PostCreateComponent implements OnInit{
  ///segunda modificacion
  enteredTitle = '';
  enteredContent = '';
  enteredPrice = 0;

  private mode= 'create';
   private postId: string;
   post : Post;
   isLoading = false;
   form: FormGroup;
   imagePreview: string;

  constructor(public postsService: PostService, public route: ActivatedRoute){}

  ngOnInit() {
    this.form = new FormGroup({
        'title': new FormControl(null, {
            validators: [Validators.required, Validators.minLength(2)]}),
        'content': new FormControl(null, {
            validators: [Validators.required]}),
            'price': new FormControl(null, {
              validators: [Validators.required]}),
        'image': new FormControl(null, {
            validators: [Validators.required],
        asyncValidators: [postImage]})
    });
       this.route.paramMap.subscribe((paramMap: ParamMap) =>{
        if(paramMap.has('postId')){
            this.mode = 'edit';
            this.postId = paramMap.get('postId');
            this.isLoading = true;
           // Obtener subscripcion de los datos del post
            this.postsService.getPost(this.postId).subscribe(postData =>{
                //para que se detenga el pogressbar
                this.isLoading = false;
                this.post = {
                    id: postData._id, 
                    title: postData.title, 
                    content: postData.content, 
                    price: postData.price,
                    imagePath: postData.imagePath};
                this.form.setValue({
                    title: this.post.title,
                    content: this.post.content,
                    price: this.post.price,
                    image: this.post.imagePath
                });
            });
            
        }else{
            this.mode= 'create';
            this.postId = null;
        }
       })
   }

   onSavePost(){
    if(this.form.invalid){
      return;
  }
  this.isLoading = true;
if(this.mode == 'create'){
  this.postsService.addPost(
      this.form.value.title, 
      this.form.value.content,
      this.form.value.price, 
      this.form.value.image);
}else{
  this.postsService.updatePost(
      this.postId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.price,
      this.form.value.image
      
  );
}
this.form.reset();
    /*
    if(form.invalid){
      return;
      }
        this.postsService.addPost(form.value.title, form.value.content, form.value.price);
        form.resetForm();
        // Reiniciar la página después de la eliminación
        //window.location.reload();*/

    }


    onImagePicked(event: Event){
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
      console.log(file);
      const reader = new FileReader();
      reader.onload = () =>{
          this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
  }
  }



