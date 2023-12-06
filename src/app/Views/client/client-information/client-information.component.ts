import { Component } from '@angular/core';
import { User } from 'src/app/Users/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Users/users.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-client-information',
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.css']
})
export class ClientInformationComponent {
  //export class UserListComponent implements OnInit, OnDestroy{
    //Los users son los que se muestran en el user.list
    users: User[] = [];
    isLoading = false;
    idUser = "";
    aux="";
    enter = true;
    isAccordionOpen = true;
    private usersSub: Subscription;
    private mode= 'create';
    private userId: string;
    user : User;
    form: FormGroup;
    imagePreview: string;

    constructor(public usersService: UserService, private route: ActivatedRoute){}
    

    ngOnInit(){
        this.isLoading = true;
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

        this.route.paramMap.subscribe((paramMap: ParamMap) =>{
          if(paramMap.has('userId')){
              this.userId = this.idUser;
              this.isLoading = true;
             // Obtener subscripcion de los datos del post
              this.usersService.getUser(this.userId).subscribe(postData =>{
                  //para que se detenga el pogressbar
                  this.isLoading = false;
                  this.user = {
                      id: postData._id, 
                      name: postData.name, 
                      password: postData.password, 
                      role: postData.role,
                      email: postData.email,
                      isVerified: postData.isVerified,
                      imagePath: postData.imagePath};
                  this.form.setValue({
                      name: this.user.name,
                      password: this.user.password,
                      role: this.user.role,
                      email: this.user.email,
                      isVerified: this.user.isVerified,
                      image: this.user.imagePath
                  });
              });
              
          }
         })



    }


    ngOnDestroy(){
        this.usersSub.unsubscribe();
    }

    information(userId: string){

      
  }

}
