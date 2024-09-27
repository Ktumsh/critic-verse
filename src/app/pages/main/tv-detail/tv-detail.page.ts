import { Location } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  IonContent,
  ModalController,
} from '@ionic/angular';
import { AddReviewComponent } from 'src/app/components/shared/add-review/add-review.component';
import { BottomSheetComponent } from 'src/app/components/shared/bottom-sheet/bottom-sheet.component';
import { TV_MODEL } from 'src/app/models/tv.model';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { TvShow } from 'src/app/types/tv';
import { averageRating } from 'src/utils/average-rating';
import {
  ratingCinemaDescription,
  ratingDescription,
} from 'src/utils/rating-desc';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.page.html',
  styleUrls: ['./tv-detail.page.scss'],
})
export class TvDetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  tv!: TvShow;
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
      componentProps: { tvShow: this.tv },
    });

    modal.onDidDismiss().then(() => {
      this.content.getScrollElement().then((scrollElement) => {
        scrollElement.style.overflow = '';
      });
    });

    return await modal.present();
  }
}
