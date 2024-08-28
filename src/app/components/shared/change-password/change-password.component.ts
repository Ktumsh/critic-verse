import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() user!: User;
  form!: FormGroup;
  canShowError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  get currentPasswordControl(): FormControl {
    return this.form.get('currentPassword') as FormControl;
  }

  get newPasswordControl(): FormControl {
    return this.form.get('newPassword') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  isAnyFieldEmpty(): boolean {
    return (
      !this.currentPasswordControl.value &&
      !this.newPasswordControl.value &&
      !this.confirmPasswordControl.value
    );
  }

  async onSubmit() {
    if (this.form.invalid) {
      await this.showAlert(
        'Validación de campos',
        'Debes completar todos los campos y asegurarte de que sean válidos.'
      );
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.form.value;

    if (currentPassword !== this.user.password) {
      await this.showAlert(
        'Contraseña incorrecta',
        'La contraseña actual no coincide con la registrada.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      await this.showAlert(
        'Error en las contraseñas',
        'Las contraseñas nuevas no coinciden.'
      );
      return;
    }

    console.log('Contraseña actual:', currentPassword);
    console.log('Nueva contraseña:', newPassword);

    console.log('Contraseña cambiada exitosamente para:', this.user.username);

    this.presentToast('top', 'Contraseña actualizada exitosamente');

    // Actualizar la contraseña del usuario
    this.user.password = newPassword;

    this.modalController.dismiss({
      dismissed: true,
      user: this.user,
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header,
      message,
      buttons: ['Aceptar'],
    });

    await alert.present();
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

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
