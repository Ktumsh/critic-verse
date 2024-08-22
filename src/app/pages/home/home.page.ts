import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GameComponent } from 'src/app/components/game/game.component';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/models/game.model';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, GameComponent, NgOptimizedImage],
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }
}
