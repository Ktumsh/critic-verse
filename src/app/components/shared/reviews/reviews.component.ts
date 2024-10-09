import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
  IonContent,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ratingClass } from 'src/utils/common';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { ProfileReviewsComponent } from '../profile-reviews/profile-reviews.component';
import { Review } from 'src/app/types/review';
import { AddReviewComponent } from '../add-review/add-review.component';
import { ReviewOptionsComponent } from '../review-options/review-options.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnChanges {
  @Input() contentRef!: IonContent;
  @Input() item!: Game | Movie | TvShow;
  @Input() refreshContentData!: () => Promise<void>;

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};
  revealedReviews: { [reviewId: string]: boolean } = {};
  expandedReviews: { [reviewId: string]: boolean } = {};
  longReviewMap: { [reviewId: string]: boolean } = {};

  pendingDeleteMap: { [reviewId: string]: boolean } = {};
  lastDeletedReviews: { [reviewId: string]: Review } = {};
  progressMap: { [reviewId: string]: number } = {};
  showProgressBarMap: { [reviewId: string]: boolean } = {};
  progressIntervals: { [reviewId: string]: any } = {};
  deleteTimeouts: { [reviewId: string]: any } = {};

  user!: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private userService: UserService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private modalController: ModalController,
    private toastController: ToastController,
    private popoverController: PopoverController
  ) {
    this.user = this.authService.user;
  }

  isGame(item: Game | Movie | TvShow): item is Game {
    return (item as Game).detail.platforms !== undefined;
  }

  isMovie(item: Game | Movie | TvShow): item is Movie {
    return (item as Movie).detail.director !== undefined;
  }

  isTvShow(item: Game | Movie | TvShow): item is TvShow {
    return (item as TvShow).detail.seasons !== undefined;
  }

  ngOnInit() {
    this.updateLongReviewMap();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      await this.loadUsernamesAndAvatars();
      this.updateLongReviewMap();
    }
  }

  private updateLongReviewMap() {
    this.longReviewMap = {};
    this.item.reviews.forEach((review) => {
      this.longReviewMap[review.id] = review.comment.length > 260;
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
      const user = userMap.get(review.userId);
      if (user?.username) {
        this.userNamesMap[review.id] = user.username;
        this.avatarsMap[review.id] = user.profileImage;
      } else {
        this.userNamesMap[review.id] = this.getRandomName();
        this.avatarsMap[review.id] = this.getRandomAvatar();
      }
    });
  }

  revealReview(reviewId: string) {
    this.revealedReviews[reviewId] = true;
  }

  toggleExpandReview(reviewId: string) {
    this.expandedReviews[reviewId] = !this.expandedReviews[reviewId];
  }

  getRatingClass = ratingClass;

  getRandomName = randomName;

  getRandomAvatar = randomAvatar;

  async presentPopover(event: MouseEvent, review: Review) {
    const popover = await this.popoverController.create({
      component: ReviewOptionsComponent,
      cssClass: 'custom-popover v2',
      event: event,
      translucent: true,
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
            this.deleteReview(review.id);
            break;
          case 'viewProfileReviews':
            this.showProfileReviews();
            break;
        }
      }
    });

    return await popover.present();
  }

  async deleteReview(reviewId: string) {
    const reviewToDelete =
      this.item.reviews.find((review) => review.id === reviewId) || null;

    if (!reviewToDelete) {
      return;
    }

    this.lastDeletedReviews[reviewId] = reviewToDelete;

    this.showProgressBarMap[reviewId] = true;
    this.progressMap[reviewId] = 0;
    this.pendingDeleteMap[reviewId] = true;

    this.startProgressBar(reviewId);

    const deleteTimeout = setTimeout(() => {
      if (this.pendingDeleteMap[reviewId]) {
        this.reviewService.deleteReviewById(reviewId).then(() => {
          this.item.reviews = this.item.reviews.filter(
            (review) => review.id !== reviewId
          );
          this.updateLongReviewMap();
          this.presentToast(
            '¡Reseña eliminada exitosamente!',
            'checkmark-circle-outline'
          );
        });
        delete this.pendingDeleteMap[reviewId];
      }
      this.showProgressBarMap[reviewId] = false;
      this.progressMap[reviewId] = 0;
      delete this.lastDeletedReviews[reviewId];
      delete this.deleteTimeouts[reviewId];
    }, 3000);

    this.deleteTimeouts[reviewId] = deleteTimeout;
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
        this.updateLongReviewMap();
      }

      this.showProgressBarMap[reviewId] = false;
      this.progressMap[reviewId] = 0;
      delete this.pendingDeleteMap[reviewId];
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
          this.updateLongReviewMap();
          await this.refreshContentData();
        }
      });

      return await modal.present();
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

    return await modal.present();
  }

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

  async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      swipeGesture: 'vertical',
      icon: icon,
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }

  startProgressBar(reviewId: string) {
    this.progressMap[reviewId] = 0;
    const duration = 3000;
    const interval = 100;
    const increment = interval / duration;

    this.progressIntervals[reviewId] = setInterval(() => {
      this.progressMap[reviewId] += increment;
      if (this.progressMap[reviewId] >= 1) {
        this.progressMap[reviewId] = 1;
        clearInterval(this.progressIntervals[reviewId]);
        delete this.progressIntervals[reviewId];
      }
    }, interval);
  }
}
