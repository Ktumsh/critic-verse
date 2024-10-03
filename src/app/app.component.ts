import { Component, OnInit } from '@angular/core';
import { DbService } from './services/db.service';
import { GAME_MODEL } from './models/game.model';
import { MOVIE_MODEL } from './models/movie.model';
import { TV_MODEL } from './models/tv.model';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private dbService: DbService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    //Crear base de datos y tablas
    /* await this.createDBandTables(); */

    //Crear usuario
    /* this.createUser(); */

    //Borrar usuario
    /* this.deleteUser('Josuesin'); */

    //Checkear estado de autenticación
    await this.authState();
  }

  async createDBandTables() {
    this.dbService
      .createDatabase()
      .then(() => {
        console.log('Base de datos y tablas creadas exitosamente.');
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
  }

  async authState() {
    await this.authService.loadAuthState();
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  deleteUser(username: string) {
    this.dbService.deleteUserByUsername(username);
  }

  async createUser() {
    const newUser = {
      role: 'admin',
      email: 'jo.barra@duocuc.cl',
      username: 'ktumsh',
      password: 'Josue123*',
      birthdate: new Date('2002-01-11T12:00:00'),
    };

    try {
      await this.dbService.insertUser(newUser);
      console.log('Nuevo usuario creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }
}
