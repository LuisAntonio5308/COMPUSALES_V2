import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../users.service";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OnDestroy, OnInit} from "@angular/core";
import { User } from "../user.model";
import {Subscription} from "rxjs";
import { Router } from '@angular/router';


//import { SignUpComponent } from '../sign-up/sign-up.component';



@Component({
  selector: 'app-user-recovery',
  templateUrl: './user-recovery.component.html',
  styleUrls: ['./user-recovery.component.css'],
})
export class UserRecoveryComponent implements OnInit, OnDestroy{
  users: User[] = [];
  private usersSub: Subscription;
  verified = false;
  hide = true;
  enter = false;
  cliente = 'CLIENT';
  admin = 'ADMIN';
  selectedRole: string = '';

  

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
  const nameElement = document.getElementById("name") as HTMLInputElement;
  const name = nameElement.value;
  const emailElement = document.getElementById("email") as HTMLInputElement;
  const email = emailElement.value;
  
 
//FOR EACH PARA RECORRER EL ARREGLO DE USUARIOS
this.users.forEach(element => {

  if(name==element.name && email==element.email && this.selectedRole&&element.role){
    this.enter = true;
      if(element.isVerified==true){
        this.verified=true;
         //contenido para mandar el correo
        
      const subject = 'Información Confidencial - Contraseña Adjunta';
      //const body = '';
      // Definir el mensaje en formato de plantilla de cadenas con saltos de línea
      const body = `
      Asunto del Correo:
      ${subject}
  
      Cuerpo del Correo:
      Estimado: ${element.name},
  
      Por favor, asegúrate de tratar esta información con la debida confidencialidad.
  
      PASSWORD: ${element.password}
  
      Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en contactarme.
  
      Atentamente:
      COMPUSALES S.A. de C.V.
  `; // trim() para eliminar espacios en blanco al principio y al final
  
      const to = element.email;
  
      this.usersService.sendEmail(subject, body, to).subscribe(
        response => {
          window.alert('Correo Enviado Satisfactoriamente a: ' + to)
          console.log('Correo enviado exitosamente:', response);
          this.router.navigate(['/home'])
        },
        error => {
          console.error('Error al enviar el correo:', error);
        }
      );
      

      }else{
        window.alert('Cuenta No verificada');
      }
  }
    
    
  });

  if(this.enter === false){
    window.alert('Datos Incorrectos, Verifica Nuevamente')
  }
  

  }

  
  signup() {
    /*
     
    //MANDAR EL CORREO
      */

    
    const subject = 'Asunto del correo';
    const body = 'Cuerpo del correo';
    const to = 'lo3977884@gmail.com';

    this.usersService.sendEmail(subject, body, to).subscribe(
      response => {
        console.log('Correo enviado exitosamente:', response);
      },
      error => {
        console.error('Error al enviar el correo:', error);
      }
    );
     
}
}
