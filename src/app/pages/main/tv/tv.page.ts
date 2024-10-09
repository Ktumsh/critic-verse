import { Component, OnInit } from '@angular/core';
import { SORTING_OPTIONS } from 'src/app/models/sorting.model';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { SortBy } from 'src/app/types/sort-by';
import { TvShow } from 'src/app/types/tv';
import { refresher } from 'src/utils/common';
import { getSortingTitle, sortContent } from 'src/utils/content';
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

  sortBy: SortBy = 'mostPopular';
  sortingOptions = SORTING_OPTIONS;
  customPopoverOptions = { cssClass: 'custom-popover v2' };

  constructor(
    private contentService: ContentService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.loadTvShows();
  }

  onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    this.sortTvShows();
  }

  get sortedTitle(): string {
    return getSortingTitle(this.sortBy);
  }

  async loadTvShows() {
    try {
      this.isLoading = true;
      const tvShows = await this.contentService.getTvShows();
      this.originalTvList = await this.addReviewCountToTvShows(tvShows);
      this.sortTvShows();
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

  private sortTvShows() {
    this.tvList = sortContent(this.originalTvList, this.sortBy);
  }

  getRatingDescription = ratingDescription;
  handleRefresh = refresher;
}
