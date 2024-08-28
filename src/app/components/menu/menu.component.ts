import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() user: User | undefined;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'] as User;
    }
  }

  ngOnInit() {
    if (this.user) {
      console.log('Usuario recibido en la modal:', this.user);
    }
  }

  async showAlert() {
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
          handler: () => {
            this.router.navigate(['/auth']);
          },
        },
      ],
    });

    await alert.present();
  }

  pages = [
    {
      title: 'Juegos',
      url: '/game',
      icon: 'assets/icon/core/game-fill.svg',
      items: [
        { title: 'Explorar Juegos', url: '' },
        { title: 'Nuevos Juegos', url: '' },
      ],
    },
    {
      title: 'Películas',
      url: '/movie',
      icon: 'assets/icon/core/movie-fill.svg',
      items: [
        { title: 'Explorar Películas', url: '' },
        { title: 'Nuevas Películas', url: '' },
      ],
    },
    {
      title: 'TV',
      url: '/tv',
      icon: 'assets/icon/core/tv-fill.svg',
      items: [
        { title: 'Explorar TV', url: '' },
        { title: 'Nuevos TV Shows', url: '' },
      ],
    },
  ];
}
