import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupUsernamePageRoutingModule } from './signup-username-routing.module';

import { SignupUsernamePage } from './signup-username.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupUsernamePageRoutingModule,
    SharedModule,
  ],
  declarations: [SignupUsernamePage],
})
export class SignupUsernamePageModule {}
