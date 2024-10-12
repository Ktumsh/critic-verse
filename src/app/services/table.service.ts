import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  //Crear las tablas
  async createTables(database: SQLiteObject): Promise<void> {
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
        detailId TEXT,
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
        detailId TEXT,
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
        detailId TEXT,
        FOREIGN KEY (detailId) REFERENCES Detail (id)
      );
    `;

    const tableDetail = `
      CREATE TABLE IF NOT EXISTS Detail (
        id TEXT PRIMARY KEY,
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
        containsSpoilers INTEGER NOT NULL DEFAULT 0,
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
        id TEXT PRIMARY KEY,
        actor TEXT NOT NULL,
        character TEXT NOT NULL,
        image TEXT,
        contentId TEXT NOT NULL,
        FOREIGN KEY (contentId) REFERENCES Movies (id),
        FOREIGN KEY (contentId) REFERENCES TvShows (id)
      );
    `;

    const tableNotifications = `
      CREATE TABLE IF NOT EXISTS Notifications (
        id TEXT PRIMARY KEY,
        title TEXT,
        body TEXT,
        receivedAt TEXT,
        userId TEXT,
        contentId TEXT
      );
    `;

    await database.sqlBatch([
      tableUsers,
      tableMovies,
      tableTvShows,
      tableGames,
      tableDetail,
      tableReviews,
      tableReports,
      tableCast,
      tableNotifications,
    ]);
    console.log('Tablas creadas exitosamente en SQLite.');
  }

  //Eliminar todas las tablas
  async clearTables(database: SQLiteObject): Promise<void> {
    const res = await database.executeSql(
      'SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE \'sqlite%\';',
      []
    );

    const dropTablePromises = [];
    for (let i = 0; i < res.rows.length; i++) {
      const tableName = res.rows.item(i).name;
      dropTablePromises.push(
        database.executeSql(`DROP TABLE IF EXISTS ${tableName}`, [])
      );
    }
    await Promise.all(dropTablePromises);
    console.log('Todas las tablas eliminadas exitosamente en SQLite.');
  }

  //Verifica si las tablas ya existen
  async checkIfTablesExist(database: SQLiteObject): Promise<boolean> {
    const res = await database.executeSql(
      'SELECT name FROM sqlite_master WHERE type="table";',
      []
    );
    return res.rows.length > 0;
  }
}
