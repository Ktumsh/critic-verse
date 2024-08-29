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
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
