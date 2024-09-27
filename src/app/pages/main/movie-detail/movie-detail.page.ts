import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  IonContent,
  ModalController,
} from '@ionic/angular';
import { Location } from '@angular/common';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { Movie } from 'src/app/types/movie';
import {
  ratingCinemaDescription,
  ratingDescription,
} from 'src/utils/rating-desc';
import { averageRating } from 'src/utils/average-rating';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { BottomSheetComponent } from 'src/app/components/shared/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddReviewComponent } from 'src/app/components/shared/add-review/add-review.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  movie!: Movie;
  selectedSegment: string = 'reviews';

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  _bottomSheet = inject(MatBottomSheet);

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const movieById = MOVIE_MODEL.find((movie) => movie.id === id);

    if (movieById) {
      this.movie = movieById;
    }

    this.movie.reviews.forEach((review) => {
      this.userNamesMap[review.id] = this.getRandomName();
      this.avatarsMap[review.id] = this.getRandomAvatar();
    });
  }

  openReportAlert(user: any): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        title: 'Reportar contenido de ' + '"' + user + '"',
        options: [
          {
            label: 'Crear reporte',
          },
          {
            label: 'Cancelar',
            isDanger: true,
          },
        ],
      },
    });
  }

  getAverageRating = averageRating;

  getRatingDescription = ratingDescription;

  getRandomName = randomName;

  getRandomAvatar = randomAvatar;

  getUserRatingDescription = ratingCinemaDescription;

  goBack() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async openAddReviewModal() {
    this.content.getScrollElement().then((scrollElement) => {
      scrollElement.style.overflow = 'hidden';
    });

    const modal = await this.modalController.create({
      component: AddReviewComponent,
      cssClass: 'custom-modal',
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      componentProps: { movie: this.movie },
    });

    modal.onDidDismiss().then(() => {
      this.content.getScrollElement().then((scrollElement) => {
        scrollElement.style.overflow = '';
      });
    });

    return await modal.present();
  }
}
