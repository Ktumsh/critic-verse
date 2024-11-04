import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordAnswerPage } from './forgot-password-answer.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordAnswerPageRoutingModule {}
