import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
})
export class Step2Page implements OnInit {
  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  canShowError: boolean = false;
  user: User | undefined;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'] as User;
    }

    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.form.controls.password.value === '') {
        this.canShowError = false;
      }
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      swipeGesture: 'vertical',
      icon: 'checkmark-circle-outline',
      message,
      duration: 2000,
      position: position,
    });

    await toast.present();
  }

  submit() {
    this.canShowError = true;
    if (this.form.controls.password.valid) {
      const password = this.form.controls.password.value;

      if (this.user && this.user.password === password) {
        this.canShowError = false;

        let navigationExtras: NavigationExtras = {
          state: {
            user: this.user,
          },
        };

        this.presentToast('top', '¡Bienvenido de vuelta!');
        this.router.navigate(['/main'], navigationExtras);
      } else {
        console.error('Contraseña incorrecta');
        this.form.controls.password.setErrors({ incorrect: true });
      }
    }
  }
}
