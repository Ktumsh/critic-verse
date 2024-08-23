import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'game',
        loadChildren: () =>
          import('./game/game.module').then((m) => m.GamePageModule),
      },
      {
        path: 'movie',
        loadChildren: () =>
          import('./movie/movie.module').then((m) => m.MoviePageModule),
      },
      {
        path: 'tv',
        loadChildren: () =>
          import('./tv/tv.module').then((m) => m.TvPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}