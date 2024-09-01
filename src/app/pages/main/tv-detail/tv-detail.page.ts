import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { BottomSheetComponent } from 'src/app/components/shared/bottom-sheet/bottom-sheet.component';
import { TV_MODEL } from 'src/app/models/tv.model';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { TvShow } from 'src/app/types/tv';
import { averageRating } from 'src/utils/average-rating';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.page.html',
  styleUrls: ['./tv-detail.page.scss'],
})
export class TvDetailPage implements OnInit {
  tv!: TvShow;
  selectedSegment: string = 'reviews';

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  _bottomSheet = inject(MatBottomSheet);

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const tvById = TV_MODEL.find((tv) => tv.id === id);

    if (tvById) {
      this.tv = tvById;
    }

    this.tv.reviews.forEach((review) => {
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

  getAverageEpisodes(
    episodesPerSeason: { season: number; episodes: number }[]
  ): number {
    if (episodesPerSeason.length === 0) return 0;

    const totalEpisodes = episodesPerSeason.reduce(
      (sum, season) => sum + season.episodes,
      0
    );
    const numberOfSeasons = episodesPerSeason.length;

    const averageEpisodes = totalEpisodes / numberOfSeasons;

    return Math.round(averageEpisodes);
  }

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
