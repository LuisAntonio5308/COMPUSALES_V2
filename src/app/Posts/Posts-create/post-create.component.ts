import { Component} from "@angular/core";

import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";
import { withNoDomReuse } from "@angular/platform-browser";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
  })

export class PostCreateComponent{
  ///segunda modificacion
  enteredTitle = '';
  enteredContent = '';
  enteredPrice = 0;


  constructor(public postsService: PostService){}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
      }
        this.postsService.addPost(form.value.title, form.value.content, form.value.price);
        form.resetForm();
        // Reiniciar la página después de la eliminación
        window.location.reload();
    }
  }



