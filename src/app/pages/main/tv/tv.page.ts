import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { TvShow } from 'src/app/types/tv';
import { compareValues, sortByReleaseDate } from 'src/utils/common';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss'],
})
export class TvPage implements OnInit {
  tvList: (TvShow & { reviewCount: number })[] = [];
  originalTvList: (TvShow & { reviewCount: number })[] = [];
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
    await this.loadTvShows();
  }

  async loadTvShows() {
    try {
      this.isLoading = true;
      const tvShows = await this.contentService.getTvShows();
      const tvShowsWithReviewCount = await this.addReviewCountToTvShows(
        tvShows
      );
      this.originalTvList = tvShowsWithReviewCount;
      this.sortTvShows(tvShowsWithReviewCount, this.sortBy);
    } catch (error) {
      console.error('Error loading TV shows:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async addReviewCountToTvShows(
    tvShows: TvShow[]
  ): Promise<(TvShow & { reviewCount: number })[]> {
    const tvShowsWithReviewCount = await Promise.all(
      tvShows.map(async (tvShow) => {
        const reviews = await this.reviewService.getReviewsByContentId(
          tvShow.id
        );
        return { ...tvShow, reviewCount: reviews.length };
      })
    );

    return tvShowsWithReviewCount;
  }

  sortTvShows(
    tvShows: (TvShow & { reviewCount: number })[],
    sortBy: 'mostPopular' | 'newRelease' | 'best' | 'worst'
  ) {
    switch (sortBy) {
      case 'mostPopular':
        this.tvList = [...tvShows].sort(
          compareValues('reviewCount', 'desc', 'id')
        );
        break;
      case 'newRelease':
        this.tvList = sortByReleaseDate(tvShows);
        break;
      case 'best':
        this.tvList = [...tvShows].sort(compareValues('rating', 'desc', 'id'));
        break;
      case 'worst':
        this.tvList = [...tvShows].sort(compareValues('rating', 'asc', 'id'));
        break;
    }
  }

  async onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    if (this.sortBy === 'mostPopular') {
      const updatedTvShows = await this.addReviewCountToTvShows(
        this.originalTvList
      );
      this.sortTvShows(updatedTvShows, this.sortBy);
    } else {
      this.sortTvShows(this.originalTvList, this.sortBy);
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
