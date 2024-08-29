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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
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
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'game-detail',
        loadChildren: () =>
          import('./game-detail/game-detail.module').then(
            (m) => m.GameDetailPageModule
          ),
      },
      {
        path: 'movie-detail',
        loadChildren: () =>
          import('./movie-detail/movie-detail.module').then(
            (m) => m.MovieDetailPageModule
          ),
      },
      {
        path: 'tv-detail',
        loadChildren: () =>
          import('./tv-detail/tv-detail.module').then(
            (m) => m.TvDetailPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
