import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconsComponent } from '../icons/svg-icons/svg-icons.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    TabsComponent,
    CustomInputComponent,
    SvgIconsComponent,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    TabsComponent,
    CustomInputComponent,
    SvgIconsComponent,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule {}
