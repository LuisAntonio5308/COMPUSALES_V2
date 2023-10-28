import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-client',
  templateUrl: './toolbar-client.component.html',
  styleUrls: ['./toolbar-client.component.css']
})
export class ToolbarClientComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
