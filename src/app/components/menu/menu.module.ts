import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MenuComponent } from './menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, IonicModule, RouterLink, NgOptimizedImage],
})
export class MenuModule {}
