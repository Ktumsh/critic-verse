import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.page.html',
  styleUrls: ['./login-password.page.scss'],
})
export class LoginPasswordPage implements OnInit {
  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  canShowError: boolean = false;

  constructor(
    private userService: UserService,
    private registrationService: RegistrationService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.form.controls.password.value === '') {
        this.canShowError = false;
      }
    });
  }

  async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      swipeGesture: 'vertical',
      icon,
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }

  async submit() {
    this.canShowError = true;
    try {
      const email = this.registrationService.getEmail();
      const password = this.form.controls.password.value;
      const isValid = await this.userService.verifyPassword(
        email as string,
        password as string
      );
      if (isValid) {
        const user = await this.userService.getUserByEmail(email as string);
        this.authService.login(user);
        this.presentToast('¡Bienvenido de vuelta!', 'checkmark-circle-outline');
        this.router.navigate(['/main'], { replaceUrl: true });
      } else {
        console.error('Contraseña incorrecta');
        this.form.controls.password.setErrors({ incorrect: true });
      }
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
      this.presentToast(
        'Se produjo un error. Por favor, inténtalo más tarde.',
        'close-circle-outline'
      );
      this.canShowError = true;
    }
  }
}
