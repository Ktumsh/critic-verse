import { Component, OnInit } from '@angular/core';
import { DbService } from './services/db.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ContentService } from './services/content.service';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { UserService } from './services/user.service';
import { GAME_MODEL } from './models/game.model';
import { MOVIE_MODEL } from './models/movie.model';
import { TV_MODEL } from './models/tv.model';
import { AccessibilityService } from './services/accessibility.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private database!: SQLiteObject;

  constructor(
    private dbService: DbService,
    private contentService: ContentService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private accessibilityService: AccessibilityService
  ) {}

  async ngOnInit() {
    //Crear base de datos y tablas
    /* await this.createDBandTables(); */

    //Borrar usuario
    /* this.deleteUser('Josuesin'); */

    //Cargar accesibilidad
    this.accessibilityService.loadSettings();

    //Checkear estado de autenticación
    await this.authState();
  }

  async createDBandTables() {
    this.dbService
      .createDatabase()
      .then(() => {
        console.log('Base de datos y tablas creadas exitosamente.');
        return (
          /* this.contentService.insertGameData(GAME_MODEL), */
          /* this.contentService.insertMovieData(MOVIE_MODEL) */
          this.contentService.insertTvShowData(TV_MODEL)
          /* this.createUser() */
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
    this.userService.deleteUserByUsername(username);
  }

  async createUser() {
    const newUser = {
      role: 'admin',
      email: 'ren.rivera@duocuc.cl',
      username: 'RynaT',
      password: 'Renato123*',
      birthdate: new Date('2002-01-11T12:00:00'),
    };

    try {
      await this.userService.insertUser(newUser);
      console.log('Nuevo usuario creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }
}
