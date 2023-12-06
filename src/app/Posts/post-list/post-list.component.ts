import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import {Subscription} from "rxjs";
import { UserService } from "src/app/Users/users.service";
import { PdfService } from '../pdf.service';


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    posts: Post[] = [];
    idUser = "";
    aux="";
    enter = true;

    private postsSub: Subscription;

    isLoading = false;

    constructor(public postsService: PostService, private pdfService: PdfService){}
    
    ngOnInit(){
        this.isLoading =true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListerner()
        .subscribe((posts: Post[]) =>{
            this.isLoading = false;
            this.posts = posts
        });

         
        
    }

    onDelete(postId: string){
        this.postsService.deletePost(postId);

        /*
          for (let i = 0; i < 2; i++) {
            this.postsService.deletePost(postId);
          this.ngOnInit();
          }*/
          
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }

    onPrint() {
        // Llama al servicio de PDF para generar el PDF
        this.pdfService.generatePdf(this.posts);
      }
    

}