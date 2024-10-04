import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';

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

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.loadContent();
  }

  async loadContent() {
    try {
      this.isLoading = true;
      this.gameList = await this.dbService.getGames();
      this.movieList = await this.dbService.getMovies();
      this.tvList = await this.dbService.getTvShows();
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
