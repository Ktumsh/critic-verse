import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { AddReviewComponent } from 'src/app/components/shared/add-review/add-review.component';
import { ContentService } from 'src/app/services/content.service';
import { TvShow } from 'src/app/types/tv';
import { refreshContentData } from 'src/utils/common';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.page.html',
  styleUrls: ['./tv-detail.page.scss'],
})
export class TvDetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  tv: TvShow | null = null;
  selectedSegment: string = 'reviews';

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private modalController: ModalController,
    private contentService: ContentService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.loadTvShow(id);
    }
  }

  async loadTvShow(id: string) {
    try {
      const tvShowById = await this.contentService.getTvShowById(id);

      if (tvShowById) {
        this.tv = tvShowById;
        this.ngZone.run(() => {
          this.tv = tvShowById;
          this.cdr.detectChanges();
        });
      } else {
        console.log(
          `No se encontró una serie con ID "${id}" en la base de datos.`
        );
      }
    } catch (error) {
      console.error(`Error al cargar la serie con ID "${id}":`, error);
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

  async refreshTvData() {
    await refreshContentData(this.tv!.id, this.loadTvShow.bind(this), this.cdr);
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
      this.loadTvShow(this.tv!.id).then(() => {
        this.cdr.detectChanges();
      });
    });

    return await modal.present();
  }
}
