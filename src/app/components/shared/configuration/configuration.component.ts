import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AccessibilityService } from 'src/app/services/accessibility.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  @Input() user!: User;

  customPopoverOptions = {
    cssClass: 'custom-popover v2',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    public accessibilityService: AccessibilityService
  ) {}

  changeFontSize(size: string) {
    this.accessibilityService.setFontSize(size);
  }

  toggleDisableAnimations(event: any) {
    this.accessibilityService.toggleAnimations(event.detail.checked);
  }

  logout() {
    this.showLogoutAlert();
  }

  async deleteUser() {
    try {
      await this.userService.deleteUserByUsername(this.user.username);
      this.authService.logout();
      await this.modalController.dismiss();
      this.router.navigate(['/auth']);
    } catch (error) {
      if (error instanceof Error) {
        await this.showErrorAlert(error.message);
      }
    }
  }

  async showLogoutAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'custom-alert v2',
      header: '¿Estás seguro que deseas cerrar sesión?',
      message: 'Podrás volver a iniciar sesión cuando quieras.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
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
            await this.deleteUser();
          },
        },
      ],
    });
    await alert.present();
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'custom-alert v2',
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async openAccountModal() {
    const modal = await this.modalController.create({
      component: AccountDetailsComponent,
      componentProps: { user: this.user },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.user) {
        this.user = data.data.user;
      }
    });

    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
