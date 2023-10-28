import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users.service';

@Component({
  selector: 'app-message-exit',
  templateUrl: './message-exit.component.html',
  styleUrls: ['./message-exit.component.css']
})
export class MessageExitComponent {

  constructor(private router: Router){}

  home(){
    this.router.navigate(['/home'])
  }

}
