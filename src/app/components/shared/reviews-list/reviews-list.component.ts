import { Component, inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalController } from '@ionic/angular';
import { GAME_MODEL } from 'src/app/models/game.model';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { TV_MODEL } from 'src/app/models/tv.model';
import { randomName, randomAvatar } from 'src/app/models/user.model';
import { Review } from 'src/app/types/review';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
})
export class ReviewsListComponent implements OnInit {
  filterOption: string = 'all';

  totalReviews!: number;
  totalGameReviews!: number;
  totalMovieReviews!: number;
  totalTvReviews!: number;

  allReviews: Review[] = [];

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  _bottomSheet = inject(MatBottomSheet);

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.calculateTotalReviews();
    this.loadAllReviews();

    this.allReviews.forEach((review) => {
      this.userNamesMap[review.id] = this.getRandomName();
      this.avatarsMap[review.id] = this.getRandomAvatar();
    });
  }

  calculateTotalReviews() {
    this.totalGameReviews = GAME_MODEL.reduce(
      (acc, game) => acc + game.reviews.length,
      0
    );
    this.totalMovieReviews = MOVIE_MODEL.reduce(
      (acc, movie) => acc + movie.reviews.length,
      0
    );
    this.totalTvReviews = TV_MODEL.reduce(
      (acc, tv) => acc + tv.reviews.length,
      0
    );
    this.totalReviews =
      this.totalGameReviews + this.totalMovieReviews + this.totalTvReviews;
  }

  filterData(event: any) {
    const selectedOption = event.detail.value;
    switch (selectedOption) {
      case 'all':
        this.loadAllReviews();
        break;
      case 'game':
        this.loadGameReviews();
        break;
      case 'movie':
        this.loadMovieReviews();
        break;
      case 'tv':
        this.loadTvReviews();
        break;
    }
  }

  getRandomName = randomName;

  getRandomAvatar = randomAvatar;

  loadAllReviews() {
    this.allReviews = [
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
  }

  loadGameReviews() {
    this.allReviews = GAME_MODEL.reduce<Review[]>(
      (acc, game) => acc.concat(game.reviews),
      []
    );
  }

  loadMovieReviews() {
    this.allReviews = MOVIE_MODEL.reduce<Review[]>(
      (acc, movie) => acc.concat(movie.reviews),
      []
    );
  }

  loadTvReviews() {
    this.allReviews = TV_MODEL.reduce<Review[]>(
      (acc, tv) => acc.concat(tv.reviews),
      []
    );
  }

  openReportAlert(user: any): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        title: 'Reseña de ' + '"' + user + '"',
        options: [
          {
            label: 'Marcar como revisado',
            isSuccess: true,
          },
          {
            label: 'Marcar como inapropiado',
          },
          {
            label: 'Enviar restricción al usuario',
            isDanger: true,
          },
        ],
      },
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
