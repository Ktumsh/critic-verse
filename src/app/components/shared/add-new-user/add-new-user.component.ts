import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { formatDate } from 'src/utils/common';
import {
  dateValidator,
  errorUserMessage,
  lowerCaseValidator,
  minimumAgeValidator,
  numberValidator,
  specialCharacterValidator,
  upperCaseValidator,
} from 'src/utils/validations';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {
  @Input() user?: User;
  form: FormGroup;
  isEditMode: boolean = false;
  canShowError: boolean = false;

  emailControl!: FormControl;
  usernameControl!: FormControl;
  roleControl!: FormControl;
  passwordControl!: FormControl;
  birthdateControl!: FormControl;

  customPopoverOptions = {
    cssClass: 'custom-popover v2',
  };

  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private toastController: ToastController
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$'),
      ]),
      role: new FormControl('user', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        upperCaseValidator(),
        lowerCaseValidator(),
        numberValidator(),
        specialCharacterValidator(),
      ]),
      birthdate: new FormControl('', [
        Validators.required,
        dateValidator,
        minimumAgeValidator(13),
      ]),
    });

    this.emailControl = this.form.get('email') as FormControl;
    this.usernameControl = this.form.get('username') as FormControl;
    this.roleControl = this.form.get('role') as FormControl;
    this.passwordControl = this.form.get('password') as FormControl;
    this.birthdateControl = this.form.get('birthdate') as FormControl;
  }

  ngOnInit() {
    if (this.user) {
      this.isEditMode = true;
      this.form.patchValue({
        email: this.user.email,
        username: this.user.username,
        role: this.user.role,
        birthdate: formatDate(this.user.birthdate),
      });
      this.emailControl.disable();
      this.passwordControl.disable();
    }
  }

  isAnyFieldEmpty(): boolean {
    return (
      (!this.isEditMode && !this.emailControl.value) ||
      !this.usernameControl.value ||
      !this.roleControl.value ||
      (!this.isEditMode && !this.passwordControl.value) ||
      !this.birthdateControl.value
    );
  }

  async onSubmit() {
    this.canShowError = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      await this.presentToast(
        'Debes completar todos los campos y asegurarte de que sean válidos.',
        'alert-circle-outline'
      );
      return;
    }

    try {
      if (this.isEditMode) {
        const updatedUser = {
          id: this.user!.id,
          username: this.usernameControl.value,
          role: this.roleControl.value,
          birthdate: this.birthdateControl.value,
        };

        await this.userService.updateUser(updatedUser);
        await this.presentToast(
          '¡Usuario actualizado exitosamente!',
          'checkmark-circle-outline'
        );
        this.modalController.dismiss({ user: updatedUser });
      } else {
        const email = this.emailControl.value;
        const username = this.usernameControl.value;

        const emailExists = await this.userService.emailExists(email);
        if (emailExists) {
          this.emailControl.setErrors({ emailExists: true });
          await this.presentToast(
            'Este correo electrónico ya está registrado.',
            'alert-circle-outline'
          );
          return;
        }

        const usernameExists = await this.userService.usernameExists(username);
        if (usernameExists) {
          this.usernameControl.setErrors({ usernameTaken: true });
          await this.presentToast(
            'El nombre de usuario ya está en uso.',
            'alert-circle-outline'
          );
          return;
        }

        const newUser = {
          email: this.emailControl.value,
          username: this.usernameControl.value,
          password: this.passwordControl.value,
          birthdate: this.birthdateControl.value,
          role: this.roleControl.value,
        };

        await this.userService.createUser(newUser);
        await this.presentToast(
          '¡Usuario agregado exitosamente!',
          'checkmark-circle-outline'
        );
        this.modalController.dismiss({ user: newUser });
      }
    } catch (error) {
      console.error('Error en la operación del usuario:', error);
      await this.presentToast(
        'Ocurrió un error al procesar la solicitud.',
        'alert-circle-outline'
      );
    }
  }

  getErrorMessage = errorUserMessage;

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
      user: this.user,
    });
  }
}
