import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';
import { EditProfileComponent } from 'src/app/components/shared/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from 'src/app/components/shared/change-password/change-password.component';
import { AccountDetailsComponent } from 'src/app/components/shared/account-details/account-details.component';
import { ProfileReviewsComponent } from 'src/app/components/shared/profile-reviews/profile-reviews.component';
import { NotificationsComponent } from 'src/app/components/shared/notifications/notifications.component';
import { ConfigurationComponent } from 'src/app/components/shared/configuration/configuration.component';
import { HelpComponent } from 'src/app/components/shared/help/help.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() user!: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    if (!this.user) {
      this.user = {
        id: '1',
        role: 'user',
        email: 'usuario@duocuc.cl',
        username: '_username69',
        password: '12345',
        birthdate: new Date('2003-01-10T12:00:00'),
        createdAt: new Date('2024-08-28T12:00:00'),
      };
    }
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfileComponent,
      componentProps: { user: this.user },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.user) {
        this.user = data.data.user;
      }
    });

    return await modal.present();
  }

  async openModal(component: any) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: { user: this.user },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.user) {
        this.user = data.data.user;
      }
    });

    return await modal.present();
  }

  navigateTo(route: string) {
    this.router.navigate([route], {
      state: { user: this.user },
    });
  }

  items = [
    {
      label: 'Mis calificaciones y reseñas',
      iconSrc: 'assets/icon/review.svg',
      color: 'bg-blue',
      note: '2',
      showNote: true,
      detail: false,
      action: () => this.openModal(ProfileReviewsComponent),
    },
    {
      label: 'Notificaciones',
      iconSrc: 'assets/icon/bell.svg',
      color: 'bg-emerald',
      note: '3',
      showNote: true,
      detail: false,
      action: () => this.openModal(NotificationsComponent),
    },
    {
      label: 'Detalles de mi cuenta',
      iconSrc: 'assets/icon/account.svg',
      color: 'bg-amber',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openModal(AccountDetailsComponent),
    },
    {
      label: 'Cambiar contraseña',
      iconSrc: 'assets/icon/lock.svg',
      color: 'bg-red',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openModal(ChangePasswordComponent),
    },
    {
      label: 'Configuración',
      iconSrc: 'assets/icon/settings.svg',
      color: 'bg-violet',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openModal(ConfigurationComponent),
    },
    {
      label: 'Ayuda',
      iconSrc: 'assets/icon/help.svg',
      color: 'bg-pink',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openModal(HelpComponent),
    },
  ];

  // Método de navegación actualizado
  navigateOrExecute(item: any) {
    if (item.action) {
      item.action();
    }
  }
}
