import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupUsernamePage } from './signup-username.page';

const routes: Routes = [
  {
    path: '',
    component: SignupUsernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupUsernamePageRoutingModule {}
