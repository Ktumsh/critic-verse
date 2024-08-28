import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EditProfileModule } from 'src/app/components/edit-profile/edit-profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule,
    EditProfileModule,
    NgOptimizedImage,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
