import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { User } from "../user.model";
import { UserService } from "../users.service";
import {Subscription} from "rxjs";


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})

export class UserListComponent{
    //export class UserListComponent implements OnInit, OnDestroy{
    //Los users son los que se muestran en el user.list
    users: User[] = [];
    idUser = "";
    aux="";
    enter = true;
    isAccordionOpen = true;
    private usersSub: Subscription;

    constructor(public usersService: UserService){}
    

    ngOnInit(){
        this.usersService.getUsers();
        this.usersSub = this.usersService.getUserUpdateListerner()
        .subscribe((users: User[]) =>{
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
        
        if(this.idUser===''){
            window.alert('NO SE HA INICIADO SESION CORRECTAMENTE');
        }else{
            for (let i = 0; i < 2; i++) {
                if(this.idUser == postId){
                    if(this.enter == true){
                        window.alert('User in Use - Impossible Delete')
                        this.enter=false;
                    }
                }else{
                    this.usersService.deleteUser(postId);
                    this.ngOnInit();
                    this.ngOnDestroy();
                    // Reiniciar la página después de la eliminación
                   // window.location.reload();
                }
              }
              this.enter=true;

        }
        
    }

    ngOnDestroy(){
        this.usersSub.unsubscribe();
    }

}