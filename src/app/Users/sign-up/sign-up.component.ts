import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../users.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  //constructor(public dialog: MatDialog) {}

  constructor(public usersService: UserService){}
  hide = true;
  
  ngOnInit(){
    this.usersService.getUsers();

}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
      }
        this.usersService.addUser(form.value.title, form.value.content, 'CLIENT');
        window.alert('Usuario Agregado Satisfactoriamente ['+form.value.title+']')
        form.resetForm();
    }
}
