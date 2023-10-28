
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewChild } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { PostCreateComponent } from '../Posts-create/post-create.component';
import { UserCreateComponent } from 'src/app/Users/user-create/user-create.component';
import { PostListComponent } from '../post-list/post-list.component';
import { UserListComponent } from 'src/app/Users/user-list/user-list.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Control',
    children: [{name: ''}],
  },


];


/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-tree-component',
  templateUrl: 'tree.component.html',
  styleUrls: ['tree.component.css'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class TreeComponent {
  [x: string]: any;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  @ViewChild(DialogComponent)
  componente: DialogComponent;
  
  
  constructor(public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }
  openPostDialog(node: FoodNode) {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      data: { nodeData: node } // Puedes pasar datos adicionales al componente de creación de posts si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo de creación de post cerrado');
    });
  }

  openPostListDialog(node: FoodNode) {
    
    const dialogRef = this.dialog.open(PostListComponent, {
      data: { nodeData: node } // Puedes pasar datos adicionales al componente de creación de posts si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo de creación de post cerrado');
    });
  }

  button1Click(node: any) {
    // Lógica para el botón 1
    console.log('Botón 1 clicado para el nodo:', node.field1);
  }
  
  button2Click(node: any) {
    // Lógica para el botón 2
    console.log('Botón 2 clicado para el nodo:', node.field2);
  }
  

  openPost() {
    this.dialog.open(PostCreateComponent);
  }

  openPostList() {
    this.dialog.open(PostListComponent);
  }
  openUser(){
    this.dialog.open(UserCreateComponent);
  }
  openUserList(){
    this.dialog.open(UserListComponent);
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
