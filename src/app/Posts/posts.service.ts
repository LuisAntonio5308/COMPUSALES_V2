import {Injectable, assertPlatform} from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

import { Subject } from "rxjs";
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})

export class PostService{
    private posts: Post[] = []; //Primera Matriz
    private postsUpdate = new Subject<Post[]>(); //Actualizacion de los datos

    constructor (private http: HttpClient){
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
                    id: post._id
                };
            });
        }))
        .subscribe((PublicacionesTransformadas) => {
            this.posts = PublicacionesTransformadas;
            this.postsUpdate.next([...this.posts]);
        }, (error) => {
            console.error('Error al obtener publicaciones:', error);
        });
    }
    
    getPostUpdateListerner(){
        return this.postsUpdate.asObservable();
    }

    addPost(title: string, content: string, price: number){
        const post: Post = {
            id: null,
            title: title, 
            content: content,
            price: price
        };
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdate.next([...this.posts]);
        })
    }

    //Eliminar Post
    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            console.log('ELIMINADO');
        });
    }
}


