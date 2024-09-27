import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPasswordPageRoutingModule } from './login-password-routing.module';

import { LoginPasswordPage } from './login-password.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPasswordPageRoutingModule,
    SharedModule,
  ],
  declarations: [LoginPasswordPage],
})
export class LoginPasswordPageModule {}
