import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/types/review';
import { User } from 'src/app/types/user';
import { AddReviewComponent } from '../add-review/add-review.component';
import { ratingClass } from 'src/utils/common';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss'],
})
export class ProfileReviewsComponent implements OnInit {
  @Input() user!: User;

  selectedSegment: string = 'games';
  gameReviews: (Review & { title: string; image: string })[] = [];
  movieReviews: (Review & { title: string; image: string })[] = [];
  tvShowReviews: (Review & { title: string; image: string })[] = [];

  isLoading: boolean = true;

  constructor(
    private modalController: ModalController,
    private reviewService: ReviewService,
    private contentService: ContentService
  ) {}

  async ngOnInit() {
    await this.loadUserReviews();
  }

  async loadUserReviews() {
    try {
      this.isLoading = true;

      const reviews = await this.reviewService.getReviewsByUserId(this.user.id);

      for (const review of reviews) {
        const game = await this.contentService.getGameById(
          review.contentId ?? ''
        );
        if (game) {
          this.gameReviews.push({
            ...review,
            title: game.title,
            image: game.image,
          });
          continue;
        }

        const movie = await this.contentService.getMovieById(
          review.contentId ?? ''
        );
        if (movie) {
          this.movieReviews.push({
            ...review,
            title: movie.title,
            image: movie.image,
          });
          continue;
        }

        const tvShow = await this.contentService.getTvShowById(
          review.contentId ?? ''
        );
        if (tvShow) {
          this.tvShowReviews.push({
            ...review,
            title: tvShow.title,
            image: tvShow.image,
          });
        }
      }
    } catch (error) {
      console.error('Error al cargar las reseñas del usuario:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async editReview(review: Review) {
    try {
      const contentId = review.contentId ?? '';
      const game = await this.contentService.getGameById(contentId);
      const movie = await this.contentService.getMovieById(contentId);
      const tvShow = await this.contentService.getTvShowById(contentId);

      const modal = await this.modalController.create({
        component: AddReviewComponent,
        cssClass: 'custom-modal',
        initialBreakpoint: 1,
        breakpoints: [0, 1],
        componentProps: {
          game: game || null,
          movie: movie || null,
          tvShow: tvShow || null,
          review,
        },
      });

      modal.onDidDismiss().then(async (result) => {
        if (result.data && result.data.updatedReview) {
          this.updateReviewInArray(result.data.updatedReview);
        }
      });

      return await modal.present();
    } catch (error) {
      console.error('Error al editar la reseña:', error);
    }
  }

  private updateReviewInArray(updatedReview: Review) {
    let reviewArray: (Review & { title: string; image: string })[] = [];

    switch (this.selectedSegment) {
      case 'games':
        reviewArray = this.gameReviews;
        break;
      case 'movies':
        reviewArray = this.movieReviews;
        break;
      case 'tv':
        reviewArray = this.tvShowReviews;
        break;
    }

    const index = reviewArray.findIndex((r) => r.id === updatedReview.id);
    if (index > -1) {
      reviewArray[index] = {
        ...reviewArray[index],
        rating: updatedReview.rating,
        comment: updatedReview.comment,
        date: updatedReview.date,
      };
      this.refreshReviewArray(reviewArray);
    }
  }

  private refreshReviewArray(
    updatedArray: (Review & { title: string; image: string })[]
  ) {
    switch (this.selectedSegment) {
      case 'games':
        this.gameReviews = [...updatedArray];
        break;
      case 'movies':
        this.movieReviews = [...updatedArray];
        break;
      case 'tv':
        this.tvShowReviews = [...updatedArray];
        break;
    }
  }

  getRatingClass = ratingClass;

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
