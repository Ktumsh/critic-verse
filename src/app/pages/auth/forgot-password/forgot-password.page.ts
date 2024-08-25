import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  constructor() {}

  async openEmail() {
    try {
      await Browser.open({ url: 'https://mail.google.com/' });
    } catch (error) {
      console.error('Error al abrir el correo web:', error);
    }
  }
}
