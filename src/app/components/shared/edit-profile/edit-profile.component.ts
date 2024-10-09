import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  ActionSheetController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { calculateDaysUntilBirthday, formatDate } from 'src/utils/common';
import { dateValidator, minimumAgeValidator } from 'src/utils/validations';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() user!: User;
  userCopy!: any;
  canShowError: boolean = false;

  minDate!: string;
  maxDate!: string;
  daysUntilBirthday: number | null = null;

  profileForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$'),
    ]),
    birthdate: new FormControl('', [
      Validators.required,
      dateValidator,
      minimumAgeValidator(13),
    ]),
  });

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private actionSheet: ActionSheetController,
    private userService: UserService,
    private authService: AuthService
  ) {
    const currentDate = new Date();
    this.minDate = '1924-01-01';
    this.maxDate = formatDate(currentDate);
  }

  ngOnInit() {
    this.userCopy = {
      id: this.user?.id,
      email: this.user?.email,
      username: this.user?.username,
      profileImage: this.user?.profileImage,
      birthdate: formatDate(this.user?.birthdate),
    };

    this.profileForm.setValue({
      username: this.userCopy.username,
      birthdate: this.userCopy.birthdate,
    });

    this.profileForm.get('username')?.valueChanges.subscribe(() => {
      if (this.canShowError) {
        this.canShowError = false;
      }
    });
  }

  get birthdateErrors() {
    return this.profileForm.get('birthdate')?.errors;
  }

  async presentImageOptions() {
    const alert = await this.actionSheet.create({
      cssClass: 'custom-sheet',
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => {
            this.takePhoto();
          },
        },
        {
          text: 'Subir foto',
          handler: () => {
            this.selectPhoto();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    if (image && image.dataUrl) {
      this.userCopy.profileImage = image.dataUrl;
    } else {
      this.presentToast(
        'Selección de imagen cancelada.',
        'alert-circle-outline'
      );
    }
  }

  async selectPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });

    if (image && image.dataUrl) {
      this.userCopy.profileImage = image.dataUrl;
    } else {
      this.presentToast(
        'Selección de imagen cancelada.',
        'alert-circle-outline'
      );
    }
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

  saveChanges = async (): Promise<void> => {
    this.canShowError = true;
    this.profileForm.markAllAsTouched();

    if (this.profileForm.invalid) {
      await this.presentToast(
        'Por favor, completa todos los campos correctamente.',
        'alert-circle-outline'
      );
      return;
    }

    this.userCopy.username = this.profileForm.get('username')?.value;
    this.userCopy.birthdate = this.profileForm.get('birthdate')?.value;
    this.userCopy.role = this.user.role;

    const usernameValue = this.profileForm.get('username')?.value ?? '';
    const usernameExists = await this.userService.usernameExists(usernameValue);

    if (usernameExists && usernameValue !== this.user.username) {
      this.profileForm.get('username')?.setErrors({ usernameTaken: true });
      return;
    }

    const updatedUser = {
      ...this.userCopy,
      username: this.profileForm.get('username')?.value!,
      birthdate: new Date(this.profileForm.get('birthdate')?.value!),
      role: this.user.role,
    };

    try {
      await this.userService.updateUser({
        id: updatedUser.id,
        username: updatedUser.username,
        profileImage: updatedUser.profileImage,
        birthdate: updatedUser.birthdate,
        role: updatedUser.role,
      });

      const user = await this.userService.getUserByEmail(this.user.email);

      this.authService.updateCurrentUser(user);

      this.presentToast(
        'Cambios guardados correctamente',
        'checkmark-circle-outline'
      );

      Object.assign(this.user, updatedUser);

      this.dismiss();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      this.presentToast(
        'Ocurrió un error al guardar los cambios.',
        'alert-circle-outline'
      );
    }
  };

  onDateChange(event: any) {
    const value = event.detail.value;
    if (value) {
      const birthday = new Date(value);
      this.daysUntilBirthday = calculateDaysUntilBirthday(birthday);
    }
  }

  onBlurDate(event: any) {
    if (!event.target.value) {
      this.profileForm.patchValue({ birthdate: this.userCopy.birthdate });
    }
  }

  dismiss = (): void => {
    this.modalController.dismiss({
      dismissed: true,
      user: this.user,
    });
  };
}
