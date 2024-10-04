import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Game } from 'src/app/types/game';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  gameList: Game[] = [];
  isLoading: boolean = true;

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.loadGames();
  }

  async loadGames() {
    try {
      this.isLoading = true;
      this.gameList = await this.dbService.getGames();
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getRatingDescription = ratingDescription;
}
