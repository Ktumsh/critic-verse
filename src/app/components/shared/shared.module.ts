import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { LogoComponent } from './logo/logo.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileReviewsComponent } from './profile-reviews/profile-reviews.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HelpComponent } from './help/help.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AdminFloatBtnComponent } from './admin-float-btn/admin-float-btn.component';
import { ReportedContentComponent } from './reported-content/reported-content.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { UserListComponent } from './user-list/user-list.component';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

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
    BottomSheetComponent,
    AdminFloatBtnComponent,
    ReportedContentComponent,
    ReviewsListComponent,
    UserListComponent,
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
    BottomSheetComponent,
    AdminFloatBtnComponent,
    ReportedContentComponent,
    ReviewsListComponent,
    UserListComponent,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: (() => {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.itemsPerPageLabel = '';
        paginatorIntl.nextPageLabel = 'Siguiente';
        paginatorIntl.previousPageLabel = 'Anterior';
        paginatorIntl.getRangeLabel = (
          page: number,
          pageSize: number,
          length: number
        ) => {
          if (length === 0 || pageSize === 0) {
            return `1 de 1`;
          }
          const totalPages = Math.ceil(length / pageSize);
          return `${page + 1} de ${totalPages}`;
        };
        return paginatorIntl;
      })(),
    },
  ],
})
export class SharedModule {}
