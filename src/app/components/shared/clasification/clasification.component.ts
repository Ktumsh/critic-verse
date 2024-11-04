import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { averageRating } from 'src/utils/average-rating';
import { ratingClass } from 'src/utils/common';
import {
  ratingCinemaDescription,
  ratingDescription,
  ratingGameDescription,
} from 'src/utils/rating-desc';

@Component({
  selector: 'app-clasification',
  templateUrl: './clasification.component.html',
  styleUrls: ['./clasification.component.scss'],
})
export class ClasificationComponent implements OnInit, OnChanges {
  @Input() item!: Game | Movie | TvShow;

  averageUserRating: number = 0;
  ratingDescriptionText: string = '';
  userRatingDescriptionText: string = '';

  constructor() {}

  ngOnInit(): void {
    this.calculateRatings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.calculateRatings();
    }
  }

  private calculateRatings(): void {
    this.averageUserRating = averageRating(this.item);
    this.ratingDescriptionText = this.getRatingDescriptionForItem(
      this.item.rating
    );
    this.userRatingDescriptionText = this.getUserRatingDescriptionForItem(
      this.averageUserRating
    );
  }

  isGame(item: Game | Movie | TvShow): item is Game {
    return (item as Game).detail.platforms !== undefined;
  }

  isMovie(item: Game | Movie | TvShow): item is Movie {
    return (item as Movie).detail.director !== undefined;
  }

  isTvShow(item: Game | Movie | TvShow): item is TvShow {
    return (item as TvShow).detail.director !== undefined;
  }

  getRatingDescriptionForItem(rating: number): string {
    return ratingDescription(rating);
  }

  getUserRatingDescriptionForItem(rating: number): string {
    if (this.item.reviews.length === 0) {
      return 'Sin calificaciones';
    }

    if (this.isGame(this.item)) {
      return ratingGameDescription(rating);
    } else if (this.isMovie(this.item) || this.isTvShow(this.item)) {
      return ratingCinemaDescription(rating);
    }
    return 'Descripción no disponible';
  }

  getRatingClass = ratingClass;
}
