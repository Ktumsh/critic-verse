import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SORTING_OPTIONS } from 'src/app/models/sorting.model';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Content } from 'src/app/types/content';
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
export class GamePage implements OnInit, OnDestroy {
  gameList: (Game & { reviewCount: number })[] = [];
  originalGameList: (Game & { reviewCount: number })[] = [];
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
    this.loadGames();

    this.contentsSubscription = this.contentService.contents$.subscribe({
      next: async (contents: Content[]) => {
        const games = contents.filter((content) =>
          this.contentService.isGame(content)
        ) as Game[];

        this.originalGameList = await this.addReviewCountToGames(games);
        this.sortGames();
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

  async loadGames() {
    try {
      this.isLoading = true;
      await this.contentService.getAllContents();
    } catch (error) {
      console.error('Error loading games:', error);
    }
  }

  onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    this.sortGames();
  }

  get sortedTitle(): string {
    return getSortingTitle(this.sortBy);
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
