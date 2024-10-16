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
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
})
export class ReviewsListComponent implements OnInit {
  // ======= Propiedades =======
  filterOption: string = 'all';
  pageSize = 10;
  totalOffset = 0;
  isInitialLoading: boolean = true;
  isLoading = false;
  hasMoreReviews = true;

  allReviews: Review[] = [];
  displayedReviews: Review[] = [];

  userNamesList: { [key: string]: string } = {};
  avatarsList: { [key: string]: string } = {};

  totalReviews: number = 0;
  totalGameReviews: number = 0;
  totalMovieReviews: number = 0;
  totalTvReviews: number = 0;

  reviewedReviewIds: string[] = [];
  reviewedReviewsList: { [key: string]: 'reviewed' | 'inappropriate' } = {};

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private nativeStorage: NativeStorage,
    private notificationsService: NotificationsService,
    private contentService: ContentService
  ) {}

  async ngOnInit() {
    this.isInitialLoading = true;
    await this.initializeData();
    this.isInitialLoading = false;
  }

  // ======= Métodos de Inicialización =======
  private async initializeData() {
    await this.loadReviewedReviews();
    await this.loadTotalReviews();
    await this.loadReviews();
  }

  private async loadReviewedReviews() {
    try {
      const ids = await this.nativeStorage.getItem('reviewedReviewIds');
      this.reviewedReviewIds = Array.isArray(ids) ? ids : [];
    } catch {
      this.reviewedReviewIds = [];
    }
  }

  private async loadTotalReviews() {
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

  // ======= Carga y Paginación de Reseñas =======
  async loadReviews(event?: any) {
    if (this.isLoading || !this.hasMoreReviews) {
      event?.target.complete();
      return;
    }

    this.isLoading = true;

    try {
      const collectedReviews = await this.fetchReviews();
      if (collectedReviews.length === 0) {
        this.hasMoreReviews = false;
      } else {
        this.allReviews = [...this.allReviews, ...collectedReviews];
        this.displayedReviews = [...this.allReviews];
        await this.getUsernamesAndAvatars(collectedReviews);
      }
      event?.target.complete();
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      event?.target.complete();
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchReviews(): Promise<Review[]> {
    let collectedReviews: Review[] = [];
    let fetchedAllReviews = false;
    const contentType = this.getContentTypeFromFilter();

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

      collectedReviews = [...collectedReviews, ...unreviewedReviews];

      if (fetchedAllReviews && newReviews.length === 0) {
        break;
      }
    }

    return collectedReviews;
  }

  private getContentTypeFromFilter(): string | null {
    switch (this.filterOption) {
      case 'game':
        return 'game';
      case 'movie':
        return 'movie';
      case 'tv':
        return 'tv';
      default:
        return null;
    }
  }

  loadMoreReviews(event: any) {
    setTimeout(() => this.loadReviews(event), 500);
  }

  // ======= Filtrado de Datos =======
  filterData(event: any) {
    this.filterOption = event.detail.value;
    this.resetReviews();
    this.loadTotalReviews();
    this.loadReviews();
  }

  private resetReviews() {
    this.allReviews = [];
    this.displayedReviews = [];
    this.totalOffset = 0;
    this.hasMoreReviews = true;
  }

  // ======= Gestión de Reseñas =======
  async openReportSheet(review: Review) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'custom-sheet',
      header: `Gestionar reseña de ${this.userNamesList[review.id]}`,
      buttons: [
        {
          text: 'Marcar como revisado',
          icon: 'assets/icon/miscellaneous/check-circled.svg',
          cssClass: 'success-button',
          handler: () => this.markAsReviewed(review),
        },
        {
          text: 'Marcar como inapropiado',
          icon: 'assets/icon/miscellaneous/alert-circled.svg',
          cssClass: 'warning-button',
          handler: () => this.markAsInappropriate(review),
        },
        {
          text: 'Eliminar reseña',
          icon: 'assets/icon/miscellaneous/dismiss-circled.svg',
          cssClass: 'danger-button',
          handler: () => this.deleteReview(review),
        },
      ],
    });
    await actionSheet.present();
  }

  private markAsReviewed(review: Review) {
    this.reviewedReviewsList[review.id] = 'reviewed';
    setTimeout(() => {
      this.removeReview(review);
      this.reviewedReviewIds.push(review.id);
      this.nativeStorage.setItem('reviewedReviewIds', this.reviewedReviewIds);
      this.updateTotalCounts(review);
      delete this.reviewedReviewsList[review.id];
    }, 3000);
  }

  private async markAsInappropriate(review: Review) {
    this.reviewedReviewsList[review.id] = 'inappropriate';
    setTimeout(() => {
      this.removeReview(review);
      this.reviewedReviewIds.push(review.id);
      this.nativeStorage.setItem('reviewedReviewIds', this.reviewedReviewIds);
      this.updateTotalCounts(review);
      delete this.reviewedReviewsList[review.id];
    }, 3000);

    this.presentToast(
      `Se le ha enviado una notificación al usuario ${
        this.userNamesList[review.id]
      }.`,
      'checkmark-circle-outline'
    );

    const userExists = await this.userService.getUserById(review.userId);

    if (userExists) {
      this.notificationsService.sendNotificationToUser(
        review.userId,
        'Reseña marcada como inapropiada',
        'Tu reseña ha sido marcada como inapropiada. Por favor, procura revisar lo que escribes.'
      );
    }
  }

  private async deleteReview(review: Review) {
    try {
      await this.reviewService.deleteReviewById(review.id);
      this.removeReview(review);
      this.updateTotalCounts(review);

      const contentTitle = await this.getContentTitle(review);
      const userExists = await this.userService.getUserById(review.userId);

      if (userExists) {
        await this.notificationsService.sendNotificationToUser(
          review.userId,
          'Tu reseña ha sido eliminada',
          `Tu reseña sobre "${contentTitle}" ha sido eliminada por incumplir nuestras normas.`
        );
      }

      this.presentToast(
        `Reseña de ${this.userNamesList[review.id]} eliminada exitosamente.`,
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

  private removeReview(review: Review) {
    this.allReviews = this.allReviews.filter((r) => r.id !== review.id);
    this.displayedReviews = this.displayedReviews.filter(
      (r) => r.id !== review.id
    );
  }

  private async getContentTitle(review: Review): Promise<string | undefined> {
    const contentId = review.contentId;
    switch (review.contentType) {
      case 'game':
        const game = await this.contentService.getGameById(contentId!);
        return game?.title;
      case 'movie':
        const movie = await this.contentService.getMovieById(contentId!);
        return movie?.title;
      case 'tv':
        const tvShow = await this.contentService.getTvShowById(contentId!);
        return tvShow?.title;
      default:
        return undefined;
    }
  }

  private updateTotalCounts(review: Review) {
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

  // ======= Gestión de Usuarios =======
  private async getUsernamesAndAvatars(reviews: Review[]) {
    const userIds = reviews.map((review) => review.userId);
    const users = await this.userService.getUsersByIds(userIds);
    const userMap = new Map(users.map((user) => [user.id, user]));

    reviews.forEach((review) => {
      const user = userMap.get(review.userId);
      this.userNamesList[review.id] = user?.username || this.getRandomName();
      this.avatarsList[review.id] =
        user?.profileImage || this.getRandomAvatar();
    });
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

  // ======= Manejo de Modal =======
  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }
}
