import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Game } from '../types/game';
import { Movie } from '../types/movie';
import { TvShow } from '../types/tv';
import { generateUUID } from 'src/utils/common';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private database!: SQLiteObject;
  private isNative: boolean = false;
  private dbInitialized: Promise<void> | undefined;

  private async hashPassword(password: string, salt: string): Promise<string> {
    return CryptoJS.SHA256(password + salt).toString();
  }

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.init();
  }

  private init(): void {
    this.dbInitialized = new Promise<void>(async (resolve, reject) => {
      try {
        await this.platform.ready();
        this.isNative =
          this.platform.is('cordova') || this.platform.is('capacitor');

        if (this.isNative) {
          this.database = await this.sqlite.create({
            name: 'criticverse.db',
            location: 'default',
          });
          resolve();
        } else {
          console.error(
            'La base de datos solo está disponible en entornos nativos.'
          );
          reject('Entorno no nativo');
        }
      } catch (error) {
        console.error(
          'Error durante la inicialización de la base de datos:',
          error
        );
        reject(error);
      }
    });
  }

  private async checkNative(): Promise<void> {
    if (!this.isNative) {
      throw new Error('Esta operación solo se admite en entorno nativo.');
    }
  }

  async createDatabase(): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const tablesExist = await this.checkIfTablesExist();
    if (!tablesExist) {
      await this.createTables();
      console.log('Base de datos y tablas creadas exitosamente.');
    } else {
      console.log('Las tablas ya existen, no se requiere volver a crearlas.');
    }
  }

  private async checkIfTablesExist(): Promise<boolean> {
    const db = this.database as SQLiteObject;
    const res = await db.executeSql(
      'SELECT name FROM sqlite_master WHERE type="table"',
      []
    );
    return res.rows.length > 0;
  }

  private async createTables(): Promise<void> {
    const tableUsers = `
      CREATE TABLE IF NOT EXISTS Users (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        salt TEXT NOT NULL,
        birthdate TEXT,
        profileImage TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
    `;

    const tableMovies = `
      CREATE TABLE IF NOT EXISTS Movies (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        video TEXT,
        rating REAL,
        releaseDate TEXT,
        detailId INTEGER,
        FOREIGN KEY (detailId) REFERENCES Detail (id)
      );
    `;

    const tableTvShows = `
      CREATE TABLE IF NOT EXISTS TvShows (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        video TEXT,
        rating REAL,
        releaseDate TEXT,
        detailId INTEGER,
        FOREIGN KEY (detailId) REFERENCES Detail (id)
      );
    `;

    const tableGames = `
      CREATE TABLE IF NOT EXISTS Games (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        video TEXT,
        rating REAL,
        releaseDate TEXT,
        detailId INTEGER,
        FOREIGN KEY (detailId) REFERENCES Detail (id)
      );
    `;

    const tableDetail = `
      CREATE TABLE IF NOT EXISTS Detail (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        summary TEXT,
        genre TEXT,
        platforms TEXT,
        releaseDate TEXT,
        editor TEXT,
        developer TEXT,
        productionCompany TEXT,
        timeDuration TEXT,
        seasons INTEGER,
        episodeDuration TEXT,
        episodesPerSeason TEXT,
        streamingPlatform TEXT,
        director TEXT,
        producer TEXT,
        writer TEXT,
        cast TEXT
      );
    `;

    const tableReviews = `
      CREATE TABLE IF NOT EXISTS Reviews (
        id TEXT PRIMARY KEY,
        rating INTEGER NOT NULL,
        comment TEXT,
        date TEXT NOT NULL,
        userId TEXT NOT NULL,
        contentId TEXT NOT NULL,
        reportId TEXT,
        FOREIGN KEY (userId) REFERENCES Users (id),
        FOREIGN KEY (contentId) REFERENCES Movies (id) ON DELETE CASCADE,
        FOREIGN KEY (contentId) REFERENCES TvShows (id) ON DELETE CASCADE,
        FOREIGN KEY (contentId) REFERENCES Games (id) ON DELETE CASCADE
      );
    `;

    const tableReports = `
      CREATE TABLE IF NOT EXISTS Reports (
        id TEXT PRIMARY KEY,
        reason TEXT NOT NULL,
        date TEXT NOT NULL,
        reportedBy TEXT NOT NULL,
        reviewId TEXT NOT NULL,
        FOREIGN KEY (reviewId) REFERENCES Reviews (id)
      );
    `;

    const tableCast = `
      CREATE TABLE IF NOT EXISTS Cast (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        actor TEXT NOT NULL,
        character TEXT NOT NULL,
        image TEXT,
        contentId TEXT NOT NULL,
        FOREIGN KEY (contentId) REFERENCES Movies (id),
        FOREIGN KEY (contentId) REFERENCES TvShows (id)
      );
    `;

    const db = this.database as SQLiteObject;
    await db.sqlBatch([
      tableUsers,
      tableMovies,
      tableTvShows,
      tableGames,
      tableDetail,
      tableReviews,
      tableReports,
      tableCast,
    ]);
    console.log('Tablas creadas exitosamente en SQLite.');
  }

  async clearDatabase(): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    console.log('Eliminando todas las tablas en SQLite...');
    const db = this.database as SQLiteObject;
    const res = await db.executeSql(
      'SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE \'sqlite%\';',
      []
    );

    const dropTablePromises = [];
    for (let i = 0; i < res.rows.length; i++) {
      const tableName = res.rows.item(i).name;
      dropTablePromises.push(
        db.executeSql(`DROP TABLE IF EXISTS ${tableName}`, [])
      );
    }
    await Promise.all(dropTablePromises);
    console.log('Todas las tablas eliminadas exitosamente en SQLite.');
  }

  async insertGameData(games: Game[]): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;
    try {
      await db.executeSql('DELETE FROM Games;', []);
      for (const game of games) {
        const detailId = await this.insertDetailForGame(game);

        const gameInsert = `
          INSERT INTO Games (id, title, description, image, video, rating, releaseDate, detailId)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const gameValues = [
          game.id,
          game.title,
          game.description,
          game.image || null,
          game.video || null,
          game.rating,
          game.detail.releaseDate.toString(),
          detailId,
        ];
        await db.executeSql(gameInsert, gameValues);
        console.log(
          `Datos del juego "${game.title}" insertados correctamente.`
        );
      }
    } catch (error) {
      console.error('Error al insertar datos del modelo de juegos:', error);
    }
  }

  private async insertDetailForGame(game: Game): Promise<number> {
    const db = this.database as SQLiteObject;
    const detailInsert = `
      INSERT INTO Detail (summary, genre, platforms, releaseDate, editor, developer, productionCompany, timeDuration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const detailValues = [
      game.detail.summary,
      game.detail.genre.join(', '),
      game.detail.platforms ? game.detail.platforms.join(', ') : null,
      game.detail.releaseDate.toString(),
      game.detail.editor,
      game.detail.developer,
      game.detail.productionCompany
        ? game.detail.productionCompany.join(', ')
        : null,
      game.detail.timeDuration || null,
    ];

    const detailResult = await db.executeSql(detailInsert, detailValues);
    return detailResult.insertId;
  }

  async insertMovieData(movies: Movie[]): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;
    try {
      await db.executeSql('DELETE FROM Movies;', []);
      for (const movie of movies) {
        const detailId = await this.insertDetailForMovie(movie);

        const movieInsert = `
          INSERT INTO Movies (id, title, description, image, rating, releaseDate, detailId)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const movieValues = [
          movie.id,
          movie.title,
          movie.description,
          movie.image || null,
          movie.rating,
          movie.detail.releaseDate.toString(),
          detailId,
        ];
        await db.executeSql(movieInsert, movieValues);

        for (const cast of movie.detail.cast ?? []) {
          const castInsert = `
            INSERT INTO Cast (actor, character, image, contentId)
            VALUES (?, ?, ?, ?)
          `;
          const castValues = [
            cast.actor,
            cast.character,
            cast.image || null,
            movie.id,
          ];
          await db.executeSql(castInsert, castValues);
        }

        console.log(
          `Datos de la película "${movie.title}" insertados correctamente.`
        );
      }
    } catch (error) {
      console.error('Error al insertar datos del modelo de películas:', error);
    }
  }

  private async insertDetailForMovie(movie: Movie): Promise<number> {
    const db = this.database as SQLiteObject;
    const detailInsert = `
      INSERT INTO Detail (summary, genre, platforms, releaseDate, editor, developer, productionCompany, timeDuration, director, producer, writer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const detailValues = [
      movie.detail.summary,
      movie.detail.genre.join(', '),
      movie.detail.platforms ? movie.detail.platforms.join(', ') : null,
      movie.detail.releaseDate.toString(),
      movie.detail.editor || null,
      movie.detail.developer || null,
      movie.detail.productionCompany
        ? movie.detail.productionCompany.join(', ')
        : null,
      movie.detail.timeDuration || null,
      movie.detail.director ? movie.detail.director.join(', ') : null,
      movie.detail.producer ? movie.detail.producer.join(', ') : null,
      movie.detail.writer ? movie.detail.writer.join(', ') : null,
    ];

    const detailResult = await db.executeSql(detailInsert, detailValues);
    return detailResult.insertId;
  }

  async insertTvShowData(tvShows: TvShow[]): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;
    try {
      await db.executeSql('DELETE FROM TvShows;', []);
      await db.executeSql('DELETE FROM Detail;', []);

      for (const tvShow of tvShows) {
        const detailId = await this.insertDetailForTvShow(tvShow);

        const tvShowInsert = `
          INSERT INTO TvShows (id, title, description, image, rating, releaseDate, detailId)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const tvShowValues = [
          tvShow.id,
          tvShow.title,
          tvShow.description,
          tvShow.image || null,
          tvShow.rating,
          tvShow.detail.releaseDate.toString(),
          detailId,
        ];
        await db.executeSql(tvShowInsert, tvShowValues);

        for (const cast of tvShow.detail.cast ?? []) {
          const castInsert = `
            INSERT INTO Cast (actor, character, image, contentId)
            VALUES (?, ?, ?, ?)
          `;
          const castValues = [
            cast.actor,
            cast.character,
            cast.image || null,
            tvShow.id,
          ];
          await db.executeSql(castInsert, castValues);
        }

        console.log(
          `Datos de la serie "${tvShow.title}" insertados correctamente.`
        );
      }
    } catch (error) {
      console.error('Error al insertar datos del modelo de series:', error);
    }
  }

  private async insertDetailForTvShow(tvShow: TvShow): Promise<number> {
    const db = this.database as SQLiteObject;
    const detailInsert = `
      INSERT INTO Detail (genre, cast, director, producer, writer, seasons, episodesPerSeason, episodeDuration, releaseDate, streamingPlatform)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const detailValues = [
      tvShow.detail.genre.join(', '),
      JSON.stringify(tvShow.detail.cast),
      tvShow.detail.director ? tvShow.detail.director.join(', ') : null,
      tvShow.detail.producer ? tvShow.detail.producer.join(', ') : null,
      tvShow.detail.writer ? tvShow.detail.writer.join(', ') : null,
      tvShow.detail.seasons,
      JSON.stringify(tvShow.detail.episodesPerSeason),
      tvShow.detail.episodeDuration,
      tvShow.detail.releaseDate.toString(),
      tvShow.detail.streamingPlatform
        ? tvShow.detail.streamingPlatform.join(', ')
        : null,
    ];

    const detailResult = await db.executeSql(detailInsert, detailValues);
    return detailResult.insertId;
  }

  async getGames(): Promise<Game[]> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;
    const games: Game[] = [];

    try {
      const result = await db.executeSql('SELECT * FROM Games;', []);
      for (let i = 0; i < result.rows.length; i++) {
        const game = result.rows.item(i);
        games.push(game);
      }
      console.log('Juegos obtenidos correctamente:', games);
      return games;
    } catch (error) {
      console.error('Error al obtener juegos:', error);
      return [];
    }
  }

  async getMovies(): Promise<Movie[]> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;
    const movies: Movie[] = [];

    try {
      const result = await db.executeSql('SELECT * FROM Movies;', []);
      for (let i = 0; i < result.rows.length; i++) {
        const movie = result.rows.item(i);
        movies.push(movie);
      }
      console.log('Películas obtenidas correctamente:', movies);
      return movies;
    } catch (error) {
      console.error('Error al obtener películas:', error);
      return [];
    }
  }

  async getTvShows(): Promise<TvShow[]> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;
    const tvShows: TvShow[] = [];

    try {
      const result = await db.executeSql('SELECT * FROM TvShows;', []);
      for (let i = 0; i < result.rows.length; i++) {
        const tvShow = result.rows.item(i);
        tvShows.push(tvShow);
      }
      console.log('Series obtenidas correctamente:', tvShows);
      return tvShows;
    } catch (error) {
      console.error('Error al obtener series:', error);
      return [];
    }
  }

  async insertUser(user: {
    role: string;
    email: string;
    username: string;
    password: string;
    birthdate?: string | Date;
    profileImage?: string;
  }): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;

    const userId = generateUUID();
    const salt = generateUUID();
    const hashedPassword = await this.hashPassword(user.password, salt);

    const formattedBirthdate =
      typeof user.birthdate === 'string'
        ? new Date(user.birthdate).toISOString().split('T')[0]
        : user.birthdate?.toISOString().split('T')[0] || null;

    try {
      const userInsert = `
        INSERT INTO Users (id, role, email, username, password, salt, birthdate, profileImage, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;
      const userValues = [
        userId,
        user.role,
        user.email,
        user.username,
        hashedPassword,
        salt,
        formattedBirthdate,
        user.profileImage || null,
      ];

      await db.executeSql(userInsert, userValues);
      console.log(`Usuario con email "${user.email}" insertado manualmente.`);
    } catch (error) {
      console.error('Error al insertar el usuario manualmente:', error);
      throw error;
    }
  }

  async createUser(user: {
    email: string;
    username: string;
    password: string;
    birthdate?: string | Date;
    profileImage?: string;
  }): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;

    try {
      const userId = generateUUID();
      const role = 'user';
      const salt = generateUUID();
      const hashedPassword = await this.hashPassword(user.password, salt);

      const formattedBirthdate =
        typeof user.birthdate === 'string'
          ? new Date(user.birthdate).toISOString().split('T')[0]
          : user.birthdate?.toISOString().split('T')[0] || null;

      const userInsert = `
        INSERT INTO Users (id, role, email, username, password, salt, birthdate, profileImage, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;
      const userValues = [
        userId,
        role,
        user.email,
        user.username,
        hashedPassword,
        salt,
        formattedBirthdate,
        user.profileImage || null,
      ];

      await db.executeSql(userInsert, userValues);
      console.log(
        `Usuario con email "${user.email}" registrado correctamente.`
      );
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  async verifyUser(email: string, password: string): Promise<boolean> {
    await this.dbInitialized;
    const db = this.database as SQLiteObject;

    try {
      const query = `SELECT * FROM Users WHERE email = ?`;
      const result = await db.executeSql(query, [email]);

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        const salt = user.salt;
        const storedHash = user.password;

        const inputHash = await this.hashPassword(password, salt);

        if (inputHash === storedHash) {
          console.log('Contraseña correcta');
          return true;
        } else {
          console.log('Contraseña incorrecta');
          return false;
        }
      } else {
        console.log('Usuario no encontrado');
        return false;
      }
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
      throw error;
    }
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;

    try {
      const query = `SELECT password, salt FROM Users WHERE email = ?`;
      const result = await db.executeSql(query, [email]);

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        const storedHash = user.password;
        const salt = user.salt;

        const inputHash = CryptoJS.SHA256(password + salt).toString();

        return inputHash === storedHash;
      } else {
        console.log('Usuario no encontrado');
        return false;
      }
    } catch (error) {
      console.error('Error al verificar la contraseña del usuario:', error);
      throw error;
    }
  }

  async usernameExists(username: string): Promise<boolean> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;

    try {
      const query = 'SELECT COUNT(*) AS count FROM Users WHERE username = ?';
      const result = await db.executeSql(query, [username]);

      if (result.rows.item(0).count > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al verificar el username:', error);
      throw error;
    }
  }

  async emailExists(email: string): Promise<boolean> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;

    try {
      const query = 'SELECT COUNT(*) AS count FROM Users WHERE email = ?';
      const result = await db.executeSql(query, [email]);

      if (result.rows.length > 0) {
        const count = result.rows.item(0).count;
        return count > 0;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al verificar el email:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;

    try {
      const query = 'SELECT * FROM Users WHERE email = ?';
      const result = await db.executeSql(query, [email]);

      if (result.rows.length > 0) {
        return result.rows.item(0);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw error;
    }
  }

  async deleteUserByUsername(username: string): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const db = this.database as SQLiteObject;

    try {
      const query = 'DELETE FROM Users WHERE username = ?';
      await db.executeSql(query, [username]);
      console.log(
        `Usuario con username "${username}" eliminado correctamente.`
      );
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error;
    }
  }
}
