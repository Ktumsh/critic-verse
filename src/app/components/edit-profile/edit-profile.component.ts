import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() user!: User;
  userCopy!: User;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userCopy = { ...this.user };
  }

  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Validación de Campos',
      message,
      buttons: ['OK'],
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

  onFileSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.userCopy!.profileImage = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  };

  saveChanges = async (): Promise<void> => {
    if (!this.userCopy.username) {
      await this.showAlert('El nombre de usuario no puede quedar vacío.');
      return;
    }

    if (!this.userCopy.email) {
      await this.showAlert('El correo no puede quedar vacío.');
      return;
    }

    if (this.user && this.userCopy) {
      Object.assign(this.user, this.userCopy);
      this.presentToast('top', 'Cambios guardados');
      console.log('Cambios guardados:', this.user);
    }
    this.dismiss();
  };

  dismiss = (): void => {
    this.modalController.dismiss({
      dismissed: true,
      user: this.user,
    });
  };
}
