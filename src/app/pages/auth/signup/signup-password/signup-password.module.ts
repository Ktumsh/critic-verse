import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPasswordPageRoutingModule } from './signup-password-routing.module';

import { SignupPasswordPage } from './signup-password.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPasswordPageRoutingModule,
    SharedModule,
  ],
  declarations: [SignupPasswordPage],
})
export class SignupPasswordPageModule {}
