import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReportedContentComponent } from 'src/app/components/shared/reported-content/reported-content.component';
import { ReviewsListComponent } from 'src/app/components/shared/reviews-list/reviews-list.component';
import { UserListComponent } from 'src/app/components/shared/user-list/user-list.component';
import { GAME_MODEL } from 'src/app/models/game.model';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { TV_MODEL } from 'src/app/models/tv.model';
import { Review } from 'src/app/types/review';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(
    private location: Location,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadAllData();
  }

  filterOption: string = 'all';
  newUsers!: number;
  totalReviews!: number;
  pendingReviews!: number;
  averageRecentRating!: number;

  async openModal(component: any) {
    const modal = await this.modalController.create({
      component: component,
    });

    return await modal.present();
  }

  openUserList = () => this.openModal(UserListComponent);
  openReviewList = () => this.openModal(ReviewsListComponent);
  openReportedContent = () => this.openModal(ReportedContentComponent);

  calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const sumRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sumRatings / reviews.length;

    return parseFloat(average.toFixed(1));
  }

  filterData(event: any) {
    const selectedOption = event.detail.value;
    switch (selectedOption) {
      case 'all':
        this.loadAllData();
        break;
      case 'last7days':
        this.loadLast7DaysData();
        break;
      case 'lastMonth':
        this.loadLastMonthData();
        break;
    }
  }

  loadAllData() {
    this.newUsers = 80;

    const allReviews = [
      ...GAME_MODEL.reduce<Review[]>(
        (acc, game) => acc.concat(game.reviews),
        []
      ),
      ...MOVIE_MODEL.reduce<Review[]>(
        (acc, movie) => acc.concat(movie.reviews),
        []
      ),
      ...TV_MODEL.reduce<Review[]>((acc, tv) => acc.concat(tv.reviews), []),
    ];

    this.totalReviews = allReviews.length;
    this.pendingReviews = 2;

    this.averageRecentRating = this.calculateAverageRating(allReviews);
  }

  loadLast7DaysData() {
    this.newUsers = 12;
    this.totalReviews = 15;
    this.pendingReviews = 2;

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const recentReviews = [
      ...GAME_MODEL.reduce<Review[]>(
        (acc, game) => acc.concat(game.reviews),
        []
      ),
      ...MOVIE_MODEL.reduce<Review[]>(
        (acc, movie) => acc.concat(movie.reviews),
        []
      ),
      ...TV_MODEL.reduce<Review[]>((acc, tv) => acc.concat(tv.reviews), []),
    ].filter((review) => review.date >= last7Days);

    this.averageRecentRating = this.calculateAverageRating(recentReviews);
  }

  loadLastMonthData() {
    this.newUsers = 68;
    this.totalReviews = 32;
    this.pendingReviews = 0;

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const recentReviews = [
      ...GAME_MODEL.reduce<Review[]>(
        (acc, game) => acc.concat(game.reviews),
        []
      ),
      ...MOVIE_MODEL.reduce<Review[]>(
        (acc, movie) => acc.concat(movie.reviews),
        []
      ),
      ...TV_MODEL.reduce<Review[]>((acc, tv) => acc.concat(tv.reviews), []),
    ].filter((review) => review.date >= lastMonth);

    this.averageRecentRating = this.calculateAverageRating(recentReviews);
  }

  goBack() {
    this.location.back();
  }
}
