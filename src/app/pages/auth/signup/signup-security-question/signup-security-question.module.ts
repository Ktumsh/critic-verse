import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupSecurityQuestionPageRoutingModule } from './signup-security-question-routing.module';

import { SignupSecurityQuestionPage } from './signup-security-question.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupSecurityQuestionPageRoutingModule,
    SharedModule,
  ],
  declarations: [SignupSecurityQuestionPage],
})
export class SignupSecurityQuestionPageModule {}
