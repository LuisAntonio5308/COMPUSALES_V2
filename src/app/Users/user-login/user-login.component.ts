import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../users.service";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OnDestroy, OnInit} from "@angular/core";
import { User } from "../user.model";
import {Subscription} from "rxjs";
import { Router } from '@angular/router';
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
  enter = false;
  cliente = 'CLIENT';
  admin = 'ADMIN';

  constructor(public usersService: UserService, private router: Router, private dialog: MatDialog){}
//, private user: UserListComponent
  ngOnInit(){
    this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListerner()
    .subscribe((users: User[]) =>{
      this.users = users;
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

//FOR EACH PARA RECORRER EL ARREGLO DE USUARIOS
this.users.forEach(element => {
  //Si los datos del Usuario y password coinciden entra a la pagina
  if(user==element.user && password==element.password){
    this.enter = true;
      if(element.role == this.admin){
        window.alert('ADMIN - ' + element.user);
        //this.user.getUser(element.id);
        this.usersService.setIdUser(element.id);
        this.router.navigate(['/admin'])
      }else{
        if(element.role == this.cliente){
            window.alert('CLIENTE - '+ element.user)
            this.router.navigate(['/client'])
        }
      }
    }
  });

  if(this.enter === false){
      window.alert('Usuario y/o Contraseña Incorrecta')
  }
  }

  
  signup() {
    this.dialog.open(SignUpComponent);
  }


    togglePasswordVisibility() {
      this.hide = !this.hide;
    }
}
