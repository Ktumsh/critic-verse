import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvDetailPage } from './tv-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TvDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvDetailPageRoutingModule {}
