import { Component } from '@angular/core';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent {
  redirect() {
    window.open('https://api-abchub.lowee.xyz/api/connect/google', '_self');
  }
}
