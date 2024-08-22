import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, NgOptimizedImage],
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input() game!: Game;

  getImageUrl(): string {
    const { bucketType, bucketPath } = this.game.images[0];
    return `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;
  }
}
