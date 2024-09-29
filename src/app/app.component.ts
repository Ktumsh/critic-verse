import { Component, OnInit } from '@angular/core';
import { DbService } from './services/db.service';
import { GAME_MODEL } from './models/game.model';
import { MOVIE_MODEL } from './models/movie.model';
import { TV_MODEL } from './models/tv.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent /* implements OnInit */ {
  /*   constructor(private dbService: DbService) {} */
  /*   ngOnInit() {
    this.dbService
      .createDatabase()
      .then(() => {
        console.log('Base de datos y tablas creadas exitosamente.');
        this.dbService.showTables();
        return (
          this.dbService.insertGameData(GAME_MODEL),
          this.dbService.insertMovieData(MOVIE_MODEL),
          this.dbService.insertTvShowData(TV_MODEL)
        );
      })
      .catch((error) => {
        console.error(
          'Error al inicializar la base de datos y crear las tablas',
          error
        );
      });
  } */
}
