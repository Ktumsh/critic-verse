import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameDetailPageRoutingModule } from './game-detail-routing.module';

import { GameDetailPage } from './game-detail.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameDetailPageRoutingModule,
    SharedModule,
    NgOptimizedImage,
  ],
  declarations: [GameDetailPage],
})
export class GameDetailPageModule {}
