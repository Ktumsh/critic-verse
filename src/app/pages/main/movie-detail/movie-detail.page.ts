import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Movie } from 'src/app/types/movie';
import { AddReviewComponent } from 'src/app/components/shared/add-review/add-review.component';
import { ContentService } from 'src/app/services/content.service';
import { refreshContentData } from 'src/utils/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  movie: Movie | null = null;
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
      this.loadMovie(id);
    }
  }

  async loadMovie(id: string) {
    try {
      const movieById = await this.contentService.getMovieById(id);

      if (movieById) {
        this.ngZone.run(() => {
          this.movie = movieById;
          this.cdr.detectChanges();
        });
      } else {
        console.log(
          `No se encontró una película con ID "${id}" en la base de datos.`
        );
      }
    } catch (error) {
      console.error(`Error al cargar la película con ID "${id}":`, error);
    }
  }

  goBack() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async refreshMovieData() {
    await refreshContentData(
      this.movie!.id,
      this.loadMovie.bind(this),
      this.cdr
    );
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
      componentProps: { movie: this.movie },
    });

    modal.onDidDismiss().then(() => {
      this.content.getScrollElement().then((scrollElement) => {
        scrollElement.style.overflow = '';
      });
      this.loadMovie(this.movie!.id).then(() => {
        this.cdr.detectChanges();
      });
    });

    return await modal.present();
  }
}
