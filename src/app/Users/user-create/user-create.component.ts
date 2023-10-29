import { Component, OnInit} from "@angular/core";

import { NgForm } from "@angular/forms";
import { UserService } from "../users.service";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
  })

export class UserCreateComponent implements OnInit{

  hide = true;
  
  constructor(public usersService: UserService){}

  ngOnInit(){
    this.usersService.getUsers();

}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
      }
        this.usersService.addUser(form.value.title, form.value.content, form.value.role);
        form.resetForm();
        
    }
  }



