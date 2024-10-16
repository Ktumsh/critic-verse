import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  AlertController,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/types/review';
import { User } from 'src/app/types/user';
import { AddReviewComponent } from '../add-review/add-review.component';
import { ratingClass } from 'src/utils/common';
import { ReviewOptionsComponent } from '../review-options/review-options.component';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss'],
})
export class ProfileReviewsComponent implements OnInit, OnChanges {
  // ======= Propiedades =======
  @Input() user!: User;

  selectedSegment: string = 'games';
  gameReviews: (Review & { title: string; image: string })[] = [];
  movieReviews: (Review & { title: string; image: string })[] = [];
  tvShowReviews: (Review & { title: string; image: string })[] = [];

  longReviewMap: { [reviewId: string]: boolean } = {};
  expandedReviews: { [reviewId: string]: boolean } = {};

  isLoading: boolean = true;

  constructor(
    private modalController: ModalController,
    private reviewService: ReviewService,
    private contentService: ContentService,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadUserReviews();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && !changes['user'].isFirstChange()) {
      await this.loadUserReviews();
    }
  }

  // ======= Métodos de Inicialización =======
  private async loadUserReviews() {
    try {
      this.isLoading = true;

      const reviews = await this.reviewService.getReviewsByUserId(this.user.id);

      for (const review of reviews) {
        const contentId = review.contentId ?? '';

        const [game, movie, tvShow] = await Promise.all([
          this.contentService.getGameById(contentId),
          this.contentService.getMovieById(contentId),
          this.contentService.getTvShowById(contentId),
        ]);

        if (game) {
          this.gameReviews.push({
            ...review,
            title: game.title,
            image: game.image,
          });
          continue;
        }

        if (movie) {
          this.movieReviews.push({
            ...review,
            title: movie.title,
            image: movie.image,
          });
          continue;
        }

        if (tvShow) {
          this.tvShowReviews.push({
            ...review,
            title: tvShow.title,
            image: tvShow.image,
          });
        }
      }
    } catch (error) {
      console.error('Error al cargar las reseñas del usuario:', error);
    } finally {
      this.isLoading = false;
      this.updateLongReviewMap();
    }
  }

  // ======= Gestión de Reseñas =======
  async editReview(review: Review) {
    try {
      const contentId = review.contentId ?? '';
      const [game, movie, tvShow] = await Promise.all([
        this.contentService.getGameById(contentId),
        this.contentService.getMovieById(contentId),
        this.contentService.getTvShowById(contentId),
      ]);

      const modal = await this.modalController.create({
        component: AddReviewComponent,
        cssClass: 'custom-modal',
        initialBreakpoint: 1,
        breakpoints: [0, 1],
        componentProps: {
          game: game || null,
          movie: movie || null,
          tvShow: tvShow || null,
          review,
        },
      });

      modal.onDidDismiss().then(async (result) => {
        if (result.data && result.data.updatedReview) {
          this.updateReviewInArray(result.data.updatedReview);
        }
      });

      await modal.present();
    } catch (error) {
      console.error('Error al editar la reseña:', error);
    }
  }

  async deleteReview(reviewId: string) {
    try {
      await this.reviewService.deleteReviewById(reviewId);
      this.removeReviewFromArray(reviewId);
      this.presentToast(
        '¡Reseña eliminada exitosamente!',
        'checkmark-circle-outline'
      );
    } catch (error) {
      console.error('Error al eliminar la reseña:', error);
      this.presentToast('Error al eliminar la reseña.', 'close-circle-outline');
    }
  }

  private updateReviewInArray(updatedReview: Review) {
    let reviewArray: (Review & { title: string; image: string })[] = [];

    switch (this.selectedSegment) {
      case 'games':
        reviewArray = this.gameReviews;
        break;
      case 'movies':
        reviewArray = this.movieReviews;
        break;
      case 'tv':
        reviewArray = this.tvShowReviews;
        break;
    }

    const index = reviewArray.findIndex((r) => r.id === updatedReview.id);
    if (index > -1) {
      reviewArray[index] = {
        ...reviewArray[index],
        rating: updatedReview.rating,
        comment: updatedReview.comment,
        date: updatedReview.date,
      };
      this.refreshReviewArray(reviewArray);
      this.updateLongReviewMap();
    }
  }

  private removeReviewFromArray(reviewId: string) {
    const segmentReviews = this.getSelectedSegmentReviews();
    const updatedReviews = segmentReviews.filter(
      (review) => review.id !== reviewId
    );
    this.refreshReviewArray(updatedReviews);
    this.updateLongReviewMap();
  }

  private getSelectedSegmentReviews(): (Review & {
    title: string;
    image: string;
  })[] {
    switch (this.selectedSegment) {
      case 'games':
        return this.gameReviews;
      case 'movies':
        return this.movieReviews;
      case 'tv':
        return this.tvShowReviews;
      default:
        return [];
    }
  }

  private refreshReviewArray(
    updatedArray: (Review & { title: string; image: string })[]
  ) {
    switch (this.selectedSegment) {
      case 'games':
        this.gameReviews = [...updatedArray];
        break;
      case 'movies':
        this.movieReviews = [...updatedArray];
        break;
      case 'tv':
        this.tvShowReviews = [...updatedArray];
        break;
    }
  }

  private updateLongReviewMap() {
    this.longReviewMap = {};
    const allReviews = [
      ...this.gameReviews,
      ...this.movieReviews,
      ...this.tvShowReviews,
    ];
    allReviews.forEach((review) => {
      this.longReviewMap[review.id] =
        !!review.comment && review.comment.length > 260;
    });
  }

  // ======= Interacciones con la UI =======
  toggleExpandReview(reviewId: string) {
    this.expandedReviews[reviewId] = !this.expandedReviews[reviewId];
  }

  async openEditDeletePopover(event: MouseEvent, review: Review) {
    const popover = await this.popoverController.create({
      component: ReviewOptionsComponent,
      cssClass: 'custom-popover v2',
      event: event,
      translucent: true,
      componentProps: {
        review,
        user: this.user,
        isProfilePage: true,
      },
    });

    popover.onWillDismiss().then((result) => {
      if (result.data) {
        switch (result.data.action) {
          case 'edit':
            this.editReview(review);
            break;
          case 'delete':
            this.confirmDeleteAlert(review);
            break;
        }
      }
    });

    await popover.present();
  }

  async confirmDeleteAlert(review: Review) {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'custom-alert v2',
      header: 'Confirmar eliminación',
      message: '¿Estás seguro que deseas eliminar esta reseña?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteReview(review.id);
          },
        },
      ],
    });

    await alert.present();
  }

  // ======= Utilidades =======
  getRatingClass = ratingClass;

  private async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      swipeGesture: 'vertical',
      icon,
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }

  // ======= Segment Control =======
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  // ======= Manejo de Modal =======
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
