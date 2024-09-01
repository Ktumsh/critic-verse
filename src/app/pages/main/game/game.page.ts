import { Component, OnInit } from '@angular/core';
import { GAME_MODEL } from 'src/app/models/game.model';
import { Game } from 'src/app/types/game';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  gameList: Game[] = [];

  constructor() {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames(): void {
    this.gameList = GAME_MODEL;
  }

  getRatingDescription = ratingDescription;
}
