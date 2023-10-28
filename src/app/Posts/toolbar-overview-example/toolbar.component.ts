import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageExitComponent } from 'src/app/Users/message-exit/message-exit.component';

@Component({
  selector: 'toolbar-overview-example',
  templateUrl: 'toolbar-overview-example.html',
  styleUrls: ['toolbar-overview-example.css'],
})
export class ToolbarOverviewExample {

  constructor(public dialog: MatDialog) {}


  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  salir(){
    this.dialog.open(MessageExitComponent);
    //window.alert('hola mundo');
  }
}

