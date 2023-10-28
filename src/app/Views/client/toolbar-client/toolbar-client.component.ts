import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageExitComponent } from 'src/app/Users/message-exit/message-exit.component';

@Component({
  selector: 'app-toolbar-client',
  templateUrl: './toolbar-client.component.html',
  styleUrls: ['./toolbar-client.component.css']
})
export class ToolbarClientComponent {

  constructor(public dialog: MatDialog) {}
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  salir(){
    this.dialog.open(MessageExitComponent);

  }
}
