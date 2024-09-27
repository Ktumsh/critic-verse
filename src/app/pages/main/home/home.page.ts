import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GAME_MODEL } from 'src/app/models/game.model';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { TV_MODEL } from 'src/app/models/tv.model';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { ratingDescription } from 'src/utils/rating-desc';

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

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent(): void {
    this.gameList = [...GAME_MODEL];
    this.movieList = [...MOVIE_MODEL];
    this.tvList = [...TV_MODEL];
  }
}
