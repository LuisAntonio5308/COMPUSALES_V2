import {Injectable, assertPlatform, numberAttribute} from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

import { Subject } from "rxjs";
import {map} from 'rxjs/operators';
import { response } from "express";
import {Router} from "@angular/router"


@Injectable({providedIn: 'root'})

export class PostService{
    private posts: Post[] = []; //Primera Matriz
    private postsUpdate = new Subject<Post[]>(); //Actualizacion de los datos

    constructor (private http: HttpClient, private router: Router){
    };
    
    //Cambiamos Posts
    getPosts(){
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    price: post.price,
                    id: post._id,
                    imagePath: post.imagePath
                };
            });
        }))
        .subscribe((PublicacionesTransformadas) => {
            this.posts = PublicacionesTransformadas;
            this.postsUpdate.next([...this.posts]);
        });
    }

    getPost(id:string){
        return this.http.get<{ _id: string, title: string, content: string, price: number, imagePath: string}>(
            "http://localhost:3000/api/posts/" + id
        );
    }

    updatePost(id: string, title: string, content: string, price: number, image: File | string){
        //const post: Post = {id: id, title: title, content: content, imagePath: null}
        let postData: Post | FormData;
        
        if(typeof (image) === "object"){
            postData = new FormData();
            postData.append("id", id);
            postData.append("title", title);
            postData.append("content", content);
            postData.append('price', price.toString());
            postData.append("image", image, title);
        } else{
            postData = {
                id: id,
                title: title,
                content: content,
                price: price,
                imagePath: image
            } as Post;
        }
        this.http.put("http://localhost:3000/api/posts/"+ id, postData)
        .subscribe(response =>{
            const updatePost = [...this.posts];
            const oldPostIndex = updatePost.findIndex(p => p.id === id);
            const post: Post = {
                id: id,
                title: title,
                content: content,
                price: price,
                imagePath: ""
            }
            updatePost[oldPostIndex] = post;
            this.posts = updatePost;
            this.postsUpdate.next([...this.posts]);
            this.router.navigate(["/"]);
        });
    }
    
    getPostUpdateListerner(){
        return this.postsUpdate.asObservable();
    }

    addPost(title: string, content: string, price: number, image: File){

        const postData = new FormData();
        postData.append("title", title),
        postData.append("content", content),
        postData.append("price", price.toString()),
        postData.append("image", image, title);

        this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
        .subscribe((responseData) => {
            const post: Post = {
                id: responseData.post.id, 
                title: title,
                content: content,
                price: price,
                imagePath: responseData.post.imagePath};
            this.posts.push(post);
            this.postsUpdate.next([...this.posts]);
            this.router.navigate(["/"]);
        })
    }

    //Eliminar Post
    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            const updatePosts = this.posts.filter(post => post.id ! == postId);
            this.posts = updatePosts;
            this.postsUpdate.next([...this.posts]); 
        });
    }
}


