import { Component, OnInit } from '@angular/core';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movieList: Movie[] = [];

  loadMovies(): void {
    this.movieList = MOVIE_MODEL;
  }
  constructor() {}

  ngOnInit() {
    this.loadMovies();
  }
}
