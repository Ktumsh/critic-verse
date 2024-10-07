import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import {
  errorMessage,
  lowerCaseValidator,
  newPasswordsMatchValidator,
  numberValidator,
  specialCharacterValidator,
  upperCaseValidator,
} from 'src/utils/validations';

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
    private toastController: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            upperCaseValidator(),
            lowerCaseValidator(),
            numberValidator(),
            specialCharacterValidator(),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: newPasswordsMatchValidator() }
    );

    this.form.statusChanges.subscribe(() => {
      if (this.form.invalid && this.isAnyFieldEmpty()) {
        this.canShowError = false;
      }
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

  getErrorMessage = errorMessage;

  isAnyFieldEmpty(): boolean {
    return (
      !this.currentPasswordControl.value ||
      !this.newPasswordControl.value ||
      !this.confirmPasswordControl.value
    );
  }

  async onSubmit() {
    this.canShowError = true;

    if (this.form.invalid) {
      await this.presentToast(
        'Debes completar todos los campos y asegurarte de que sean válidos.',
        'alert-circle-outline'
      );
      return;
    }

    const { currentPassword, newPassword } = this.form.value;

    const isCurrentPasswordValid = await this.userService.verifyPassword(
      this.user.email,
      currentPassword
    );

    if (!isCurrentPasswordValid) {
      this.form.get('currentPassword')?.setErrors({ incorrect: true });
      return;
    }

    try {
      await this.userService.updatePassword(this.user.email, newPassword);
      await this.presentToast(
        'Contraseña actualizada exitosamente',
        'checkmark-circle-outline'
      );
      this.dismiss();
    } catch (error) {
      await this.presentToast(
        'Ocurrió un error al cambiar la contraseña. Inténtalo de nuevo.',
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

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
