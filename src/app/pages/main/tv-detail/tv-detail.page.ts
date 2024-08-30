import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { TV_MODEL } from 'src/app/models/tv.model';
import { TvShow } from 'src/app/types/tv';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.page.html',
  styleUrls: ['./tv-detail.page.scss'],
})
export class TvDetailPage implements OnInit {
  tv!: TvShow;
  selectedSegment: string = 'reviews';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const tvById = TV_MODEL.find((tv) => tv.id === id);

    if (tvById) {
      this.tv = tvById;
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

  getAverageRating(tv: TvShow): number {
    if (!tv.reviews || tv.reviews.length === 0) return 0;

    const totalRating = tv.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return totalRating / tv.reviews.length;
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
