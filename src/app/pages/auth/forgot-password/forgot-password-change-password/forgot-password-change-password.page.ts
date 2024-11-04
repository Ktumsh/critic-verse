import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';
import {
  lowerCaseValidator,
  newPasswordsMatchValidator,
  numberValidator,
  specialCharacterValidator,
  upperCaseValidator,
  errorMessage,
} from 'src/utils/validations';

@Component({
  selector: 'app-forgot-password-change-password',
  templateUrl: './forgot-password-change-password.page.html',
  styleUrls: ['./forgot-password-change-password.page.scss'],
})
export class ForgotPasswordChangePasswordPage {
  form = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        upperCaseValidator(),
        lowerCaseValidator(),
        numberValidator(),
        specialCharacterValidator(),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: newPasswordsMatchValidator() }
  );
  canShowError: boolean = false;

  constructor(
    private userService: UserService,
    private registrationService: RegistrationService,
    private router: Router,
    private toastController: ToastController
  ) {}

  get newPasswordControl(): FormControl {
    return this.form.get('newPassword') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  getErrorMessage = errorMessage;

  isAnyFieldEmpty(): boolean {
    return !this.newPasswordControl.value || !this.confirmPasswordControl.value;
  }

  async onSubmit() {
    this.canShowError = true;
    if (this.form.valid) {
      const newPassword = this.form.controls['newPassword'].value;
      const email = this.registrationService.getEmail();
      if (email && newPassword) {
        try {
          this.userService.updatePassword(email, newPassword);
          await this.presentToast(
            'Contraseña actualizada exitosamente.',
            'checkmark-circle-outline'
          );
          this.router.navigate(['/login']);
        } catch (error) {
          await this.presentToast(
            'Error al actualizar la contraseña. Inténtalo de nuevo.',
            'alert-circle-outline'
          );
          console.error('Error al actualizar la contraseña:', error);
        }
      }
    } else {
      await this.presentToast(
        'Debes completar todos los campos y asegurarte de que sean válidos.',
        'alert-circle-outline'
      );
    }
  }

  async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      swipeGesture: 'vertical',
      cssClass: 'custom-toast',
      icon,
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }
}
