import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { Review } from 'src/app/types/review';
import { TvShow } from 'src/app/types/tv';
import {
  ratingDescription,
  ratingPersonalDescription,
} from 'src/utils/rating-desc';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {
  @Input() game!: Game;
  @Input() movie!: Movie;
  @Input() tvShow!: TvShow;
  @Input() review!: Review | null;

  userId!: string;
  inputValue: string = '';
  rating: number = 1;
  containsSpoilers: boolean = false;
  item: any;

  constructor(
    private modalController: ModalController,
    private reviewService: ReviewService,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.userId = this.authService.user.id;
  }

  ngOnInit() {
    this.item = this.game || this.movie || this.tvShow;

    if (this.review) {
      this.inputValue = this.review.comment;
      this.rating = this.review.rating;
      this.containsSpoilers = this.review.containsSpoilers || false;
    }
  }

  onRangeChange(event: any) {
    if (this.game) {
      this.setRating(event.detail.value);
    }
    if (this.movie) {
      this.setRating(event.detail.value);
    }
    if (this.tvShow) {
      this.setRating(event.detail.value);
    }
  }

  setRating(number: number) {
    this.rating = number;
  }

  getRatingDescription = ratingDescription;

  getUserRatingDescription = (rating: number) => {
    return ratingPersonalDescription(rating);
  };

  onInputChange(event: any) {
    this.inputValue = event.target.value;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      swipeGesture: 'vertical',
      icon: 'checkmark-circle-outline',
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }

  async publishReview() {
    try {
      if (this.inputValue && this.inputValue.length < 50) {
        await this.presentToast(
          'La reseña debe tener al menos 50 caracteres si decides escribir una.'
        );
        return;
      }

      const contentId = this.item.id;

      if (this.review) {
        await this.reviewService.updateReview(
          this.review.id,
          this.rating,
          this.inputValue,
          this.containsSpoilers
        );
        await this.presentToast('¡Reseña actualizada exitosamente!');
      } else {
        await this.reviewService.insertReview(
          contentId,
          this.userId,
          this.rating,
          this.inputValue,
          this.containsSpoilers
        );
        await this.presentToast('¡Reseña publicada exitosamente!');
      }

      this.dismiss();
    } catch (error) {
      console.error('Error al publicar/actualizar la reseña:', error);
    }
  }

  dismiss() {
    this.modalController.dismiss({
      updatedReview: {
        id: this.review ? this.review.id : 'new-id',
        comment: this.inputValue,
        rating: this.rating,
        containsSpoilers: this.containsSpoilers,
        date: this.review?.date ? this.review.date : new Date(),
        userId: this.userId,
        contentId: this.item.id,
      },
    });
  }
}
