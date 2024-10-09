import { Component, OnInit } from '@angular/core';
import { SORTING_OPTIONS } from 'src/app/models/sorting.model';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Game } from 'src/app/types/game';
import { SortBy } from 'src/app/types/sort-by';
import { refresher } from 'src/utils/common';
import { getSortingTitle, sortContent } from 'src/utils/content';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  gameList: (Game & { reviewCount: number })[] = [];
  originalGameList: (Game & { reviewCount: number })[] = [];
  isLoading: boolean = true;

  sortBy: SortBy = 'mostPopular';
  sortingOptions = SORTING_OPTIONS;
  customPopoverOptions = { cssClass: 'custom-popover v2' };

  constructor(
    private contentService: ContentService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.loadGames();
  }

  onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    this.sortGames();
  }

  get sortedTitle(): string {
    return getSortingTitle(this.sortBy);
  }

  async loadGames() {
    try {
      this.isLoading = true;
      const games = await this.contentService.getGames();
      this.originalGameList = await this.addReviewCountToGames(games);
      this.sortGames();
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async addReviewCountToGames(
    games: Game[]
  ): Promise<(Game & { reviewCount: number })[]> {
    const gamesWithReviewCount = await Promise.all(
      games.map(async (game) => {
        const reviews = await this.reviewService.getReviewsByContentId(game.id);
        return { ...game, reviewCount: reviews.length };
      })
    );
    return gamesWithReviewCount;
  }

  private sortGames() {
    this.gameList = sortContent(this.originalGameList, this.sortBy);
  }

  getRatingDescription = ratingDescription;
  handleRefresh = refresher;
}
