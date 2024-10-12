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
  filterOption: string = 'all';

  totalReports: number = 0;
  totalGameReports: number = 0;
  totalMovieReports: number = 0;
  totalTvReports: number = 0;

  allReports: DetailedReport[] = [];
  displayedReports: DetailedReport[] = [];

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  reportedUserNamesMap: { [key: string]: string } = {};
  reportedAvatarsMap: { [key: string]: string } = {};

  pageSize = 10;
  totalOffset = 0;

  isInitialLoading: boolean = true;
  isLoading = false;
  hasMoreReports = true;

  processedReportsMap: {
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

  ngOnInit() {
    this.init();
  }

  async init() {
    this.isInitialLoading = true;
    await this.loadTotalReports();
    await this.loadReports();
    this.isInitialLoading = false;
  }

  async loadTotalReports() {
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

  async loadReports(event?: any) {
    if (this.isLoading || !this.hasMoreReports) {
      if (event) {
        event.target.complete();
      }
      return;
    }

    this.isLoading = true;

    try {
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

      const newReports = await this.reportService.getReportsByContent(
        contentType,
        this.pageSize,
        this.totalOffset
      );

      this.totalOffset += newReports.length;

      if (newReports.length < this.pageSize) {
        this.hasMoreReports = false;
      }

      this.allReports = this.allReports.concat(newReports);
      this.displayedReports = [...this.allReports];

      await this.populateUsernamesAndAvatars(newReports);

      if (event) {
        event.target.complete();
      }
    } catch (error) {
      console.error('Error al cargar reportes:', error);
      if (event) {
        event.target.complete();
      }
    } finally {
      this.isLoading = false;
    }
  }

  async populateUsernamesAndAvatars(reports: DetailedReport[]) {
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
      if (reporter?.username) {
        this.userNamesMap[report.reportedBy] = reporter.username;
        this.avatarsMap[report.reportedBy] = reporter.profileImage;
      } else {
        this.userNamesMap[report.reportedBy] = this.getRandomName();
        this.avatarsMap[report.reportedBy] = this.getRandomAvatar();
      }

      const reportedUser = reportedUserMap.get(report.reportedUserId);
      if (reportedUser?.username) {
        this.reportedUserNamesMap[report.reportedUserId] =
          reportedUser.username;
        this.reportedAvatarsMap[report.reportedUserId] =
          reportedUser.profileImage;
      } else {
        this.reportedUserNamesMap[report.reportedUserId] = this.getRandomName();
        this.reportedAvatarsMap[report.reportedUserId] = this.getRandomAvatar();
      }
    });
  }

  getRandomName = randomName;
  getRandomAvatar = randomAvatar;

  loadMoreReports(event: any) {
    setTimeout(async () => {
      await this.loadReports(event);
    }, 500);
  }

  filterData(event: any) {
    const selectedOption = event.detail.value;
    this.filterOption = selectedOption;
    this.resetReports();
    this.loadTotalReports();
    this.loadReports();
  }

  resetReports() {
    this.allReports = [];
    this.displayedReports = [];
    this.totalOffset = 0;
    this.hasMoreReports = true;
  }

  async openActionSheet(report: DetailedReport) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'custom-sheet',
      header: 'Gestionar reporte de ' + this.userNamesMap[report.reportedBy],
      buttons: [
        {
          text: 'Marcar como revisado',
          icon: 'assets/icon/miscellaneous/check-circled.svg',
          cssClass: 'success-button',
          handler: () => {
            this.markAsReviewed(report);
          },
        },
        {
          text: 'Desestimar el reporte',
          icon: 'assets/icon/miscellaneous/alert-circled.svg',
          cssClass: 'warning-button',
          handler: () => {
            this.dismissReport(report);
          },
        },
        {
          text: 'Enviar notificación al usuario reportado',
          icon: 'assets/icon/miscellaneous/dismiss-circled.svg',
          cssClass: 'danger-button',
          handler: () => {
            this.sendNotification(report);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  markAsReviewed(report: DetailedReport) {
    this.processedReportsMap[report.id!] = 'reviewed';

    setTimeout(async () => {
      await this.reportService.deleteReportById(report.id!);
      this.allReports = this.allReports.filter((r) => r.id !== report.id);
      this.displayedReports = this.displayedReports.filter(
        (r) => r.id !== report.id
      );
      this.updateTotalCounts(report);
      delete this.processedReportsMap[report.id!];
    }, 3000);
  }

  dismissReport(report: DetailedReport) {
    this.processedReportsMap[report.id!] = 'dismissed';

    setTimeout(async () => {
      await this.reportService.deleteReportById(report.id!);
      this.allReports = this.allReports.filter((r) => r.id !== report.id);
      this.displayedReports = this.displayedReports.filter(
        (r) => r.id !== report.id
      );
      this.updateTotalCounts(report);
      delete this.processedReportsMap[report.id!];
    }, 3000);

    this.presentToast(
      `Reporte de ${this.userNamesMap[report.reportedBy]} desestimado.`,
      'close-circle-outline'
    );
  }

  async sendNotification(report: DetailedReport) {
    this.processedReportsMap[report.id!] = 'suspended';

    setTimeout(async () => {
      await this.reportService.deleteReportById(report.id!);
      this.allReports = this.allReports.filter((r) => r.id !== report.id);
      this.displayedReports = this.displayedReports.filter(
        (r) => r.id !== report.id
      );
      this.updateTotalCounts(report);
      delete this.processedReportsMap[report.id!];
    }, 3000);

    this.presentToast(
      `Se le ha enviado una notificación al usuario ${
        this.reportedUserNamesMap[report.reportedUserId]
      }.`,
      'person-remove-outline'
    );

    await this.notificationsService.sendNotificationToUser(
      report.reportedUserId,
      'Advertencia de tu cuenta',
      'Tu cuenta podría suspenderse debido al incumpliento de nuestra política de uso. Considera revisar lo que escribes.'
    );
  }

  updateTotalCounts(report: DetailedReport) {
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
