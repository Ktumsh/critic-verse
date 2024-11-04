import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordChangePasswordPageRoutingModule } from './forgot-password-change-password-routing.module';

import { ForgotPasswordChangePasswordPage } from './forgot-password-change-password.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordChangePasswordPageRoutingModule,
    SharedModule,
  ],
  declarations: [ForgotPasswordChangePasswordPage],
})
export class ForgotPasswordChangePasswordPageModule {}
