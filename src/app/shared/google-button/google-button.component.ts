import { Component } from '@angular/core';
import { API_URL } from 'variables';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent {
  redirect() {
    window.open(API_URL + '/connect/google', '_self');
  }
}
