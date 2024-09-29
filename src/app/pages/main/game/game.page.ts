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

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.loadGames();
  }

  async loadGames() {
    this.gameList = await this.dbService.getGames();
  }

  getRatingDescription = ratingDescription;
}
