import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvDetailPageRoutingModule } from './tv-detail-routing.module';

import { TvDetailPage } from './tv-detail.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvDetailPageRoutingModule,
    SharedModule,
    NgOptimizedImage,
  ],
  declarations: [TvDetailPage],
})
export class TvDetailPageModule {}
