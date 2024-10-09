import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { refresher, sortByReleaseDate } from 'src/utils/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  gameList: Game[] = [];
  movieList: Movie[] = [];
  tvList: TvShow[] = [];

  activeIndicesGame: number[] = [];
  activeIndicesMovie: number[] = [];
  activeIndicesTv: number[] = [];
  isLoading: boolean = true;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.loadContent();
  }

  async loadContent() {
    try {
      this.isLoading = true;

      const games = await this.contentService.getGames();
      this.gameList = sortByReleaseDate(games);

      const movies = await this.contentService.getMovies();
      this.movieList = sortByReleaseDate(movies);

      const tvShows = await this.contentService.getTvShows();
      this.tvList = sortByReleaseDate(tvShows);
    } catch (error) {
      console.error('Error al cargar el contenido:', error);
    } finally {
      this.isLoading = false;
    }
  }

  handleRefresh = refresher;
}
