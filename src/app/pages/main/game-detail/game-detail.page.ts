import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/types/game';
import { GAME_MODEL } from 'src/app/models/game.model';
import { Location } from '@angular/common';
import { getPlatFormIcon } from 'src/utils/platform';
import {
  ratingDescription,
  ratingGameDescription,
} from 'src/utils/rating-desc';
import { BottomSheetComponent } from 'src/app/components/shared/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { averageRating } from 'src/utils/average-rating';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { IonContent, ModalController } from '@ionic/angular';
import { AddReviewComponent } from 'src/app/components/shared/add-review/add-review.component';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  game!: Game;
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
    const gameById = GAME_MODEL.find((game) => game.id === id);

    if (gameById) {
      this.game = gameById;
    }

    this.game.reviews.forEach((review) => {
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

  getUserRatingDescription = ratingGameDescription;

  platformIcon(platform: string) {
    return getPlatFormIcon(platform);
  }

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
      componentProps: { game: this.game },
    });

    modal.onDidDismiss().then(() => {
      this.content.getScrollElement().then((scrollElement) => {
        scrollElement.style.overflow = '';
      });
    });

    return await modal.present();
  }
}
