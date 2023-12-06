import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageExitComponent } from 'src/app/Users/message-exit/message-exit.component';
import { User } from 'src/app/Users/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Users/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar-client',
  templateUrl: './toolbar-client.component.html',
  styleUrls: ['./toolbar-client.component.css']
})
export class ToolbarClientComponent {

  constructor(public dialog: MatDialog, public usersService: UserService, public router: Router) {}
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  salir(){
    this.dialog.open(MessageExitComponent);
  }



   //export class UserListComponent implements OnInit, OnDestroy{
    //Los users son los que se muestran en el user.list
    users: User[] = [];
    isLoading = false;
    idUser = "";
    aux="";
    enter = true;
    isAccordionOpen = true;
    private usersSub: Subscription;

    

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


    ngOnDestroy(){
        this.usersSub.unsubscribe();
    }

    sales(){
      this.router.navigate(['/sales'])

    }

    information(){
      if(this.idUser == ''){
        window.alert('No se Ha iniciado Sesion Correctamente');
        this.router.navigate([''])
      }else{
          
      this.router.navigate(['editU/',this.idUser]);
      }

    }


}
