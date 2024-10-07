import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { Game } from 'src/app/types/game';
import { compareValues, sortByReleaseDate } from 'src/utils/common';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  gameList: (Game & { reviewCount: number })[] = [];
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
    await this.loadGames();
  }

  async loadGames() {
    try {
      this.isLoading = true;
      const games = await this.contentService.getGames();
      this.gameList = await this.addReviewCountToGames(games);
      this.sortGames(this.sortBy);
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

  sortGames(sortBy: 'mostPopular' | 'newRelease' | 'best' | 'worst') {
    switch (sortBy) {
      case 'mostPopular':
        this.gameList = [...this.gameList].sort(
          compareValues('reviewCount', 'desc', 'id')
        );
        break;
      case 'newRelease':
        this.gameList = sortByReleaseDate(this.gameList);
        break;
      case 'best':
        this.gameList = [...this.gameList].sort(
          compareValues('rating', 'desc', 'id')
        );
        break;
      case 'worst':
        this.gameList = [...this.gameList].sort(
          compareValues('rating', 'asc', 'id')
        );
        break;
    }
  }

  onSortOptionChange(event: any) {
    this.sortBy = event.detail.value;
    this.sortGames(this.sortBy);
  }

  get sortedTitle(): string {
    const titles = {
      mostPopular: 'Más populares',
      newRelease: 'Nuevos lanzamientos',
      best: 'Mejor calificado',
      worst: 'Peor calificado',
    };
    return titles[this.sortBy];
  }

  getRatingDescription = ratingDescription;
}
