import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../users.service';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { User } from '../user.model';
import { postImage } from '../user-create/user-image.validator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  //constructor(public dialog: MatDialog) {}

  constructor(public usersService: UserService, public route : ActivatedRoute){}
  hide = true;

  
  private mode= 'create';
   private userId: string;
   user : User;
   isLoading = false;
   form: FormGroup;
   imagePreview: string;

  users: User[] = [];
  private usersSub: Subscription;

  enter = 0;


  
  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]}),
      'password': new FormControl(null, {
          validators: [Validators.required]}),
      'email': new FormControl(null, {
        validators: [Validators.required]}),
          'image': new FormControl(null, {
              validators: [Validators.required],
          asyncValidators: [postImage]})

  });


    this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListerner()
    .subscribe((users: User[]) =>{
      this.users = users;
    });

}


    onAddUser(){
      if(this.form.invalid){
        return;
        }
        
        this.isLoading = true;
      
         //FOR EACH PARA RECORRER EL ARREGLO DE USUARIOS
          this.verificar();
          
         if(this.enter == 0){
          this.usersService.addUser(
            this.form.value.name, 
        this.form.value.password,
        'CLIENT',
        this.form.value.email,
        this.form.value.image
            ).subscribe((responseData) => {
                const verificationToken = responseData.verificationToken;
  
        // Enviar el token de verificación al servicio para manejar la verificación
        this.usersService.verificarCuenta(verificationToken).subscribe(
        (data) => {
          console.log('Cuenta verificada correctamente', data);
        },
        (error) => {
          console.error('Error al verificar cuenta', error);
        }
      );
            });
            this.form.reset();
         }else{
          window.alert('EMAIL YA CREADO')
         }
         this.isLoading = false;
     this.form.reset();
      }


      verificar(){
        this.users.forEach(element => {
          //Si los datos del Usuario y password coinciden entra a la pagina
            if(element.email == this.form.value.email && element.isVerified == true){
              this.enter++;
            }
          });
      
  }





    onImagePicked(event: Event){
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
      console.log(file);
      const reader = new FileReader();
      reader.onload = () =>{
          this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
  }
}
