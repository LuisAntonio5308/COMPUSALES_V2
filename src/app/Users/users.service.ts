import {Injectable, assertPlatform} from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";

import { Subject, Observable } from "rxjs";
import {map, tap} from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import {Router} from "@angular/router"
import { response } from "express";


@Injectable({providedIn: 'root'})

export class UserService{
    private users: User[] = []; //Primera Matriz
    private usersUpdate = new Subject<User[]>(); //Actualizacion de los datos
    
    //Id_User
    private idUser: string;
    //apiUrl: any;

  setIdUser(idUser: string) {
    this.idUser = idUser;
  }

  getIdUser() {
    return this.idUser;
  }

    constructor (private http: HttpClient, private dialog: MatDialog, private router: Router){
    }

    //Mensaje sencillo
    sendEmail(subject: string, body: string, to: string) {
        const emailData = {
          subject: subject,
          body: body,
          to: to
        };
    
        return this.http.post('http://localhost:5000/api/users/send-email', emailData);
      }

    //AQUI TERMINA MENSAJE SENCILLO
    

    //el metodo devuelve un observable que obtenemos del cliente http de Angular
    getUser(id:string){
        return this.http.get<{ _id: string, name: string, password: string, role: string, email: string, isVerified: boolean, imagePath: string}>(
            "http://localhost:5000/api/users/" + id
        );
    }

    //Cambiamos Posts
    getUsers(){
        this.http.get<{message: string, users: any}>('http://localhost:5000/api/users')
        .pipe(map((postData) => {
            return postData.users.map(post => {
                return {
                    name: post.name,
                    password: post.password,
                    role: post.role,
                    email: post.email,
                    id: post._id,
                    isVerified: post.isVerified,
                    imagePath: post.imagePath
                };
            });
        }))
        .subscribe((PublicacionesTransformada) => {
            this.users = PublicacionesTransformada;
            this.usersUpdate.next([...this.users]);
        });
    }

    getUserUpdateListerner(){
        return this.usersUpdate.asObservable();
    }

    //Actualizar Usuario
    updateUser(id: string, name: string, password: string, role: string, email: string, image: File | string){
       
        let postData: User | FormData;
        
        if(typeof (image) === "object"){
            postData = new FormData();
            postData.append("id", id);
            postData.append("user", name);
            postData.append("password", password);
            postData.append("role", role);
            postData.append("email", email);
            postData.append("isVerified", 'false');
            postData.append("image", image, name);
        } else{
            postData = {
                id: id,
                name: name,
                password: password,
                role: role,
                email: email,
                isVerified: false,
                imagePath: image
            } as User;
        }
        this.http.put("http://localhost:5000/api/users/"+ id, postData)
        .subscribe(response =>{
            const updateUser = [...this.users];
            const oldUserIndex = updateUser.findIndex(p => p.id === id);
            const user: User = {
                id: id,
                name: name,
                password: password,
                role: role,
                email: email,
                isVerified: false,
                imagePath: ""
            }
            updateUser[oldUserIndex] = user;
            this.users = updateUser;
            this.usersUpdate.next([...this.users]);
            this.router.navigate(["/"]);
        });
    }

    
    //Agregar cliente
    /*
    addClient(name: string, password: string, role: string, imagePath: string){
        /*const postData = new FormData();
        postData.append("name", name),
        postData.append("password", password),
        postData.append("role", role),
        postData.append("image", image, name);
        const user: User = {
            id: null, // No necesitas establecer el ID aquí, ya que será proporcionado por el servidor
            name: name,
            password: password,
            role: role,
            imagePath: imagePath
          };

        this.http.post<{message: string, user: User}>('http://localhost:5000/api/users', user)
        .subscribe((responseData) => {
        const NewUser: User = {
            id: responseData.user.id,
            name: name, 
            password: password,
            role: role,
            imagePath: imagePath
        };
            
            this.users.push(user);
            this.usersUpdate.next([...this.users]);
            //this.router.navigate(["/"]);
        })
        

    }*/

    
    //Agregar Usuario
    addUser(name: string, password: string, role: string, email: string, image: File): Observable<{ message: string, user: User, verificationToken: string }>{
        const postData = new FormData();
        postData.append("name", name);
        postData.append("password", password);
        postData.append("role", role);
        postData.append("email", email);
        postData.append("isVerified", 'false');
        postData.append("image", image, name);

        //return this.http.post<{message: string, user: User}>('http://localhost:5000/api/users', postData)
        return this.http.post<{ message: string, user: User, verificationToken: string }>('http://localhost:5000/api/users', postData).pipe(
        tap((responseData) => {
        const user: User = {
            id: responseData.user.id,
            name: name, 
            password: password,
            role: role,
            email: email,
            isVerified: false,
            imagePath: responseData.user.imagePath
            
        };
            
            this.users.push(user);
            this.usersUpdate.next([...this.users]);
            //this.router.navigate(["/"]);
        })
        //auth
        );
    }
    
    //aut
    verificarCuenta(token: string): Observable<any> {
        return this.http.get(`${'http://localhost:5000/api/users/'}+verificar/${token}`);
      }
      
       //Eliminar Post
    deleteUser(userId: string) {
        this.http.delete('http://localhost:5000/api/users/' + userId)
        .subscribe(() => {
            const updateUsers = this.users.filter(user => user.id ! == userId);
            this.users = updateUsers;
            this.usersUpdate.next([...this.users]); 
        });
    }
      

    

}


