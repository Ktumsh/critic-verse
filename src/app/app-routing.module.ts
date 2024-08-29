import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/auth/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainPageModule),
  },
<<<<<<< HEAD
=======
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/main/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./pages/main/game/game.module').then((m) => m.GamePageModule),
  },
  {
    path: 'movie',
    loadChildren: () =>
      import('./pages/main/movie/movie.module').then((m) => m.MoviePageModule),
  },
  {
    path: 'tv',
    loadChildren: () =>
      import('./pages/main/tv/tv.module').then((m) => m.TvPageModule),
  },
  {
    path: 'main/game-detail/:id',
    loadChildren: () =>
      import('./pages/main/game-detail/game-detail.module').then(
        (m) => m.GameDetailPageModule
      ),
  },
  {
    path: 'main/movie-detail/:id',
    loadChildren: () =>
      import('./pages/main/movie-detail/movie-detail.module').then(
        (m) => m.MovieDetailPageModule
      ),
  },
  {
    path: 'main/tv-detail/:id',
    loadChildren: () =>
      import('./pages/main/tv-detail/tv-detail.module').then(
        (m) => m.TvDetailPageModule
      ),
  },
>>>>>>> 20d9b19d21764f961d342c29c85c75d6913dec62
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
