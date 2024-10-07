import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Movie } from 'src/app/types/movie';
import { compareValues, sortByReleaseDate } from 'src/utils/common';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movieList: (Movie & { reviewCount: number })[] = [];
  originalMovieList: (Movie & { reviewCount: number })[] = [];
  isLoading: boolean = true;

  sortBy: 'mostPopular' | 'newRelease' | 'best' | 'worst' = 'mostPopular';
  sortingOptions = [
    { label: 'Más populares', value: 'mostPopular' },
    { label: 'Nuevos lanzamientos', value: 'newRelease' },
    { label: 'Mejor calificado', value: 'best' },
    { label: 'Peor calificado', value: 'worst' },
  ];

  customPopoverOptions = {
    cssClass: 'custom-popover v2',
  };

  constructor(
    private contentService: ContentService,
    private reviewService: ReviewService
  ) {}

  async ngOnInit() {
    await this.loadMovies();
  }

  async loadMovies() {
    try {
      this.isLoading = true;
      const movies = await this.contentService.getMovies();
      const moviesWithReviewCount = await this.addReviewCountToMovies(movies);
      this.originalMovieList = moviesWithReviewCount;
      this.sortMovies(moviesWithReviewCount, this.sortBy);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async addReviewCountToMovies(
    movies: Movie[]
  ): Promise<(Movie & { reviewCount: number })[]> {
    const moviesWithReviewCount = await Promise.all(
      movies.map(async (movie) => {
        const reviews = await this.reviewService.getReviewsByContentId(
          movie.id
        );
        return { ...movie, reviewCount: reviews.length };
      })
    );

    return moviesWithReviewCount;
  }

  sortMovies(
    movies: (Movie & { reviewCount: number })[],
    sortBy: 'mostPopular' | 'newRelease' | 'best' | 'worst'
  ) {
    switch (sortBy) {
      case 'mostPopular':
        this.movieList = [...movies].sort(
          compareValues('reviewCount', 'desc', 'id')
        );
        break;
      case 'newRelease':
        this.movieList = sortByReleaseDate(movies);
        break;
      case 'best':
        this.movieList = [...movies].sort(
          compareValues('rating', 'desc', 'id')
        );
        break;
      case 'worst':
        this.movieList = [...movies].sort(compareValues('rating', 'asc', 'id'));
        break;
    }
  }

  async onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    if (this.sortBy === 'mostPopular') {
      const updatedMovies = await this.addReviewCountToMovies(
        this.originalMovieList
      );
      this.sortMovies(updatedMovies, this.sortBy);
    } else {
      this.sortMovies(this.originalMovieList, this.sortBy);
    }
  }

  get sortedTitle(): string {
    switch (this.sortBy) {
      case 'newRelease':
        return 'Nuevos lanzamientos';
      case 'best':
        return 'Mejor calificado';
      case 'worst':
        return 'Peor calificado';
      case 'mostPopular':
        return 'Más populares';
      default:
        return '';
    }
  }

  getRatingDescription = ratingDescription;
}
