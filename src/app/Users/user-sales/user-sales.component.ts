import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, windowWhen } from 'rxjs';
import { Post } from 'src/app/Posts/post.model';
import { PostService } from 'src/app/Posts/posts.service';
import { UserService } from '../users.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['./user-sales.component.css']
})
export class UserSalesComponent implements OnInit, OnDestroy{

  posts: Post[] = [];
  sales: Post[] = [];
  users: User[] = [];
  isLoading = false;

    idUser = "";
    aux="";
    enter = true;
    Price = 0;

    private postsSub: Subscription;

    
     //User
  isAccordionOpen = true;
  private usersSub: Subscription;

    constructor(public postsService: PostService, public usersService: UserService, private router: Router){}
    
    ngOnInit(){
        this.isLoading =true;

        
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

        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListerner()
        .subscribe((posts: Post[]) =>{
            this.isLoading = false;
            this.posts = posts
            this.sales = this.posts.filter(element => element.client === this.idUser);
            
        });
        

        
    }

    onDelete(postId: string){
        this.postsService.deletePost(postId);

          
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }

    compra(){
      this.sales.forEach(element => {
        this.Price = this.Price + element.price;
      });

      if(this.Price==0){
        window.alert('No hay Computadoras');
        this.router.navigate(['/client'])
        

      }else{
        window.alert('Su precio es de: $'+this.Price+'.00 mxn  Son ' +this.sales.length+ ' Computadoras')
        this.Price=0;

      }
    }

    regresar(){
      this.router.navigate(['/client'])
    }

}
