import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IonContent } from '@ionic/angular';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ratingClass } from 'src/utils/common';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  @Input() item!: Game | Movie | TvShow;

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    if (this.item && this.item.reviews) {
      this.item.reviews.forEach((review) => {
        this.userNamesMap[review.id] = this.getRandomName();
        this.avatarsMap[review.id] = this.getRandomAvatar();
      });
    }
  }

  getRandomName = randomName;

  getRandomAvatar = randomAvatar;

  openReportAlert(user: string): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        title: `Reportar contenido de "${user}"`,
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

  getRatingClass = ratingClass;
}
