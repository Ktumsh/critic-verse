import { Injectable } from '@angular/core';
import { Game } from '../types/game';
import { Movie } from '../types/movie';
import { TvShow } from '../types/tv';
import {
  generateUUID,
  transformDetail,
  transformReviewsData,
} from 'src/utils/common';
import { DbService } from './db.service';
import { ReviewService } from './review.service';
import { Cast } from '../types/cast';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(
    private dbService: DbService,
    private reviewService: ReviewService
  ) {}

  //Insertar datos de los juegos
  async insertGameData(games: Game[]): Promise<void> {
    const database = await this.dbService.getDatabase();
    await database.executeSql('DELETE FROM Games;', []);

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
      await database.executeSql(gameInsert, gameValues);

      if (game.reviews && game.reviews.length > 0) {
        for (const review of game.reviews) {
          await this.reviewService.insertReview(
            game.id,
            review.userId,
            review.rating,
            review.comment,
            review.containsSpoilers
          );
        }
      }

      console.log(`Datos del juego "${game.title}" insertados correctamente.`);
    }
  }

  //Insertar datos de las películas
  async insertMovieData(movies: Movie[]): Promise<void> {
    const database = await this.dbService.getDatabase();
    await database.executeSql('DELETE FROM Movies;', []);

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
      await database.executeSql(movieInsert, movieValues);

      if (movie.reviews && movie.reviews.length > 0) {
        for (const review of movie.reviews) {
          await this.reviewService.insertReview(
            movie.id,
            review.userId,
            review.rating,
            review.comment,
            review.containsSpoilers
          );
        }
      }

      if (movie.detail.cast && movie.detail.cast.length > 0) {
        for (const cast of movie.detail.cast) {
          const castInsert = `
            INSERT INTO Cast (id, actor, character, image, contentId)
            VALUES (?, ?, ?, ?, ?)
          `;
          const castValues = [
            generateUUID(),
            cast.actor,
            cast.character,
            cast.image || null,
            movie.id,
          ];
          await database.executeSql(castInsert, castValues);
        }
      }

      console.log(
        `Datos de la película "${movie.title}" insertados correctamente.`
      );
    }
  }

  //Insertar datos de las Series
  async insertTvShowData(tvShows: TvShow[]): Promise<void> {
    const database = await this.dbService.getDatabase();
    await database.executeSql('DELETE FROM TvShows;', []);

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
      await database.executeSql(tvShowInsert, tvShowValues);

      if (tvShow.reviews && tvShow.reviews.length > 0) {
        for (const review of tvShow.reviews) {
          await this.reviewService.insertReview(
            tvShow.id,
            review.userId,
            review.rating,
            review.comment,
            review.containsSpoilers
          );
        }
      }

      if (tvShow.detail.cast && tvShow.detail.cast.length > 0) {
        for (const cast of tvShow.detail.cast) {
          const castInsert = `
            INSERT INTO Cast (id, actor, character, image, contentId)
            VALUES (?, ?, ?, ?, ?)
          `;
          const castValues = [
            generateUUID(),
            cast.actor,
            cast.character,
            cast.image || null,
            tvShow.id,
          ];
          await database.executeSql(castInsert, castValues);
        }
      }

      console.log(
        `Datos de la serie "${tvShow.title}" insertados correctamente.`
      );
    }
  }

  //Detalles de juegos
  private async insertDetailForGame(game: Game): Promise<string> {
    const database = await this.dbService.getDatabase();
    const detailId = generateUUID();
    const detailInsert = `
      INSERT INTO Detail (id, summary, genre, platforms, releaseDate, editor, developer, productionCompany, timeDuration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const detailValues = [
      detailId,
      game.detail.summary,
      game.detail.genre.join(', '),
      game.detail.platforms?.join(', ') || null,
      game.detail.releaseDate.toString(),
      game.detail.editor,
      game.detail.developer,
      game.detail.productionCompany?.join(', ') || null,
      game.detail.timeDuration || null,
    ];
    await database.executeSql(detailInsert, detailValues);
    return detailId;
  }

  //Detalles de peliculas
  private async insertDetailForMovie(movie: Movie): Promise<string> {
    const database = await this.dbService.getDatabase();
    const detailId = generateUUID();
    const detailInsert = `
      INSERT INTO Detail (id, summary, genre, platforms, releaseDate, editor, developer, productionCompany, timeDuration, director, producer, writer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const detailValues = [
      detailId,
      movie.detail.summary,
      movie.detail.genre.join(', '),
      movie.detail.platforms?.join(', ') || null,
      movie.detail.releaseDate.toString(),
      movie.detail.editor,
      movie.detail.developer,
      movie.detail.productionCompany?.join(', ') || null,
      movie.detail.timeDuration || null,
      movie.detail.director?.join(', ') || null,
      movie.detail.producer?.join(', ') || null,
      movie.detail.writer?.join(', ') || null,
    ];
    await database.executeSql(detailInsert, detailValues);
    return detailId;
  }

  //Detalle de series
  private async insertDetailForTvShow(tvShow: TvShow): Promise<string> {
    const database = await this.dbService.getDatabase();
    const detailId = generateUUID();
    const detailInsert = `
      INSERT INTO Detail (id, genre, cast, director, producer, writer, seasons, episodesPerSeason, episodeDuration, releaseDate, streamingPlatform)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const detailValues = [
      detailId,
      tvShow.detail.genre.join(', '),
      JSON.stringify(tvShow.detail.cast),
      tvShow.detail.director?.join(', ') || null,
      tvShow.detail.producer?.join(', ') || null,
      tvShow.detail.writer?.join(', ') || null,
      tvShow.detail.seasons,
      JSON.stringify(tvShow.detail.episodesPerSeason),
      tvShow.detail.episodeDuration,
      tvShow.detail.releaseDate.toString(),
      tvShow.detail.streamingPlatform?.join(', ') || null,
    ];
    await database.executeSql(detailInsert, detailValues);
    return detailId;
  }

  //Obtener todos los juegos
  async getGames(): Promise<Game[]> {
    const database = await this.dbService.getDatabase();
    const games: Game[] = [];

    try {
      const result = await database.executeSql(
        `
        SELECT 
          Games.*, 
          Detail.releaseDate,
          COUNT(Reviews.id) AS reviewCount,
          GROUP_CONCAT(Reviews.id || '|' || Reviews.rating || '|' || Reviews.comment || '|' || Reviews.date || '|' || Reviews.containsSpoilers || '|' || Reviews.userId) AS reviewsData
        FROM Games
        LEFT JOIN Detail ON Games.detailId = Detail.id
        LEFT JOIN Reviews ON Games.id = Reviews.contentId
        GROUP BY Games.id;
        `,
        []
      );

      for (let i = 0; i < result.rows.length; i++) {
        const game = result.rows.item(i);
        game.detail = game.detail || {};
        game.detail.releaseDate = new Date(game.releaseDate);
        game.reviews = transformReviewsData(game.reviewsData);
        games.push(game);
      }
      return games;
    } catch (error) {
      console.error('Error al obtener juegos con reviews:', error);
      return [];
    }
  }

  //Obtener todas las películas
  async getMovies(): Promise<Movie[]> {
    const database = await this.dbService.getDatabase();
    const movies: Movie[] = [];

    try {
      const result = await database.executeSql(
        `
        SELECT 
          Movies.*, 
          Detail.releaseDate,
          COUNT(Reviews.id) AS reviewCount,
          GROUP_CONCAT(Reviews.id || '|' || Reviews.rating || '|' || Reviews.comment || '|' || Reviews.date || '|' || Reviews.containsSpoilers || '|' || Reviews.userId) AS reviewsData
        FROM Movies
        LEFT JOIN Detail ON Movies.detailId = Detail.id
        LEFT JOIN Reviews ON Movies.id = Reviews.contentId
        GROUP BY Movies.id;
        `,
        []
      );

      for (let i = 0; i < result.rows.length; i++) {
        const movie = result.rows.item(i);
        movie.detail = movie.detail || {};
        movie.detail.releaseDate = new Date(movie.releaseDate);
        movie.reviews = transformReviewsData(movie.reviewsData);
        movies.push(movie);
      }
      return movies;
    } catch (error) {
      console.error('Error al obtener películas con reviews:', error);
      return [];
    }
  }

  //Obtener todas las series
  async getTvShows(): Promise<TvShow[]> {
    const database = await this.dbService.getDatabase();
    const tvShows: TvShow[] = [];

    try {
      const result = await database.executeSql(
        `
        SELECT 
          TvShows.*, 
          Detail.releaseDate,
          COUNT(Reviews.id) AS reviewCount,
          GROUP_CONCAT(Reviews.id || '|' || Reviews.rating || '|' || Reviews.comment || '|' || Reviews.date || '|' || Reviews.containsSpoilers || '|' || Reviews.userId) AS reviewsData
        FROM TvShows
        LEFT JOIN Detail ON TvShows.detailId = Detail.id
        LEFT JOIN Reviews ON TvShows.id = Reviews.contentId
        GROUP BY TvShows.id;
        `,
        []
      );

      for (let i = 0; i < result.rows.length; i++) {
        const tvShow = result.rows.item(i);
        tvShow.detail = tvShow.detail || {};
        tvShow.detail.releaseDate = new Date(tvShow.releaseDate);
        tvShow.reviews = transformReviewsData(tvShow.reviewsData);
        tvShows.push(tvShow);
      }
      return tvShows;
    } catch (error) {
      console.error('Error al obtener series con reviews:', error);
      return [];
    }
  }

  //Obtener un juego por su ID
  async getGameById(gameId: string): Promise<Game | null> {
    const database = await this.dbService.getDatabase();

    try {
      const query = 'SELECT * FROM Games WHERE id = ?';
      const result = await database.executeSql(query, [gameId]);

      if (result.rows.length > 0) {
        const game = result.rows.item(0);
        const detail = await this.getGameDetailById(game.detailId);
        if (detail) {
          game.detail = {
            ...detail,
            genre: detail.genre ? detail.genre.split(', ') : [],
            platforms: detail.platforms ? detail.platforms.split(', ') : [],
          };

          const reviews = await this.reviewService.getReviewsByContentId(
            gameId
          );
          game.reviews = reviews;
        }
        return game as Game;
      } else {
        console.log(`No se encontró un juego con ID "${gameId}".`);
        return null;
      }
    } catch (error) {
      console.error(`Error al obtener el juego con ID "${gameId}":`, error);
      return null;
    }
  }

  //Obtener una película por su ID
  async getMovieById(movieId: string): Promise<Movie | null> {
    const database = await this.dbService.getDatabase();

    try {
      const query = 'SELECT * FROM Movies WHERE id = ?';
      const result = await database.executeSql(query, [movieId]);

      if (result.rows.length > 0) {
        const movie = result.rows.item(0);
        const detail = await this.getMovieDetailById(movie.detailId);
        if (detail) {
          const cast = await this.getCastByContentId(movie.id);

          movie.detail = {
            ...detail,
            genre: transformDetail(detail.genre, 'array'),
            director: transformDetail(detail.director, 'array'),
            producer: transformDetail(detail.producer, 'array'),
            writer: transformDetail(detail.writer, 'array'),
            productionCompany: transformDetail(
              detail.productionCompany,
              'array'
            ),
            cast,
          };

          const reviews = await this.reviewService.getReviewsByContentId(
            movieId
          );
          movie.reviews = reviews;
        }
        return movie as Movie;
      } else {
        console.log(`No se encontró una película con ID "${movieId}".`);
        return null;
      }
    } catch (error) {
      console.error(`Error al obtener la película con ID "${movieId}":`, error);
      return null;
    }
  }

  //Obtener una serie por su ID
  async getTvShowById(tvShowId: string): Promise<TvShow | null> {
    const database = await this.dbService.getDatabase();

    try {
      const query = 'SELECT * FROM TvShows WHERE id = ?';
      const result = await database.executeSql(query, [tvShowId]);

      if (result.rows.length > 0) {
        const tvShow = result.rows.item(0);
        const detail = await this.getTvShowDetailById(tvShow.detailId);
        if (detail) {
          const cast = await this.getCastByContentId(tvShow.id);

          tvShow.detail = {
            ...detail,
            genre: transformDetail(detail.genre, 'array'),
            director: transformDetail(detail.director, 'array'),
            producer: transformDetail(detail.producer, 'array'),
            writer: transformDetail(detail.writer, 'array'),
            streamingPlatform: transformDetail(
              detail.streamingPlatform,
              'array'
            ),
            cast,
            episodesPerSeason: transformDetail(
              detail.episodesPerSeason,
              'json'
            ),
          };

          const reviews = await this.reviewService.getReviewsByContentId(
            tvShowId
          );
          tvShow.reviews = reviews;
        }
        return tvShow as TvShow;
      } else {
        console.log(`No se encontró una serie con ID "${tvShowId}".`);
        return null;
      }
    } catch (error) {
      console.error(`Error al obtener la serie con ID "${tvShowId}":`, error);
      return null;
    }
  }

  //Obtener detalles de un juego por ID
  private async getGameDetailById(detailId: string): Promise<any | null> {
    const database = await this.dbService.getDatabase();

    try {
      const query = 'SELECT * FROM Detail WHERE id = ?';
      const result = await database.executeSql(query, [detailId]);

      if (result.rows.length > 0) {
        return result.rows.item(0);
      } else {
        console.log(`No se encontró un detalle con ID "${detailId}".`);
        return null;
      }
    } catch (error) {
      console.error(
        `Error al obtener el detalle del juego con ID "${detailId}":`,
        error
      );
      return null;
    }
  }

  //Obtener detalles de una pelicula por ID
  private async getMovieDetailById(detailId: string): Promise<any | null> {
    const database = await this.dbService.getDatabase();

    try {
      const query = 'SELECT * FROM Detail WHERE id = ?';
      const result = await database.executeSql(query, [detailId]);

      if (result.rows.length > 0) {
        return result.rows.item(0);
      } else {
        console.log(`No se encontró un detalle con ID "${detailId}".`);
        return null;
      }
    } catch (error) {
      console.error(
        `Error al obtener el detalle de la película con ID "${detailId}":`,
        error
      );
      return null;
    }
  }

  //Obtener detalles de una serie por ID
  private async getTvShowDetailById(detailId: string): Promise<any | null> {
    const database = await this.dbService.getDatabase();

    try {
      const query = 'SELECT * FROM Detail WHERE id = ?';
      const result = await database.executeSql(query, [detailId]);

      if (result.rows.length > 0) {
        return result.rows.item(0);
      } else {
        console.log(`No se encontró un detalle con ID "${detailId}".`);
        return null;
      }
    } catch (error) {
      console.error(
        `Error al obtener el detalle de la serie con ID "${detailId}":`,
        error
      );
      return null;
    }
  }

  //Obtener elenco por contentId
  async getCastByContentId(contentId: string): Promise<Cast[]> {
    const database = await this.dbService.getDatabase();
    const castList: Cast[] = [];

    try {
      const query = 'SELECT * FROM Cast WHERE contentId = ?';
      const result = await database.executeSql(query, [contentId]);

      for (let i = 0; i < result.rows.length; i++) {
        const castItem = result.rows.item(i);
        castList.push({
          actor: castItem.actor,
          character: castItem.character,
          image: castItem.image || '',
        });
      }
      return castList;
    } catch (error) {
      console.error(
        `Error al obtener el elenco con contentId "${contentId}":`,
        error
      );
      return [];
    }
  }

  // Verificar si el contentId pertenece a un juego
  async isGameContent(contentId: string): Promise<boolean> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT id FROM Games WHERE id = ?';
    const result = await database.executeSql(query, [contentId]);
    return result.rows.length > 0;
  }

  // Verificar si el contentId pertenece a una película
  async isMovieContent(contentId: string): Promise<boolean> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT id FROM Movies WHERE id = ?';
    const result = await database.executeSql(query, [contentId]);
    return result.rows.length > 0;
  }

  // Verificar si el contentId pertenece a una serie de TV
  async isTvShowContent(contentId: string): Promise<boolean> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT id FROM TvShows WHERE id = ?';
    const result = await database.executeSql(query, [contentId]);
    return result.rows.length > 0;
  }
}
