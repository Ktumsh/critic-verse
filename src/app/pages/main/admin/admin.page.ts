import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { UserListComponent } from 'src/app/components/shared/user-list/user-list.component';
import { ReviewsListComponent } from 'src/app/components/shared/reviews-list/reviews-list.component';
import { ReportsListComponent } from 'src/app/components/shared/reports-list/reports-list.component';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ContentListComponent } from 'src/app/components/shared/content-list/content-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  newUsers: number | undefined;
  totalReviews: number | undefined;
  pendingReviews: number | undefined;
  averageRecentRating: number | undefined;
  isLoading: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(
    private location: Location,
    private modalController: ModalController,
    private reviewService: ReviewService,
    private userService: UserService,
    private nativeStorage: NativeStorage
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadAllData();
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  setupSubscriptions() {
    this.subscriptions.push(
      this.userService.users$.subscribe((users) => {
        this.newUsers = users.length;
      }),
      this.reviewService.reviews$.subscribe((reviews) => {
        this.totalReviews = reviews.length;
        this.averageRecentRating = this.calculateAverageRating(reviews);
        this.loadPendingReviewsFromLocalStorage(reviews);
      })
    );
  }

  async loadAllData() {
    try {
      const users = await this.userService.getAllUsers();
      this.newUsers = users.length;

      const allReviews = await this.reviewService.getAllReviews();
      this.totalReviews = allReviews.length;

      this.loadPendingReviewsFromLocalStorage(allReviews);
      this.averageRecentRating = this.calculateAverageRating(allReviews);

      this.isLoading = false;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  async loadPendingReviewsFromLocalStorage(allReviews: any[]) {
    try {
      const reviewedReviewIds: string[] = await this.nativeStorage
        .getItem('reviewedReviewIds')
        .catch(() => []);
      this.pendingReviews = allReviews.filter(
        (review) => !reviewedReviewIds.includes(review.id)
      ).length;
    } catch (error) {
      console.error('Error al cargar reseñas pendientes:', error);
    }
  }

  calculateAverageRating(reviews: any[]): number {
    if (reviews.length === 0) return 0;
    const sumRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sumRatings / reviews.length).toFixed(1));
  }

  async openModal(component: any) {
    const modal = await this.modalController.create({
      component: component,
    });

    modal.onDidDismiss().then(() => {
      this.loadAllData();
    });

    return await modal.present();
  }

  openUserList = () => this.openModal(UserListComponent);
  openReviewList = () => this.openModal(ReviewsListComponent);
  openReportedContent = () => this.openModal(ReportsListComponent);
  openContentList = () => this.openModal(ContentListComponent);

  goBack() {
    this.location.back();
  }
}
