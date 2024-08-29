import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { LogoComponent } from './logo/logo.component';
import { SvgIconsComponent } from './svg-icons/svg-icons.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileReviewsComponent } from './profile-reviews/profile-reviews.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    CustomButtonComponent,
    ChangePasswordComponent,
    AccountDetailsComponent,
    NotificationsComponent,
    ProfileReviewsComponent,
    ConfigurationComponent,
    HelpComponent,
    SvgIconsComponent,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    CustomButtonComponent,
    ChangePasswordComponent,
    AccountDetailsComponent,
    NotificationsComponent,
    ProfileReviewsComponent,
    ConfigurationComponent,
    HelpComponent,
    SvgIconsComponent,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
