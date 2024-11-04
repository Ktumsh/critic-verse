import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SORTING_OPTIONS } from 'src/app/models/sorting.model';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Content } from 'src/app/types/content';
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
export class MoviePage implements OnInit, OnDestroy {
  movieList: (Movie & { reviewCount: number })[] = [];
  originalMovieList: (Movie & { reviewCount: number })[] = [];
  isLoading: boolean = true;

  sortBy: SortBy = 'mostPopular';
  sortingOptions = SORTING_OPTIONS;
  customPopoverOptions = { cssClass: 'custom-popover v2' };

  private contentsSubscription: Subscription = new Subscription();

  constructor(
    private contentService: ContentService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadMovies();

    this.contentsSubscription = this.contentService.contents$.subscribe({
      next: async (contents: Content[]) => {
        const movies = contents.filter((content) =>
          this.contentService.isMovie(content)
        ) as Movie[];

        this.originalMovieList = await this.addReviewCountToMovies(movies);
        this.sortMovies();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al suscribirse a los contenidos:', error);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy() {
    if (this.contentsSubscription) {
      this.contentsSubscription.unsubscribe();
    }
  }

  async loadMovies() {
    try {
      this.isLoading = true;
      await this.contentService.getAllContents();
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }

  onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    this.sortMovies();
  }

  get sortedTitle(): string {
    return getSortingTitle(this.sortBy);
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
