import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import {
  ModalController,
  ToastController,
  PopoverController,
  AlertController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/types/content';
import { AddNewContentComponent } from '../add-new-content/add-new-content.component';
import { ContentOptionsComponent } from '../content-options/content-options.component';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
})
export class ContentListComponent implements OnInit, OnDestroy {
  contents: Content[] = [];
  filteredContents: Content[] = [];
  paginatedContents: Content[] = [];
  length = 0;
  pageSize = 7;
  pageIndex = 0;
  showFirstLastButtons = true;
  searchControl: FormControl = new FormControl('');
  sortAscendingTitle = true;
  sortAscendingType = true;
  private subscription!: Subscription;

  constructor(
    private contentService: ContentService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    Promise.all([
      this.contentService.getGames(),
      this.contentService.getMovies(),
      this.contentService.getTvShows(),
    ]).then(([games, movies, tvShows]) => {
      const typedGames = games.map((game) => ({ ...game, _type: 'game' }));
      const typedMovies = movies.map((movie) => ({ ...movie, _type: 'movie' }));
      const typedTvShows = tvShows.map((tvShow) => ({
        ...tvShow,
        _type: 'tvshow',
      }));

      this.contents = [...typedGames, ...typedMovies, ...typedTvShows];

      this.filteredContents = this.contents;
      this.length = this.contents.length;
      this.updatePaginatedContents();
    });

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.filterContents(searchTerm);
    });

    this.subscription = this.contentService.contents$.subscribe((contents) => {
      this.contents = contents;
      this.filteredContents = this.contents;
      this.length = this.contents.length;
      this.updatePaginatedContents();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filterContents(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredContents = this.contents.filter((content) =>
      content.title.toLowerCase().includes(lowerSearchTerm)
    );
    this.pageIndex = 0;
    this.length = this.filteredContents.length;
    this.updatePaginatedContents();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedContents();
  }

  private updatePaginatedContents() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedContents = this.filteredContents.slice(startIndex, endIndex);
  }

  sortContentsBy(column: string) {
    if (column === 'title') {
      this.sortAscendingTitle = !this.sortAscendingTitle;
      this.filteredContents.sort((a, b) => {
        if (a.title < b.title) {
          return this.sortAscendingTitle ? -1 : 1;
        } else if (a.title > b.title) {
          return this.sortAscendingTitle ? 1 : -1;
        } else {
          return 0;
        }
      });
      this.updatePaginatedContents();
    } else if (column === 'type') {
      this.sortAscendingType = !this.sortAscendingType;
      this.filteredContents.sort((a: any, b: any) => {
        if (a._type < b._type) {
          return this.sortAscendingType ? -1 : 1;
        } else if (a._type > b._type) {
          return this.sortAscendingType ? 1 : -1;
        } else {
          return 0;
        }
      });
      this.updatePaginatedContents();
    }
  }

  async addContent() {
    const modal = await this.modalController.create({
      component: AddNewContentComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.content) {
        await this.contentService.getAllContents();
        await this.presentToast(
          '¡Contenido agregado exitosamente!',
          'checkmark-circle-outline'
        );
      }
    });

    await modal.present();
  }

  async openContentOptions(event: Event, content: Content) {
    event.stopPropagation();

    const popover = await this.popoverController.create({
      component: ContentOptionsComponent,
      cssClass: 'custom-popover v2',
      event,
      translucent: true,
      componentProps: { content },
    });

    popover.onDidDismiss().then((result) => {
      if (result.data) {
        switch (result.data.action) {
          case 'edit':
            this.editContent(content);
            break;
          case 'delete':
            this.confirmDeleteAlert(content);
            break;
        }
      }
    });

    await popover.present();
  }

  async editContent(content: Content) {
    const modal = await this.modalController.create({
      component: AddNewContentComponent,
      componentProps: { content },
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.content) {
        await this.contentService.getAllContents();
        await this.presentToast(
          '¡Contenido actualizado exitosamente!',
          'checkmark-circle-outline'
        );
      }
    });

    await modal.present();
  }

  async confirmDeleteAlert(content: Content) {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'custom-alert v2',
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar "${content.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteContent(content.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteContent(contentId: string) {
    try {
      await this.contentService.deleteContent(contentId);
      await this.contentService.getAllContents();
      await this.presentToast(
        '¡Contenido eliminado exitosamente!',
        'checkmark-circle-outline'
      );
    } catch (error) {
      console.error('Error al eliminar el contenido:', error);
      await this.presentToast(
        'Error al eliminar el contenido.',
        'alert-circle-outline'
      );
    }
  }

  async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      icon,
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

  isGame(content: Content): content is Game {
    return (content as any)._type === 'game';
  }

  isMovie(content: Content): content is Movie {
    return (content as any)._type === 'movie';
  }

  isTvShow(content: Content): content is TvShow {
    return (content as any)._type === 'tvshow';
  }
}
