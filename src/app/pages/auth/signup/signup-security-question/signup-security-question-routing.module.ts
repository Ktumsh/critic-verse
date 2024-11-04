import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupSecurityQuestionPage } from './signup-security-question.page';

const routes: Routes = [
  {
    path: '',
    component: SignupSecurityQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupSecurityQuestionPageRoutingModule {}
