import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

///Agregar 
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';

import { PostCreateComponent } from './Posts/Posts-create/post-create.component';

import { PostListComponent } from './Posts/post-list/post-list.component';
import { PostService } from './Posts/posts.service';
import { UserService } from './Users/users.service';

import { UserListComponent } from './Users/user-list/user-list.component';
import { UserCreateComponent } from './Users/user-create/user-create.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';

import {HttpClientModule} from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { UserLoginComponent } from './Users/user-login/user-login.component';
import { MatIconModule } from '@angular/material/icon';

import { TableFilteringExample } from './Posts/table-filtering-example/table-filtering-example';
import { FooterComponent } from './Posts/footer/footer.component';
import { CarruselComponent } from './Posts/carrusel/carrusel.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {MatTreeModule} from '@angular/material/tree';

import { TreeComponent } from './Posts/tree/tree.component';

import { DialogComponent } from './Posts/dialog/dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipListboxComponent } from './Posts/mat-chip-listbox/mat-chip-listbox.component';
import { ProgressBarConfigurableExample } from './Posts/progress-bar-indeterminate-example/progress-bar';
import { ToolbarOverviewExample } from './Posts/toolbar-overview-example/toolbar.component';
import { AdminComponent } from './Views/admin/admin.component';
import { ClientComponent } from './Views/client/client.component';
import { ToolbarClienteComponent } from './Views/client/toolbar-cliente/toolbar-cliente.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    UserCreateComponent,
    UserListComponent,
    UserLoginComponent,
    FooterComponent,
    CarruselComponent,
    MatChipListboxComponent,
    ToolbarOverviewExample,
    AdminComponent,
    ClientComponent,
    ToolbarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Agregamos FormsModule
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    TableFilteringExample,
    MatProgressBarModule,
    MatTreeModule,
    TreeComponent,
    DialogComponent,
    MatChipsModule,
    MatDialogModule,
    MatMenuModule,
    ProgressBarConfigurableExample,
    CommonModule

  ],
  providers: [PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
