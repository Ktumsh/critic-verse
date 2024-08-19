import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'movie',
    loadChildren: () =>
      import('./pages/movie/movie.module').then((m) => m.MoviePageModule),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./pages/game/game.module').then((m) => m.GamePageModule),
  },
  {
    path: 'tv',
    loadChildren: () =>
      import('./pages/tv/tv.module').then((m) => m.TvPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
