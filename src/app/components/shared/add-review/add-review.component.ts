import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
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

  inputValue: string = '';
  item: any;
  rating: number = 0;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.item = this.game || this.movie || this.tvShow;
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

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
