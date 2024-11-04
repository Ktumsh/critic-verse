import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/types/content';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { refresher, sortByReleaseDate } from 'src/utils/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  gameList: Game[] = [];
  movieList: Movie[] = [];
  tvList: TvShow[] = [];

  activeIndicesGame: number[] = [];
  activeIndicesMovie: number[] = [];
  activeIndicesTv: number[] = [];
  isLoading: boolean = true;

  private contentsSubscription: Subscription = new Subscription();

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.isLoading = true;

    this.loadContent();

    this.contentsSubscription = this.contentService.contents$.subscribe({
      next: (contents: Content[]) => {
        this.isLoading = false;

        this.gameList = sortByReleaseDate(
          contents.filter((content) =>
            this.contentService.isGame(content)
          ) as Game[]
        );

        this.movieList = sortByReleaseDate(
          contents.filter((content) =>
            this.contentService.isMovie(content)
          ) as Movie[]
        );

        this.tvList = sortByReleaseDate(
          contents.filter((content) =>
            this.contentService.isTvShow(content)
          ) as TvShow[]
        );
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al suscribirse a los contenidos:', error);
      },
    });
  }

  ngOnDestroy() {
    if (this.contentsSubscription) {
      this.contentsSubscription.unsubscribe();
    }
  }

  async loadContent() {
    try {
      this.isLoading = true;
      await this.contentService.getAllContents();
    } catch (error) {
      console.error('Error al cargar el contenido:', error);
    } finally {
      this.isLoading = false;
    }
  }

  handleRefresh = refresher;
}
