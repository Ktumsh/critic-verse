import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordChangePasswordPage } from './forgot-password-change-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordChangePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordChangePasswordPageRoutingModule {}
