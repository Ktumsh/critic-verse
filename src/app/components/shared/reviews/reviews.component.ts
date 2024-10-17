import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ActionSheetController,
  IonContent,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { ratingClass } from 'src/utils/common';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { ProfileReviewsComponent } from '../profile-reviews/profile-reviews.component';
import { Review } from 'src/app/types/review';
import { AddReviewComponent } from '../add-review/add-review.component';
import { ReviewOptionsComponent } from '../review-options/review-options.component';
import { ReportService } from 'src/app/services/report.service';
import { User } from 'src/app/types/user';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnChanges {
  // ======= Propiedades =======
  @Input() contentRef!: IonContent;
  @Input() item!: Game | Movie | TvShow;
  @Input() refreshContentData!: () => Promise<void>;

  userNamesList: { [key: string]: string } = {};
  avatarsList: { [key: string]: string } = {};

  revealedReviews: { [reviewId: string]: boolean } = {};
  expandedReviews: { [reviewId: string]: boolean } = {};
  longReviewList: { [reviewId: string]: boolean } = {};

  pendingDeleteList: { [reviewId: string]: boolean } = {};
  lastDeletedReviews: { [reviewId: string]: Review } = {};

  progressList: { [reviewId: string]: number } = {};
  showProgressBar: { [reviewId: string]: boolean } = {};
  progressIntervals: { [reviewId: string]: any } = {};
  deleteTimeouts: { [reviewId: string]: any } = {};

  user!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private modalController: ModalController,
    private toastController: ToastController,
    private popoverController: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private reportService: ReportService,
    private notificationsService: NotificationsService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.updateLongReviewList();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      await this.loadUsernamesAndAvatars();
      this.updateLongReviewList();
    }
  }

  // ======= Type Guards =======
  isGame(item: Game | Movie | TvShow): item is Game {
    return (item as Game).detail.platforms !== undefined;
  }

  isMovie(item: Game | Movie | TvShow): item is Movie {
    return (item as Movie).detail.director !== undefined;
  }

  isTvShow(item: Game | Movie | TvShow): item is TvShow {
    return (item as TvShow).detail.seasons !== undefined;
  }

  // ======= Métodos de Inicialización =======
  private updateLongReviewList() {
    this.longReviewList = {};
    this.item.reviews.forEach((review) => {
      this.longReviewList[review.id] = review.comment.length > 260;
    });
  }

  private async loadUsernamesAndAvatars() {
    if (!this.item || !this.item.reviews) {
      return;
    }

    const userIds = this.item.reviews.map((review) => review.userId);
    const users = await this.userService.getUsersByIds(userIds);
    const userMap = new Map(users.map((user) => [user.id, user]));

    this.item.reviews.forEach((review) => {
      const id = review.id;
      const user = userMap.get(review.userId);
      this.userNamesList[id] = user?.username || this.getRandomName();
      this.avatarsList[id] = user?.profileImage || this.getRandomAvatar();
    });
  }

  // ======= Gestión de Reseñas =======
  revealReview(reviewId: string) {
    this.revealedReviews[reviewId] = true;
  }

  toggleExpandReview(reviewId: string) {
    this.expandedReviews[reviewId] = !this.expandedReviews[reviewId];
  }

  async openReviewOptions(event: MouseEvent, review: Review) {
    const popover = await this.popoverController.create({
      component: ReviewOptionsComponent,
      cssClass: 'custom-popover v2',
      event: event,
      componentProps: {
        review,
        user: this.user,
      },
    });

    popover.onWillDismiss().then((result) => {
      if (result.data) {
        switch (result.data.action) {
          case 'edit':
            this.editReview(review);
            break;
          case 'delete':
            this.deleteReview(review);
            break;
          case 'viewProfileReviews':
            this.showProfileReviews();
            break;
        }
      }
    });

    await popover.present();
  }

  async deleteReview(review: Review) {
    const id = review.id;
    const reviewToDelete = this.item.reviews.find((r) => r.id === id) || null;

    if (!reviewToDelete) {
      return;
    }

    this.lastDeletedReviews[id] = reviewToDelete;

    this.showProgressBar[id] = true;
    this.progressList[id] = 0;
    this.pendingDeleteList[id] = true;

    this.startProgressBar(id);

    const deleteTimeout = setTimeout(async () => {
      if (this.pendingDeleteList[id]) {
        await this.reviewService.deleteReviewById(id);

        const userExists = await this.userService.getUserById(id);

        if (userExists && reviewToDelete.userId !== this.user.id) {
          await this.notificationsService.sendNotificationToUser(
            reviewToDelete.userId,
            'Tu reseña ha sido eliminada',
            `Tu reseña sobre "${this.item.title}" ha sido eliminada por incumplir nuestras normas.`
          );
        }

        this.item.reviews = this.item.reviews.filter(
          (review) => review.id !== id
        );

        this.updateLongReviewList();
        this.presentToast(
          '¡Reseña eliminada exitosamente!',
          'checkmark-circle-outline'
        );
      }
      this.showProgressBar[id] = false;
      this.progressList[id] = 0;

      delete this.lastDeletedReviews[id];
      delete this.deleteTimeouts[id];
    }, 3000);

    this.deleteTimeouts[id] = deleteTimeout;
  }

  async undoDeleteReview(reviewId: string) {
    if (this.lastDeletedReviews[reviewId]) {
      if (this.progressIntervals[reviewId]) {
        clearInterval(this.progressIntervals[reviewId]);
        delete this.progressIntervals[reviewId];
      }

      if (this.deleteTimeouts[reviewId]) {
        clearTimeout(this.deleteTimeouts[reviewId]);
        delete this.deleteTimeouts[reviewId];
      }

      const alreadyExists = this.item.reviews.some(
        (review) => review.id === reviewId
      );

      if (!alreadyExists) {
        this.item.reviews.unshift(this.lastDeletedReviews[reviewId]);
        this.updateLongReviewList();
      }

      this.showProgressBar[reviewId] = false;
      this.progressList[reviewId] = 0;
      delete this.pendingDeleteList[reviewId];
      delete this.lastDeletedReviews[reviewId];
    }
  }

  async editReview(review: Review) {
    try {
      if (this.contentRef) {
        this.contentRef.getScrollElement().then((scrollElement) => {
          scrollElement.style.overflow = 'hidden';
        });
      }
      const modal = await this.modalController.create({
        component: AddReviewComponent,
        cssClass: 'custom-modal',
        initialBreakpoint: 1,
        breakpoints: [0, 1],
        componentProps: {
          game: this.isGame(this.item) ? this.item : null,
          movie: this.isMovie(this.item) ? this.item : null,
          tvShow: this.isTvShow(this.item) ? this.item : null,
          review: review,
        },
      });

      modal.onDidDismiss().then(async (result) => {
        if (this.contentRef) {
          this.contentRef.getScrollElement().then((scrollElement) => {
            scrollElement.style.overflow = '';
          });
        }

        if (result.data && result.data.updatedReview) {
          const updatedReview = result.data.updatedReview;
          const index = this.item.reviews.findIndex(
            (r) => r.id === updatedReview.id
          );
          if (index > -1) {
            this.item.reviews[index] = updatedReview;
          } else {
            this.item.reviews.push(updatedReview);
          }
          this.updateLongReviewList();
          await this.refreshContentData();
        }
      });

      await modal.present();
    } catch (error) {
      console.error('Error en el flujo de editReview:', error);
    }
  }

  async showProfileReviews() {
    const modal = await this.modalController.create({
      component: ProfileReviewsComponent,
      componentProps: { user: this.user },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.user) {
        this.user = data.data.user;
      }
    });

    await modal.present();
  }

  // ======= Reporte de Reseñas =======
  async openReportSheet(review: Review) {
    const username = this.userNamesList[review.id];
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'custom-sheet',
      header: 'Reportar reseña de ' + username,
      buttons: [
        {
          text: 'Contenido ofensivo o inapropiado',
          handler: () => {
            this.reportReview('Contenido ofensivo o inapropiado', review);
          },
        },
        {
          text: 'Contenido engañoso o spam',
          handler: () => {
            this.reportReview('Contenido engañoso o spam', review);
          },
        },
        {
          text: 'Contenido sin alerta de spoiler',
          handler: () => {
            this.reportReview('Contenido sin alerta de spoiler', review);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel-button',
        },
      ],
    });

    await actionSheet.present();
  }

  async reportReview(reason: string, review: Review) {
    try {
      await this.reportService.insertReport(reason, this.user.id, review.id);

      this.presentToast(
        'Reporte enviado correctamente.',
        'checkmark-circle-outline'
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Este usuario ya ha reportado esta reseña.') {
          this.presentToast(
            'Ya has reportado a este usuario.',
            'information-circle-outline'
          );
        } else {
          console.error('Error al enviar el reporte:', error);
          this.presentToast(
            'Error al enviar el reporte.',
            'close-circle-outline'
          );
        }
      } else {
        console.error('Error desconocido al enviar el reporte:', error);
        this.presentToast(
          'Error desconocido al enviar el reporte.',
          'close-circle-outline'
        );
      }
    }
  }

  // ======= Utilidades =======
  getRandomName = randomName;
  getRandomAvatar = randomAvatar;
  getRatingClass = ratingClass;

  private async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      icon: icon,
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  private startProgressBar(reviewId: string) {
    const id = reviewId;
    this.progressList[id] = 0;
    const duration = 3000;
    const interval = 100;
    const increment = interval / duration;

    this.progressIntervals[id] = setInterval(() => {
      this.progressList[id] += increment;
      if (this.progressList[id] >= 1) {
        this.progressList[id] = 1;
        clearInterval(this.progressIntervals[id]);
        delete this.progressIntervals[id];
      }
    }, interval);
  }

  // ======= Manejo de Modal =======
  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }
}
