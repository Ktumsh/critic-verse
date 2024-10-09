import { Component, OnInit } from '@angular/core';
import { SORTING_OPTIONS } from 'src/app/models/sorting.model';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Movie } from 'src/app/types/movie';
import { SortBy } from 'src/app/types/sort-by';
import { refresher } from 'src/utils/common';
import { getSortingTitle, sortContent } from 'src/utils/content';
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

  sortBy: SortBy = 'mostPopular';
  sortingOptions = SORTING_OPTIONS;
  customPopoverOptions = { cssClass: 'custom-popover v2' };

  constructor(
    private contentService: ContentService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    this.sortMovies();
  }

  get sortedTitle(): string {
    return getSortingTitle(this.sortBy);
  }

  async loadMovies() {
    try {
      this.isLoading = true;
      const movies = await this.contentService.getMovies();
      this.originalMovieList = await this.addReviewCountToMovies(movies);
      this.sortMovies();
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

  private sortMovies() {
    this.movieList = sortContent(this.originalMovieList, this.sortBy);
  }

  getRatingDescription = ratingDescription;
  handleRefresh = refresher;
}
