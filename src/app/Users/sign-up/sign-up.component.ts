import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../users.service';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { User } from '../user.model';
import { postImage } from '../user-create/user-image.validator';


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

  /*
  this.route.paramMap.subscribe((paramMap: ParamMap) =>{
    if(paramMap.has('userId')){
        this.mode = 'edit';
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
                imagePath: postData.imagePath};
            this.form.setValue({
                name: this.user.name,
                password: this.user.password,
                role: this.user.role,
                image: this.user.imagePath
            });
        });
        
    }else{
        this.mode = 'create';
        this.userId = null;
    }
   })
   */




    this.usersService.getUsers();

}

  onAddUser(){
    if(this.form.invalid){
      return;
      }
      /*window.alert(this.form.value.name + 'si entro' +
        this.form.value.password)*/
      //AQUI
      this.usersService.addUser(
        this.form.value.name, 
        this.form.value.password,
        'CLIENT',
        this.form.value.email,
        this.form.value.image
        );
        window.alert('si salio')
        //this.usersService.addUser(form.value.title, form.value.content, 'CLIENT');
        //window.alert('Usuario Agregado Satisfactoriamente ['+form.value.title+']')
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
}
