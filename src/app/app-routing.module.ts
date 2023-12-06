import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './Users/user-login/user-login.component';
import { AdminComponent } from './Views/admin/admin.component';
import { ClientComponent } from './Views/client/client.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { PostCreateComponent } from './Posts/Posts-create/post-create.component';
import { UserCreateComponent } from './Users/user-create/user-create.component';
import { UserRecoveryComponent } from './Users/user-recovery/user-recovery.component';
import { UserSalesComponent } from './Users/user-sales/user-sales.component';




const routes: Routes = [
  //{ path: '', component: PostListComponent },
  { path: '', component: UserLoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'client', component: ClientComponent },
  {path: 'home', component: UserLoginComponent},
  {path: 'edit/:postId', component: PostCreateComponent},
  {path: 'editU/:userId', component: UserCreateComponent},
  {path: 'recovery', component: UserRecoveryComponent},
  {path: 'list', component: PostListComponent},
  {path: 'sales', component: UserSalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
