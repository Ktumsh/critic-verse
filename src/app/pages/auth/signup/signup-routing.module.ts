import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  },  {
    path: 'step-2',
    loadChildren: () => import('./step-2/step-2.module').then( m => m.Step2PageModule)
  },
  {
    path: 'step-3',
    loadChildren: () => import('./step-3/step-3.module').then( m => m.Step3PageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupPageRoutingModule {}
