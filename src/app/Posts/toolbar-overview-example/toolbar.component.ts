import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageExitComponent } from 'src/app/Users/message-exit/message-exit.component';
import { ClientInformationComponent } from 'src/app/Views/client/client-information/client-information.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Users/users.service';
import { User } from 'src/app/Users/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'toolbar-overview-example',
  templateUrl: 'toolbar-overview-example.html',
  styleUrls: ['toolbar-overview-example.css'],
})
export class ToolbarOverviewExample {
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
    imagePreview: string;

  constructor(public dialog: MatDialog, private router: Router, public usersService: UserService) {}
 
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

  }
    


  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  salir(){
    this.dialog.open(MessageExitComponent);
    //window.alert('hola mundo');
  }
  
  url = '/editU/'+this.idUser

  information(){
    if(this.idUser == ''){
      window.alert('No se Ha iniciado Sesion Correctamente');
      this.router.navigate([''])
    }else{
    this.router.navigate(['editU/',this.idUser]);
    }
  }
}

