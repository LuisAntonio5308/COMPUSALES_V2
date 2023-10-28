import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    posts: Post[] = [];
    private postsSub: Subscription;

    constructor(public postsService: PostService){}
    
    ngOnInit(){
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListerner()
        .subscribe((posts: Post[]) =>{
            this.posts = posts
        });
    }

    onDelete(postId: string){
          for (let i = 0; i < 2; i++) {
            this.postsService.deletePost(postId);
          this.ngOnInit();
          }
          
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }

}