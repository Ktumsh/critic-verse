import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from 'src/app/components/shared/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() user: User | undefined;

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'] as User;
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    if (this.user) {
      console.log('Usuario recibido en perfil:', this.user);
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

  async openChangePasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent,
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
      action: () => this.openModal(EditProfileComponent),
    },
    {
      label: 'Notificaciones',
      iconSrc: 'assets/icon/bell.svg',
      color: 'bg-emerald',
      note: '3',
      showNote: true,
      detail: false,
      action: () => this.openModal(EditProfileComponent),
    },
    {
      label: 'Detalles de mi cuenta',
      iconSrc: 'assets/icon/account.svg',
      color: 'bg-amber',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openEditProfileModal(),
    },
    {
      label: 'Cambiar contraseña',
      iconSrc: 'assets/icon/lock.svg',
      color: 'bg-red',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openChangePasswordModal(),
    },
    {
      label: 'Configuración',
      iconSrc: 'assets/icon/settings.svg',
      color: 'bg-violet',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openModal(EditProfileComponent),
    },
    {
      label: 'Ayuda',
      iconSrc: 'assets/icon/help.svg',
      color: 'bg-pink',
      note: null,
      showNote: false,
      detail: true,
      action: () => this.openModal(EditProfileComponent),
    },
  ];

  // Método de navegación actualizado
  navigateOrExecute(item: any) {
    if (item.action) {
      item.action();
    }
  }
}
