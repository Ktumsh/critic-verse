import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/types/game';
import { Location } from '@angular/common';
import { getPlatFormIcon } from 'src/utils/platform';
import { IonContent, ModalController } from '@ionic/angular';
import { AddReviewComponent } from 'src/app/components/shared/add-review/add-review.component';
import { ContentService } from 'src/app/services/content.service';
import { Review } from 'src/app/types/review';
import { refreshContentData } from 'src/utils/common';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  game: Game | null = null;
  selectedSegment: string = 'reviews';
  reviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private modalController: ModalController,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      await this.loadGame(id);
    }
  }

  async loadGame(id: string) {
    try {
      const gameById = await this.contentService.getGameById(id);

      if (gameById) {
        this.game = gameById;
        this.ngZone.run(() => {
          this.game = gameById;
          this.cdr.detectChanges();
        });
      } else {
        console.log(
          `No se encontró un juego con ID "${id}" en la base de datos.`
        );
      }
    } catch (error) {
      console.error(`Error al cargar el juego con ID "${id}":`, error);
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

  async refreshGameData() {
    await refreshContentData(this.game!.id, this.loadGame.bind(this), this.cdr);
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
      this.loadGame(this.game!.id).then(() => {
        this.cdr.detectChanges();
      });
    });

    return await modal.present();
  }
}
