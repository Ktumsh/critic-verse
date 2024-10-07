import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  @Input() user!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  async logout() {
    await this.showLogoutAlert();
  }

  async deleteUser() {
    await this.showDeleteUserAlert();
  }

  async showLogoutAlert() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, cerrar sesión',
          role: 'confirm',
          handler: async () => {
            this.authService.logout();
            await this.modalController.dismiss();
            this.router.navigate(['/auth']);
          },
        },
      ],
    });

    await alert.present();
  }

  async showDeleteUserAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'custom-alert v2',
      header: '¿Estás seguro que deseas eliminar tu cuenta?',
      message:
        'Esta acción es irreversible y perderás tu cuenta permanentemente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar mi cuenta',
          role: 'confirm',
          handler: async () => {
            await this.userService.deleteUserByUsername(this.user.username);
            this.authService.logout();
            await this.modalController.dismiss();
            this.router.navigate(['/auth']);
          },
        },
      ],
    });
    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
