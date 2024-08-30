import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/types/game';
import { GAME_MODEL } from 'src/app/models/game.model';
import { Location } from '@angular/common';
import { getPlatFormIcon } from 'src/utils/platform';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {
  game!: Game;
  selectedSegment: string = 'reviews';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const gameById = GAME_MODEL.find((game) => game.id === id);

    if (gameById) {
      this.game = gameById;
    } else {
      this.router.navigate(['/not-found']);
    }
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

  getAverageRating(game: Game): number {
    if (!game.reviews || game.reviews.length === 0) return 0;

    const totalRating = game.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return totalRating / game.reviews.length;
  }

  getRatingDescription(rating: number): string {
    if (rating >= 9) {
      return 'Aclamada mundialmente';
    } else if (rating >= 8) {
      return 'Generalmente favorable';
    } else if (rating >= 6) {
      return 'Recibida con críticas mixtas';
    } else if (rating >= 4) {
      return 'Críticas generalmente negativas';
    } else if (rating >= 2) {
      return 'Mala recepción crítica';
    } else {
      return 'Universalmente despreciada';
    }
  }

  getUserRatingDescription(userRating: number): string {
    if (userRating >= 9) {
      return 'Extremadamente popular entre los jugadores';
    } else if (userRating >= 8) {
      return 'Muy bien valorado por la comunidad';
    } else if (userRating >= 6) {
      return 'Opiniones mixtas de los usuarios';
    } else if (userRating >= 4) {
      return 'Críticas negativas de la mayoría de los jugadores';
    } else if (userRating >= 2) {
      return 'Generalmente no gustado por los usuarios';
    } else {
      return 'Aborrecido por la mayoría de los jugadores';
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
}
