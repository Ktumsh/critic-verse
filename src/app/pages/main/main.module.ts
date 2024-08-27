import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { TabsModule } from 'src/app/components/tabs/tabs.module';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    SharedModule,
    TabsModule,
    MenuModule,
  ],
  declarations: [MainPage],
})
export class MainPageModule {}
