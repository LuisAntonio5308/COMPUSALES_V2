import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { User } from "../user.model";
import { UserService } from "../users.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy{
    users: User[] = [];
    private usersSub: Subscription;

    constructor(public usersService: UserService){}
    
    ngOnInit(){
        this.usersService.getUsers();
        this.usersSub = this.usersService.getUserUpdateListerner()
        .subscribe((users: User[]) =>{
            this.users = users
        });
    }

    onDelete(postId: string){
        this.usersService.deleteUser(postId);
        
        // Reiniciar la página después de la eliminación
        window.location.reload();
    }

    ngOnDestroy(){
        this.usersSub.unsubscribe();
    }

}