import { Component, OnInit } from '@angular/core';
import { GAME_MODEL } from 'src/app/models/game.model';
import { Game } from 'src/app/types/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  gameList: Game[] = [];

  loadGames(): void {
    this.gameList = GAME_MODEL;
  }
  constructor() {}

  ngOnInit() {
    this.loadGames();
  }
}
