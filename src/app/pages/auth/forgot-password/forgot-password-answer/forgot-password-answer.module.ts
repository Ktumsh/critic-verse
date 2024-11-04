import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordAnswerPageRoutingModule } from './forgot-password-answer-routing.module';

import { ForgotPasswordAnswerPage } from './forgot-password-answer.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordAnswerPageRoutingModule,
    SharedModule,
  ],
  declarations: [ForgotPasswordAnswerPage],
})
export class ForgotPasswordAnswerPageModule {}
