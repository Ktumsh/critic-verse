import { Component, OnInit } from '@angular/core';
import { MOVIE_MODEL } from 'src/app/models/movie.model';
import { DbService } from 'src/app/services/db.service';
import { Movie } from 'src/app/types/movie';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movieList: Movie[] = [];
  isLoading: boolean = true;

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies() {
    try {
      this.isLoading = true;
      this.movieList = await this.dbService.getMovies();
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getRatingDescription = ratingDescription;
}
