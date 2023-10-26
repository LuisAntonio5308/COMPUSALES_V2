import { Component } from '@angular/core';

@Component({
  selector: 'toolbar-cliente',
  templateUrl: 'toolbar-cliente.component.html',
  styleUrls: ['toolbar-cliente.component.css'],
})
export class ToolbarClienteComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
