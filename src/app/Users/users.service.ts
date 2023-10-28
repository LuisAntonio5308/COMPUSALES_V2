import {Injectable, assertPlatform} from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";

import { Subject, Observable } from "rxjs";
import {map} from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";


@Injectable({providedIn: 'root'})

export class UserService{
    private users: User[] = []; //Primera Matriz
    private usersUpdate = new Subject<User[]>(); //Actualizacion de los datos
    private method1Called = new Subject<void>();

    private idUser: string;

  setIdUser(idUser: string) {
    this.idUser = idUser;
  }

  getIdUser() {
    return this.idUser;
  }

    constructor (private http: HttpClient, private dialog: MatDialog){
    }
    //Mensaje de Registrar
    

    //Cambiamos Posts
    getUsers(){
        this.http.get<{message: string, users: any}>('http://localhost:5000/api/users')
        .pipe(map((postData) => {
            return postData.users.map(post => {
                return {
                    user: post.user,
                    password: post.password,
                    role: post.role,
                    id: post._id
                };
            });
        }))
        .subscribe((PublicacionesTransformada) => {
            this.users = PublicacionesTransformada;
            this.usersUpdate.next([...this.users]);
        });}

    

    addUser(user: string, password: string, role: string){
        const post: User = {
            id: null,
            user: user, 
            password: password,
            role: role
        };

        this.http.post<{message: string}>('http://localhost:5000/api/users', post)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.users.push(post);
            this.usersUpdate.next([...this.users]);
        })
    }

    //Eliminar Post
    deleteUser(postId: string) {
        this.http.delete('http://localhost:5000/api/users/' + postId)
        .subscribe(() => {
            console.log('ELIMINADO');
        });
    }

    getUserUpdateListerner(){
        return this.usersUpdate.asObservable();
    }
    


}


