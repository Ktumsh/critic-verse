import { Component, inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalController } from '@ionic/angular';
import { GAME_MODEL } from 'src/app/models/game.model';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { TV_MODEL } from 'src/app/models/tv.model';
import { randomName, randomAvatar } from 'src/app/models/user.model';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Report } from 'src/app/types/report';

interface DetailedReport extends Report {
  source: string; // 'game', 'movie', 'tv'
  contentTitle: string;
  reviewComment: string;
}

@Component({
  selector: 'app-reported-content',
  templateUrl: './reported-content.component.html',
  styleUrls: ['./reported-content.component.scss'],
})
export class ReportedContentComponent implements OnInit {
  filterOption: string = 'all';

  totalReports!: number;
  totalGameReports!: number;
  totalMovieReports!: number;
  totalTvReports!: number;

  allReports: DetailedReport[] = [];

  userNamesMap: { [key: string]: string } = {};
  avatarsMap: { [key: string]: string } = {};

  _bottomSheet = inject(MatBottomSheet);

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.calculateTotalReports();
    this.loadAllReports();

    this.allReports.forEach((report) => {
      this.userNamesMap[report.reportedBy] = this.getRandomName();
      this.avatarsMap[report.reportedBy] = this.getRandomAvatar();
    });
  }

  calculateTotalReports() {
    this.totalGameReports = GAME_MODEL.reduce(
      (acc, game) =>
        acc + game.reviews.filter((review) => review.report).length,
      0
    );
    this.totalMovieReports = MOVIE_MODEL.reduce(
      (acc, movie) =>
        acc + movie.reviews.filter((review) => review.report).length,
      0
    );
    this.totalTvReports = TV_MODEL.reduce(
      (acc, tv) => acc + tv.reviews.filter((review) => review.report).length,
      0
    );
    this.totalReports =
      this.totalGameReports + this.totalMovieReports + this.totalTvReports;
  }

  filterData(event: any) {
    const selectedOption = event.detail.value;
    switch (selectedOption) {
      case 'all':
        this.loadAllReports();
        break;
      case 'game':
        this.loadGameReports();
        break;
      case 'movie':
        this.loadMovieReports();
        break;
      case 'tv':
        this.loadTvReports();
        break;
    }
  }

  getRandomName = randomName;
  getRandomAvatar = randomAvatar;

  loadAllReports() {
    this.allReports = [
      ...GAME_MODEL.reduce<DetailedReport[]>((acc, game) => {
        const reports = game.reviews
          .filter((review) => review.report)
          .map((review) => ({
            ...review.report!,
            source: 'Juegos',
            contentTitle: game.title,
            reviewComment: review.comment,
          }));
        return acc.concat(reports);
      }, []),

      ...MOVIE_MODEL.reduce<DetailedReport[]>((acc, movie) => {
        const reports = movie.reviews
          .filter((review) => review.report)
          .map((review) => ({
            ...review.report!,
            source: 'Películas',
            contentTitle: movie.title,
            reviewComment: review.comment,
          }));
        return acc.concat(reports);
      }, []),

      ...TV_MODEL.reduce<DetailedReport[]>((acc, tv) => {
        const reports = tv.reviews
          .filter((review) => review.report)
          .map((review) => ({
            ...review.report!,
            source: 'TV',
            contentTitle: tv.title,
            reviewComment: review.comment,
          }));
        return acc.concat(reports);
      }, []),
    ];

    this.totalReports = this.allReports.length;
  }

  loadGameReports() {
    this.allReports = GAME_MODEL.reduce<DetailedReport[]>((acc, game) => {
      const reports = game.reviews
        .filter((review) => review.report)
        .map((review) => ({
          ...review.report!,
          source: 'game',
          contentTitle: game.title,
          reviewComment: review.comment,
        }));
      return acc.concat(reports);
    }, []);
  }

  loadMovieReports() {
    this.allReports = MOVIE_MODEL.reduce<DetailedReport[]>((acc, movie) => {
      const reports = movie.reviews
        .filter((review) => review.report)
        .map((review) => ({
          ...review.report!,
          source: 'movie',
          contentTitle: movie.title,
          reviewComment: review.comment,
        }));
      return acc.concat(reports);
    }, []);
  }

  loadTvReports() {
    this.allReports = TV_MODEL.reduce<DetailedReport[]>((acc, tv) => {
      const reports = tv.reviews
        .filter((review) => review.report)
        .map((review) => ({
          ...review.report!,
          source: 'tv',
          contentTitle: tv.title,
          reviewComment: review.comment,
        }));
      return acc.concat(reports);
    }, []);
  }

  openReportAlert(user: any): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        title: 'Acciones para el reporte de ' + '"' + user + '"',
        options: [
          {
            label: 'Marcar como revisado',
            isSuccess: true,
          },
          {
            label: 'Desestimar el reporte',
          },
          {
            label: 'Eliminar reseña',
            isDanger: true,
          },
          {
            label: 'Suspender al usuario',
            isDanger: true,
          },
        ],
      },
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
