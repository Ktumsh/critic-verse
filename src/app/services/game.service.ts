import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl =
    'https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/door/games-door-global/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => response.components[0].data.items as Game[]));
  }
}
