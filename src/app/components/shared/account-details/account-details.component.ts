import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  @Input() user!: User;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async showAlert() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
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
