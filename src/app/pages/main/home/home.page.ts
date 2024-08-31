import { Component, OnInit } from '@angular/core';
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

  getRatingDescription = ratingDescription;

  onScroll(
    container: HTMLElement,
    activeIndices: number[],
    slideClass: string
  ) {
    const slides = container.querySelectorAll(`.${slideClass}`);
    const containerRect = container.getBoundingClientRect();
    let closestIndices: number[] = [];
    let distances: number[] = [];

    slides.forEach((slide) => {
      const slideRect = slide.getBoundingClientRect();
      const distance = Math.abs(
        containerRect.width / 2 - (slideRect.left + slideRect.width / 2)
      );

      distances.push(distance);
    });

    closestIndices = distances
      .map((distance, index) => ({ distance, index }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2)
      .map((item) => item.index);

    activeIndices.length = 0;
    activeIndices.push(...closestIndices);
  }

  onScrollGame(container: HTMLElement) {
    this.onScroll(container, this.activeIndicesGame, 'carousel-slide-game');
  }

  onScrollMovie(container: HTMLElement) {
    this.onScroll(container, this.activeIndicesMovie, 'carousel-slide-movie');
  }

  onScrollTv(container: HTMLElement) {
    this.onScroll(container, this.activeIndicesTv, 'carousel-slide-tv');
  }
}
