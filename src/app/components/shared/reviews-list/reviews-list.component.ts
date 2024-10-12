import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Review } from 'src/app/types/review';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { ratingClass } from 'src/utils/common';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
})
export class ReviewsListComponent implements OnInit {
  filterOption: string = 'all';

  allReviews: Review[] = [];
  displayedReviews: Review[] = [];

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  pageSize = 10;
  totalOffset = 0;

  isInitialLoading: boolean = true;
  isLoading = false;
  hasMoreReviews = true;

  totalReviews: number = 0;
  totalGameReviews: number = 0;
  totalMovieReviews: number = 0;
  totalTvReviews: number = 0;

  reviewedReviewIds: string[] = [];
  reviewedReviewsMap: { [key: string]: 'reviewed' | 'inappropriate' } = {};

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private nativeStorage: NativeStorage,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    this.isInitialLoading = true;
    await this.loadReviewedReviews();
    await this.loadTotalReviews();
    await this.loadReviews();
    this.isInitialLoading = false;
  }

  async loadReviewedReviews() {
    try {
      const ids = await this.nativeStorage.getItem('reviewedReviewIds');
      if (ids && Array.isArray(ids)) {
        this.reviewedReviewIds = ids;
      } else {
        this.reviewedReviewIds = [];
      }
    } catch (error) {
      this.reviewedReviewIds = [];
    }
  }

  async loadTotalReviews() {
    try {
      this.totalReviews = await this.reviewService.getTotalReviewsByContentType(
        null,
        this.reviewedReviewIds
      );

      this.totalGameReviews =
        await this.reviewService.getTotalReviewsByContentType(
          'game',
          this.reviewedReviewIds
        );
      this.totalMovieReviews =
        await this.reviewService.getTotalReviewsByContentType(
          'movie',
          this.reviewedReviewIds
        );
      this.totalTvReviews =
        await this.reviewService.getTotalReviewsByContentType(
          'tv',
          this.reviewedReviewIds
        );
    } catch (error) {
      console.error('Error al cargar los totales de reseñas:', error);
    }
  }

  async loadReviews(event?: any) {
    if (this.isLoading || !this.hasMoreReviews) {
      if (event) {
        event.target.complete();
      }
      return;
    }

    this.isLoading = true;

    try {
      let collectedReviews: Review[] = [];
      let fetchedAllReviews = false;

      let contentType: string | null = null;

      switch (this.filterOption) {
        case 'all':
          contentType = null;
          break;
        case 'game':
          contentType = 'game';
          break;
        case 'movie':
          contentType = 'movie';
          break;
        case 'tv':
          contentType = 'tv';
          break;
      }

      while (collectedReviews.length < this.pageSize && !fetchedAllReviews) {
        const newReviews = await this.reviewService.getReviewsWithContentType(
          contentType,
          this.pageSize,
          this.totalOffset
        );

        this.totalOffset += newReviews.length;

        if (newReviews.length < this.pageSize) {
          fetchedAllReviews = true;
        }

        const unreviewedReviews = newReviews.filter(
          (review) => !this.reviewedReviewIds.includes(review.id)
        );

        collectedReviews = collectedReviews.concat(unreviewedReviews);

        if (fetchedAllReviews && newReviews.length === 0) {
          break;
        }
      }

      if (collectedReviews.length === 0) {
        this.hasMoreReviews = false;
      } else {
        this.allReviews = this.allReviews.concat(collectedReviews);
        this.displayedReviews = [...this.allReviews];

        await this.populateUsernamesAndAvatars(collectedReviews);
      }

      if (event) {
        event.target.complete();
      }
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      if (event) {
        event.target.complete();
      }
    } finally {
      this.isLoading = false;
    }
  }

  async populateUsernamesAndAvatars(reviews: Review[]) {
    const userIds = reviews.map((review) => review.userId);
    const users = await this.userService.getUsersByIds(userIds);

    const userMap = new Map(users.map((user) => [user.id, user]));

    reviews.forEach((review) => {
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

  getRandomName = randomName;

  getRandomAvatar = randomAvatar;

  loadMoreReviews(event: any) {
    setTimeout(async () => {
      await this.loadReviews(event);
    }, 500);
  }

  filterData(event: any) {
    const selectedOption = event.detail.value;
    this.filterOption = selectedOption;
    this.resetReviews();
    this.loadTotalReviews();
    this.loadReviews();
  }

  resetReviews() {
    this.allReviews = [];
    this.displayedReviews = [];
    this.totalOffset = 0;
    this.hasMoreReviews = true;
  }

  async openReportSheet(review: Review) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'custom-sheet',
      header: 'Gestionar reseña de ' + this.userNamesMap[review.id],
      buttons: [
        {
          text: 'Marcar como revisado',
          icon: 'assets/icon/miscellaneous/check-circled.svg',
          cssClass: 'success-button',
          handler: () => {
            this.markAsReviewed(review);
          },
        },
        {
          text: 'Marcar como inapropiado',
          icon: 'assets/icon/miscellaneous/alert-circled.svg',
          cssClass: 'warning-button',
          handler: () => {
            this.markAsInappropriate(review);
          },
        },
        {
          text: 'Eliminar reseña',
          icon: 'assets/icon/miscellaneous/dismiss-circled.svg',
          cssClass: 'danger-button',
          handler: () => {
            this.deleteReview(review);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  markAsReviewed(review: Review) {
    this.reviewedReviewsMap[review.id] = 'reviewed';

    setTimeout(() => {
      this.allReviews = this.allReviews.filter((r) => r.id !== review.id);
      this.displayedReviews = this.displayedReviews.filter(
        (r) => r.id !== review.id
      );
      this.reviewedReviewIds.push(review.id);
      this.nativeStorage.setItem('reviewedReviewIds', this.reviewedReviewIds);
      this.updateTotalCounts(review);
      delete this.reviewedReviewsMap[review.id];
    }, 3000);
  }

  markAsInappropriate(review: Review) {
    this.reviewedReviewsMap[review.id] = 'inappropriate';

    setTimeout(() => {
      this.allReviews = this.allReviews.filter((r) => r.id !== review.id);
      this.displayedReviews = this.displayedReviews.filter(
        (r) => r.id !== review.id
      );
      this.reviewedReviewIds.push(review.id);
      this.nativeStorage.setItem('reviewedReviewIds', this.reviewedReviewIds);
      this.updateTotalCounts(review);
      delete this.reviewedReviewsMap[review.id];
    }, 3000);

    this.presentToast(
      `Se le ha enviado una notificación al usuario ${
        this.userNamesMap[review.id]
      }.`,
      'checkmark-circle-outline'
    );

    this.notificationsService.sendNotificationToUser(
      review.userId,
      'Reseña marcada como inapropiada',
      'Tu reseña ha sido marcada como inapropiada. Por favor, procura revisar lo que escribes.'
    );
  }

  async deleteReview(review: Review) {
    try {
      await this.reviewService.deleteReviewById(review.id);

      this.allReviews = this.allReviews.filter((r) => r.id !== review.id);
      this.displayedReviews = this.displayedReviews.filter(
        (r) => r.id !== review.id
      );

      this.updateTotalCounts(review);

      this.presentToast(
        `Reseña de ${this.userNamesMap[review.id]} eliminada exitosamente.`,
        'checkmark-circle-outline'
      );
    } catch (error) {
      console.error('Error al eliminar la reseña:', error);
      this.presentToast(
        'Hubo un error al eliminar la reseña. Inténtalo nuevamente.',
        'close-circle-outline'
      );
    }
  }

  updateTotalCounts(review: Review) {
    this.totalReviews--;
    switch (review.contentType) {
      case 'game':
        this.totalGameReviews--;
        break;
      case 'movie':
        this.totalMovieReviews--;
        break;
      case 'tv':
        this.totalTvReviews--;
        break;
    }
  }

  getRatingClass = ratingClass;

  async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      icon: icon,
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
