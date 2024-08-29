import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvDetailPageRoutingModule } from './tv-detail-routing.module';

import { TvDetailPage } from './tv-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvDetailPageRoutingModule
  ],
  declarations: [TvDetailPage]
})
export class TvDetailPageModule {}
