import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private router: Router) {}

  pages = [
    {
      title: 'Juegos',
      url: '/game',
      icon: 'game-controller',
      fillIcon: 'fill-game-controller',
      items: [
        { title: 'Explorar Juegos', url: '' },
        { title: 'Nuevos Juegos', url: '' },
      ],
    },
    {
      title: 'Películas',
      url: '/movie',
      icon: 'movie',
      fillIcon: 'fill-movie',
      items: [
        { title: 'Explorar Películas', url: '' },
        { title: 'Nuevas Películas', url: '' },
      ],
    },
    {
      title: 'TV',
      url: '/tv',
      icon: 'tv',
      fillIcon: 'fill-tv',
      items: [
        { title: 'Explorar TV', url: '' },
        { title: 'Nuevos TV Shows', url: '' },
      ],
    },
  ];

  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Sí, cerrar sesión',
      role: 'confirm',
      handler: () => {
        this.router.navigate(['/login']);
      },
    },
  ];
}
