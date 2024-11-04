import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SORTING_OPTIONS } from 'src/app/models/sorting.model';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Content } from 'src/app/types/content';
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
export class TvPage implements OnInit, OnDestroy {
  tvList: (TvShow & { reviewCount: number })[] = [];
  originalTvList: (TvShow & { reviewCount: number })[] = [];
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
    this.loadTvShows();

    this.contentsSubscription = this.contentService.contents$.subscribe({
      next: async (contents: Content[]) => {
        const tvShows = contents.filter((content) =>
          this.contentService.isTvShow(content)
        ) as TvShow[];

        this.originalTvList = await this.addReviewCountToTvShows(tvShows);
        this.sortTvShows();
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

  async loadTvShows() {
    try {
      this.isLoading = true;
      await this.contentService.getAllContents();
    } catch (error) {
      console.error('Error loading TV shows:', error);
    }
  }

  onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    this.sortTvShows();
  }

  get sortedTitle(): string {
    return getSortingTitle(this.sortBy);
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
