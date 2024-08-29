import { Component, OnInit } from '@angular/core';
import { GAME_MODEL } from 'src/app/models/game.model';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { TV_MODEL } from 'src/app/models/tv.model';
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

  constructor() {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent(): void {
    if (this.gameList.length === 0) {
      this.gameList = [...GAME_MODEL];
    }

    if (this.movieList.length === 0) {
      this.movieList = [...MOVIE_MODEL];
    }

    if (this.tvList.length === 0) {
      this.tvList = [...TV_MODEL];
    }
  }
}
