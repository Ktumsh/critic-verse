import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { randomAvatar, randomName } from 'src/app/models/user.model';
import { Report } from 'src/app/types/report';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';

interface DetailedReport extends Report {
  source: string;
  contentTitle: string;
  reviewComment: string;
  reportedUserId: string;
}

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
})
export class ReportsListComponent implements OnInit {
  // ======= Propiedades =======
  filterOption: string = 'all';

  totalReports: number = 0;
  totalGameReports: number = 0;
  totalMovieReports: number = 0;
  totalTvReports: number = 0;

  allReports: DetailedReport[] = [];
  displayedReports: DetailedReport[] = [];

  userNamesList: { [key: string]: string } = {};
  avatarsList: { [key: string]: string } = {};

  reportedUserNamesList: { [key: string]: string } = {};
  reportedAvatarsList: { [key: string]: string } = {};

  pageSize = 10;
  totalOffset = 0;

  isInitialLoading: boolean = true;
  isLoading = false;
  hasMoreReports = true;

  processedReportsList: {
    [key: string]: 'reviewed' | 'dismissed' | 'suspended';
  } = {};

  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private reportService: ReportService,
    private userService: UserService,
    private notificationsService: NotificationsService
  ) {}

  async ngOnInit() {
    this.isInitialLoading = true;
    await this.initializeData();
    this.isInitialLoading = false;
  }

  // ======= Métodos de Inicialización =======
  private async initializeData() {
    await this.loadTotalReports();
    await this.loadReports();
  }

  private async loadTotalReports() {
    try {
      this.totalReports = await this.reportService.getTotalReports();
      this.totalGameReports = await this.reportService.getTotalReportsByContent(
        'game'
      );
      this.totalMovieReports =
        await this.reportService.getTotalReportsByContent('movie');
      this.totalTvReports = await this.reportService.getTotalReportsByContent(
        'tv'
      );
    } catch (error) {
      console.error('Error al cargar los totales de reportes:', error);
    }
  }

  // ======= Carga y Paginación de Reportes =======
  async loadReports(event?: any) {
    if (this.isLoading || !this.hasMoreReports) {
      event?.target.complete();
      return;
    }

    this.isLoading = true;

    try {
      const contentType = this.getContentTypeFromFilter();

      const newReports = await this.reportService.getReportsByContent(
        contentType,
        this.pageSize,
        this.totalOffset
      );

      this.totalOffset += newReports.length;

      if (newReports.length < this.pageSize) {
        this.hasMoreReports = false;
      }

      this.allReports = [...this.allReports, ...newReports];
      this.displayedReports = [...this.allReports];

      await this.getUsernamesAndAvatars(newReports);

      event?.target.complete();
    } catch (error) {
      console.error('Error al cargar reportes:', error);
      event?.target.complete();
    } finally {
      this.isLoading = false;
    }
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

  loadMoreReports(event: any) {
    setTimeout(() => this.loadReports(event), 500);
  }

  // ======= Filtrado de Datos =======
  filterData(event: any) {
    this.filterOption = event.detail.value;
    this.resetReports();
    this.loadTotalReports();
    this.loadReports();
  }

  private resetReports() {
    this.allReports = [];
    this.displayedReports = [];
    this.totalOffset = 0;
    this.hasMoreReports = true;
  }

  // ======= Gestión de Reportes =======
  async openActionSheet(report: DetailedReport) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'custom-sheet',
      header: 'Gestionar reporte de ' + this.userNamesList[report.reportedBy],
      buttons: [
        {
          text: 'Marcar como revisado',
          icon: 'assets/icon/miscellaneous/check-circled.svg',
          cssClass: 'success-button',
          handler: () => this.markAsReviewed(report),
        },
        {
          text: 'Desestimar el reporte',
          icon: 'assets/icon/miscellaneous/alert-circled.svg',
          cssClass: 'warning-button',
          handler: () => this.dismissReport(report),
        },
        {
          text: 'Enviar notificación al usuario reportado',
          icon: 'assets/icon/miscellaneous/dismiss-circled.svg',
          cssClass: 'danger-button',
          handler: () => this.sendNotification(report),
        },
      ],
    });
    await actionSheet.present();
  }

  private markAsReviewed(report: DetailedReport) {
    const id = report.id!;
    this.processedReportsList[id] = 'reviewed';

    setTimeout(async () => {
      await this.reportService.deleteReportById(id);
      this.removeReport(report);
      this.updateTotalCounts(report);
      delete this.processedReportsList[id];
    }, 3000);
  }

  private dismissReport(report: DetailedReport) {
    const id = report.id!;
    this.processedReportsList[id] = 'dismissed';

    setTimeout(async () => {
      await this.reportService.deleteReportById(id);
      this.removeReport(report);
      this.updateTotalCounts(report);
      delete this.processedReportsList[id];
    }, 3000);

    this.presentToast(
      `Reporte de ${this.userNamesList[report.reportedBy]} desestimado.`,
      'close-circle-outline'
    );
  }

  private async sendNotification(report: DetailedReport) {
    const id = report.id!;
    this.processedReportsList[id] = 'suspended';

    setTimeout(async () => {
      await this.reportService.deleteReportById(id);
      this.removeReport(report);
      this.updateTotalCounts(report);
      delete this.processedReportsList[id];
    }, 3000);

    this.presentToast(
      `Se le ha enviado una notificación al usuario ${
        this.reportedUserNamesList[report.reportedUserId]
      }.`,
      'person-remove-outline'
    );

    const userExists = await this.userService.getUserById(
      report.reportedUserId
    );
    if (userExists) {
      await this.notificationsService.sendNotificationToUser(
        report.reportedUserId,
        'Advertencia de tu cuenta',
        'Tu cuenta podría suspenderse debido al incumplimiento de nuestra política de uso. Considera revisar lo que escribes.'
      );
    }
  }

  private removeReport(report: DetailedReport) {
    this.allReports = this.allReports.filter((r) => r.id !== report.id);
    this.displayedReports = this.displayedReports.filter(
      (r) => r.id !== report.id
    );
  }

  private updateTotalCounts(report: DetailedReport) {
    this.totalReports--;
    switch (report.source) {
      case 'game':
        this.totalGameReports--;
        break;
      case 'movie':
        this.totalMovieReports--;
        break;
      case 'tv':
        this.totalTvReports--;
        break;
    }
  }

  // ======= Gestión de Usuarios =======
  private async getUsernamesAndAvatars(reports: DetailedReport[]) {
    const reporterIds = reports.map((report) => report.reportedBy);
    const reporters = await this.userService.getUsersByIds(reporterIds);
    const reporterMap = new Map(reporters.map((user) => [user.id, user]));

    const reportedUserIds = reports.map((report) => report.reportedUserId);
    const reportedUsers = await this.userService.getUsersByIds(reportedUserIds);
    const reportedUserMap = new Map(
      reportedUsers.map((user) => [user.id, user])
    );

    reports.forEach((report) => {
      const reporter = reporterMap.get(report.reportedBy);
      this.userNamesList[report.reportedBy] =
        reporter?.username || this.getRandomName();
      this.avatarsList[report.reportedBy] =
        reporter?.profileImage || this.getRandomAvatar();

      const reportedUser = reportedUserMap.get(report.reportedUserId);
      this.reportedUserNamesList[report.reportedUserId] =
        reportedUser?.username || this.getRandomName();
      this.reportedAvatarsList[report.reportedUserId] =
        reportedUser?.profileImage || this.getRandomAvatar();
    });
  }

  // ======= Utilidades =======
  getRandomName = randomName;
  getRandomAvatar = randomAvatar;

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
