import { Component, OnInit} from "@angular/core";
import { UserService } from "../users.service";

import { ActivatedRoute, ParamMap } from "@angular/router";
import { postImage } from "./user-image.validator";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../user.model";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
  })

export class UserCreateComponent implements OnInit{

  hide = true;
  users: User[] = [];
  private usersSub: Subscription;

  enter = 0;

  private mode= 'create';
   private userId: string;
   user : User;
   isLoading = false;
   form: FormGroup;
   imagePreview: string;

  
  constructor(public usersService: UserService, public route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]}),
      'password': new FormControl(null, {
          validators: [Validators.required]}),
      'role': new FormControl(null, {
        validators: [Validators.required]}),
        'email': new FormControl(null, {
          validators: [Validators.required]}),
          'isVerified': new FormControl(false),
      'image': new FormControl(null, {
          validators: [Validators.required],
      asyncValidators: [postImage]})
  });
  
  this.route.paramMap.subscribe((paramMap: ParamMap) =>{
    if(paramMap.has('userId')){
        this.mode = 'editU';
        this.userId = paramMap.get('userId');
        this.isLoading = true;
       // Obtener subscripcion de los datos del post
        this.usersService.getUser(this.userId).subscribe(postData =>{
            //para que se detenga el pogressbar
            this.isLoading = false;
            this.user = {
                id: postData._id, 
                name: postData.name, 
                password: postData.password, 
                role: postData.role,
                email: postData.email,
                isVerified: false,
                imagePath: postData.imagePath};
            this.form.setValue({
                name: this.user.name,
                password: this.user.password,
                role: this.user.role,
                email: this.user.email,
                isVerified: this.user.isVerified,
                image: this.user.imagePath
            });
        });
        
    }else{
        this.mode = 'create';
        this.userId = null;
    }
   })

    this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListerner()
    .subscribe((users: User[]) =>{
      this.users = users;
    });

    //

}

  onAddUser(){
    if(this.form.invalid){
      return;
      }
      this.isLoading = true;
    if(this.mode == 'create'){
       //FOR EACH PARA RECORRER EL ARREGLO DE USUARIOS
        this.verificar();

       if(this.enter == 0){
        this.usersService.addUser(
          this.form.value.name, 
          this.form.value.password, 
          this.form.value.role,
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
  
    }else{
      
        this.usersService.updateUser(
            this.userId,
            this.form.value.name, 
            this.form.value.password, 
            this.form.value.role,
            this.form.value.email,
            this.form.value.image
        );
    }
   this.form.reset();
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

  verificar(){

        this.users.forEach(element => {
          //Si los datos del Usuario y password coinciden entra a la pagina
            if(element.email == this.form.value.email && element.isVerified == true){
              this.enter++;
            }
          });
      
     
  }

  }

