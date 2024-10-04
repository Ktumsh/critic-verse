import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { AddReviewComponent } from 'src/app/components/shared/add-review/add-review.component';
import { TV_MODEL } from 'src/app/models/tv.model';
import { TvShow } from 'src/app/types/tv';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.page.html',
  styleUrls: ['./tv-detail.page.scss'],
})
export class TvDetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  //Variables
  tv!: TvShow;
  selectedSegment: string = 'reviews';

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
  }

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
