import { Component, OnInit } from '@angular/core';
import { DbService } from './services/db.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ContentService } from './services/content.service';
import { UserService } from './services/user.service';
import { GAME_MODEL } from './models/game.model';
import { MOVIE_MODEL } from './models/movie.model';
import { TV_MODEL } from './models/tv.model';
import { AccessibilityService } from './services/accessibility.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly DB_STORAGE_KEY = 'db_initialized';

  constructor(
    private dbService: DbService,
    private contentService: ContentService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private accessibilityService: AccessibilityService,
    private nativeStorage: NativeStorage
  ) {}

  async ngOnInit() {
    const dbInitialized = await this.nativeStorage
      .getItem(this.DB_STORAGE_KEY)
      .catch(() => null);
    if (!dbInitialized) {
      await this.createDBandTables();
      await this.nativeStorage.setItem(this.DB_STORAGE_KEY, true);
      console.log(
        'Base de datos inicializada y estado guardado en native storage.'
      );
    } else {
      console.log(
        'Base de datos ya inicializada, no se requiere creación de tablas ni la inserción de datos.'
      );
    }
    this.accessibilityService.loadSettings();
    await this.authState();
  }

  //Comprobar estado de autenticación
  async authState() {
    await this.authService.loadAuthState();
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  //Crear base de datos y tablas
  async createDBandTables() {
    try {
      await this.dbService.createDatabase();
      console.log('Base de datos y tablas creadas.');

      await this.contentService.insertGameData(GAME_MODEL);
      console.log('Datos de juegos insertados.');

      await this.contentService.insertMovieData(MOVIE_MODEL);
      console.log('Datos de películas insertados.');

      await this.contentService.insertTvShowData(TV_MODEL);
      console.log('Datos de series insertados.');

      await this.createUser();
      console.log('Usuario inicial creado.');
    } catch (error) {
      console.error(
        'Error al inicializar la base de datos y al insertar datos:',
        error
      );
    }
  }

  //Crear un usuario inicial
  async createUser() {
    const users = [
      {
        role: 'admin',
        email: 'admin@duocuc.cl',
        username: 'admin_criticverse',
        password: 'Admin123*',
        birthdate: new Date('1999-01-01T12:00:00'),
      },
      {
        role: 'admin',
        email: 'jo.barra@duocuc.cl',
        username: 'ktumsh',
        password: 'Josue123*',
        birthdate: new Date('2002-01-01T12:00:00'),
      },
      {
        role: 'admin',
        email: 'ren.rivera@duocuc.cl',
        username: 'RynaT',
        password: 'Renato123*',
        birthdate: new Date('2002-01-01T12:00:00'),
      },
    ];

    try {
      for (let user of users) {
        await this.userService.insertUser(user);
      }
      console.log('Nuevo usuario creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }
}
