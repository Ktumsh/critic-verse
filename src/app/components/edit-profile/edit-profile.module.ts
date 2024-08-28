import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EditProfileComponent],
  imports: [CommonModule, IonicModule, FormsModule, SharedModule],
  exports: [EditProfileComponent],
})
export class EditProfileModule {}
