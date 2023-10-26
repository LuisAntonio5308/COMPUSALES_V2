import { Component} from "@angular/core";

import { User } from "../user.model";
import { NgForm } from "@angular/forms";
import { UserService } from "../users.service";
import { withNoDomReuse } from "@angular/platform-browser";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
  })

export class UserCreateComponent{

  hide = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  
  ///segunda modificacion
  enteredTitle = '';
  enteredContent = '';
  enteredRole = '';

  constructor(public usersService: UserService){}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
      }

        this.usersService.addUser(form.value.title, form.value.content, form.value.role);
        form.resetForm();
        
        // Reiniciar la página después de la eliminación
        window.location.reload();
    }
  }



