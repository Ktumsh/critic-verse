import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    component: SignupPage,
  },
  {
    path: 'signup-username',
    loadChildren: () =>
      import('./signup-username/signup-username.module').then(
        (m) => m.SignupUsernamePageModule
      ),
  },
  {
    path: 'signup-password',
    loadChildren: () =>
      import('./signup-password/signup-password.module').then(
        (m) => m.SignupPasswordPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupPageRoutingModule {}
