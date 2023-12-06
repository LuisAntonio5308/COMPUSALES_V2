
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/Users/users.service";
import { FormGroup } from "@angular/forms";
import { User } from "src/app/Users/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit, OnDestroy {


  posts: Post[] = [];
  private postsSub: Subscription;

  //User
  users: User[] = [];
    isLoading = false;
    idUser = "";
    aux="";
    enter = true;
    isAccordionOpen = true;
    private usersSub: Subscription;




  showProgressBar = false; // Variable para controlar la visibilidad del progress bar

  constructor(public postsService: PostService, public usersService: UserService, private router: Router) { }
  
    
    ngOnInit(){


        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListerner()
        .subscribe((posts: Post[]) =>{
            this.posts = posts

        });


        this.usersService.getUsers();
        this.usersSub = this.usersService.getUserUpdateListerner()
        .subscribe((users: User[]) =>{
            this.isLoading = false;
            this.users = users
        });

         //Traer el id y verificar que no sea Indefinido
         this.aux = this.usersService.getIdUser();
         if(this.aux !== undefined){
             if(this.idUser == ''){
                 this.idUser = this.aux;
             }
         }

    }

    onDelete(postId: string){
      // Mostrar el progress bar cuando se inicia la eliminación
    this.showProgressBar = true;
    // Simular una demora de 2 segundos antes de completar la eliminación
    setTimeout(() => {

      this.showProgressBar = false;


      }, 1500); // 2000 milisegundos (2 segundos)
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }

    currentIndex: number = 0;

    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.posts.length) % this.posts.length;
    }
  
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.posts.length;
    }


    addClient(postId: string, title: string, content: string, price: number, image: string){
      
      if(this.idUser===''){
        window.alert('NO SE HA INICIADO SESION CORRECTAMENTE');
        this.router.navigate([''])

        
    }else{
      this.postsService.addClient(postId, title, content, price,this.idUser, image);
      window.alert('Se ha Agregado al Carrito: '+title);
    }
  }


 
  
}
