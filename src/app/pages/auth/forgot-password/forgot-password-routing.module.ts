import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordPage } from './forgot-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage,
  },
  {
    path: '',
    redirectTo: 'forgot-password-answer',
    pathMatch: 'full',
  },
  {
    path: 'forgot-password-answer',
    loadChildren: () =>
      import('./forgot-password-answer/forgot-password-answer.module').then(
        (m) => m.ForgotPasswordAnswerPageModule
      ),
  },
  {
    path: 'forgot-password-change-password',
    loadChildren: () =>
      import(
        './forgot-password-change-password/forgot-password-change-password.module'
      ).then((m) => m.ForgotPasswordChangePasswordPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordPageRoutingModule {}
