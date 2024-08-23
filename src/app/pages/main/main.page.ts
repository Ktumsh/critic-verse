import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  pages = [
    {
      title: 'Juegos',
      url: '/main/game',
      icon: 'game-controller',
      fillIcon: 'fill-game-controller',
      items: [
        { title: 'Explorar Juegos', url: '' },
        { title: 'Nuevos Juegos', url: '' },
      ],
    },
    {
      title: 'Películas',
      url: '/main/movie',
      icon: 'movie',
      fillIcon: 'fill-movie',
      items: [
        { title: 'Explorar Películas', url: '' },
        { title: 'Nuevas Películas', url: '' },
      ],
    },
    {
      title: 'TV',
      url: '/main/tv',
      icon: 'tv',
      fillIcon: 'fill-tv',
      items: [
        { title: 'Explorar TV', url: '' },
        { title: 'Nuevos TV Shows', url: '' },
      ],
    },
  ];
}
