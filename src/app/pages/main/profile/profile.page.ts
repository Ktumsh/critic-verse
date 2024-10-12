import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';
import { EditProfileComponent } from 'src/app/components/shared/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from 'src/app/components/shared/change-password/change-password.component';
import { AccountDetailsComponent } from 'src/app/components/shared/account-details/account-details.component';
import { ProfileReviewsComponent } from 'src/app/components/shared/profile-reviews/profile-reviews.component';
import { NotificationsComponent } from 'src/app/components/shared/notifications/notifications.component';
import { ConfigurationComponent } from 'src/app/components/shared/configuration/configuration.component';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User = {
    id: '1',
    role: 'user',
    email: 'usuario@duocuc.cl',
    username: '_username69',
    password: '12345',
    birthdate: new Date('2003-01-10T12:00:00'),
    createdAt: new Date('2024-08-28T12:00:00'),
  };

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private notificationsService: NotificationsService,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.user = this.authService.user;
  }

  async ngOnInit() {
    await this.loadUserReviewsCount();
    await this.loadUserNotificationsCount();
  }

  async loadUserReviewsCount() {
    try {
      const reviews = await this.reviewService.getReviewsByUserId(this.user.id);
      const reviewsCount = reviews.length;

      const reviewsItem = this.items.find(
        (item) => item.label === 'Mis calificaciones y reseñas'
      );

      if (reviewsItem) {
        reviewsItem.note = `${reviewsCount}`;
        reviewsItem.showNote = reviewsCount > 0;
      }
    } catch (error) {
      console.error(
        'Error al obtener la cantidad de reseñas del usuario:',
        error
      );
    }
  }

  async loadUserNotificationsCount() {
    try {
      const notifications =
        await this.notificationsService.getUserNotifications(this.user.id);
      const notificationsCount = notifications.length;

      const notificationsItem = this.items.find(
        (item) => item.label === 'Notificaciones'
      );

      if (notificationsItem) {
        notificationsItem.note = `${notificationsCount}`;
        notificationsItem.showNote = notificationsCount > 0;
      }
    } catch (error) {
      console.error(
        'Error al obtener la cantidad de notificaciones del usuario:',
        error
      );
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
      note: '0',
      showNote: true,
      detail: false,
      action: () => this.openModal(ProfileReviewsComponent),
    },
    {
      label: 'Notificaciones',
      iconSrc: 'assets/icon/bell.svg',
      color: 'bg-emerald',
      note: null,
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
    /* {
      label: 'Ayuda',
      iconSrc: 'assets/icon/help.svg',
      color: 'bg-pink',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openModal(HelpComponent),
    }, */
    {
      label: 'Cerrar sesión',
      iconSrc: 'assets/icon/action/logout.svg',
      color: 'bg-transparent',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.showLogoutAlert(),
    },
  ];

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

  navigateOrExecute(item: any) {
    if (item.action) {
      item.action();
    }
  }

  handleRefresh(e: any) {
    this.loadUserReviewsCount().then(() => {
      this.user = this.authService.user;
      e.target.complete();
    });
  }
}
