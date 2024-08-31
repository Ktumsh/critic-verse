import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Location } from '@angular/common';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { Movie } from 'src/app/types/movie';
import { ratingDescription } from 'src/utils/rating-desc';
import { averageRating } from 'src/utils/average-rating';
import { randomAvatar, randomName } from 'src/app/models/user.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie!: Movie;
  selectedSegment: string = 'reviews';

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private actionSheetCtrl: ActionSheetController
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'custom-sheet',
      header: 'Reportar reseña',
      buttons: [
        {
          text: 'Enviar reporte',
          data: {
            action: 'report',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  getAverageRating = averageRating;

  getRatingDescription = ratingDescription;

  getRandomName = randomName;

  getRandomAvatar = randomAvatar;

  getUserRatingDescription(userRating: number): string {
    if (userRating >= 9) {
      return 'Extremadamente popular entre los espectadores';
    } else if (userRating >= 8) {
      return 'Muy bien valorado por la audiencia';
    } else if (userRating >= 6) {
      return 'Opiniones mixtas de los usuarios';
    } else if (userRating >= 4) {
      return 'Críticas negativas de la mayoría de los espectadores';
    } else if (userRating >= 2) {
      return 'Generalmente no gustado por los usuarios';
    } else {
      return 'Aborrecido por la mayoría de los espectadores';
    }
  }

  goBack() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
}
