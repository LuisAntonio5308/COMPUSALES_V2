import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './Users/user-login/user-login.component';
import { UserCreateComponent } from './Users/user-create/user-create.component';
import { AdminComponent } from './Views/admin/admin.component';
import { ClientComponent } from './Views/client/client.component';



const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'client', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
