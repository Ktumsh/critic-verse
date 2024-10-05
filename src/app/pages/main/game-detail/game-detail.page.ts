import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/types/game';
import { GAME_MODEL } from 'src/app/models/game.model';
import { Location } from '@angular/common';
import { getPlatFormIcon } from 'src/utils/platform';
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
  }

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
