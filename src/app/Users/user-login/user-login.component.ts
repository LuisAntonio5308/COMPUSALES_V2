import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../users.service";
import { UserCreateComponent } from '../user-create/user-create.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from 'src/app/Posts/dialog/dialog.component';
import { OnDestroy, OnInit} from "@angular/core";
import { User } from "../user.model";
import {Subscription} from "rxjs";
import { Router } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { SignUpComponent } from '../sign-up/sign-up.component';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy{
  users: User[] = [];
  private usersSub: Subscription;

  hide = true;
  
  ///segunda modificacion
  enteredTitle = '';
  enteredContent = '';
  enteredRole = '';
  cliente = 'CLIENT';
  admin = 'ADMIN';

  constructor(public usersService: UserService, private router: Router, private dialog: MatDialog){}
//, private user: UserListComponent
  ngOnInit(){
    this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListerner()
    .subscribe((users: User[]) =>{
      this.users = users;

     /* this.users.forEach(element => {
        window.alert(element.user+element.id+element.password+element.role)
      });*/
        
    });
    
}

ngOnDestroy(){
    this.usersSub.unsubscribe();
}


  sign(){

    // Obtén una referencia al elemento de entrada de texto
const userElement = document.getElementById("user") as HTMLInputElement;
const user = userElement.value;
const passwordElement = document.getElementById("password") as HTMLInputElement;
const password = passwordElement.value;

this.users.forEach(element => {
  if(user==element.user && password==element.password){
    window.alert('ACCESO CONCEDIDO' + element.user);
      if(element.role == this.admin){
        //this.user.getUser(element.id);
        this.usersService.setIdUser(element.id);
        window.alert(element.id);
        this.router.navigate(['/admin'])

        
      }else{
        if(element.role == this.cliente){
            window.alert('HOLA CLIENTE '+ element.user)
            this.router.navigate(['/client'])

        }
      }
    
    }
  });
  }

  
  signup() {
    this.dialog.open(SignUpComponent);
    
  
  }

  login(form: NgForm){

    if(form.invalid){
      console.log('no se pudo');
      return;
      }
      console.log('si se pudo');
      console.log(form.value.title + form.value.content);
      /*
        this.usersService.addUser(form.value.title, form.value.content, form.value.role);
        form.resetForm();
        */
    }

    togglePasswordVisibility() {
      this.hide = !this.hide;
    }
}
