import { Injectable } from '@angular/core';
import { Game } from '../types/game';
import { Movie } from '../types/movie';
import { TvShow } from '../types/tv';
import {
  formatArrayField,
  generateUUID,
  transformDetail,
  transformReviewsData,
} from 'src/utils/common';
import { DbService } from './db.service';
import { ReviewService } from './review.service';
import { Cast } from '../types/cast';
import { Content } from '../types/content';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentsSubject: BehaviorSubject<Content[]> = new BehaviorSubject<
    Content[]
  >([]);
  public contents$: Observable<Content[]> = this.contentsSubject.asObservable();

  constructor(
    private dbService: DbService,
    private reviewService: ReviewService
  ) {
    this.getAllContents();
  }

  // ======= Type Guards =======
  isGame(content: Content): content is Game {
    return ((content as any)._type || '').toLowerCase() === 'game';
  }

  isMovie(content: Content): content is Movie {
    return ((content as any)._type || '').toLowerCase() === 'movie';
  }

  isTvShow(content: Content): content is TvShow {
    return ((content as any)._type || '').toLowerCase() === 'tvshow';
  }

  //Insertar datos de los juegos
  async insertGameData(games: Game[]): Promise<void> {
    const database = await this.dbService.getDatabase();

    for (const game of games) {
      const query = 'SELECT COUNT(*) AS count FROM Games WHERE id = ?';
      const result = await database.executeSql(query, [game.id]);
      const count = result.rows.item(0).count;

      if (count === 0) {
        const detailId = await this.insertDetailForGame(game);

        const gameInsert = `
        INSERT OR IGNORE INTO Games (id, title, description, image, video, rating, releaseDate, detailId)
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
            const existingReview = await this.reviewService.getExistingReview(
              game.id,
              review.userId,
              review.comment
            );
            if (!existingReview) {
              await this.reviewService.insertReview(
                game.id,
                review.userId,
                review.rating,
                review.comment,
                review.containsSpoilers
              );
            }
          }
        }

        console.log(
          `Datos del juego "${game.title}" insertados correctamente.`
        );
      } else {
        console.log(
          `El juego "${game.title}" ya existe, se omite la inserción.`
        );
      }
    }
  }

  //Insertar datos de las películas
  async insertMovieData(movies: Movie[]): Promise<void> {
    const database = await this.dbService.getDatabase();

    for (const movie of movies) {
      const query = 'SELECT COUNT(*) AS count FROM Movies WHERE id = ?';
      const result = await database.executeSql(query, [movie.id]);
      const count = result.rows.item(0).count;

      if (count === 0) {
        const detailId = await this.insertDetailForMovie(movie);

        const movieInsert = `
          INSERT OR IGNORE INTO Movies (id, title, description, image, rating, releaseDate, detailId)
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
            const existingReview = await this.reviewService.getExistingReview(
              movie.id,
              review.userId,
              review.comment
            );
            if (!existingReview) {
              await this.reviewService.insertReview(
                movie.id,
                review.userId,
                review.rating,
                review.comment,
                review.containsSpoilers
              );
            }
          }
        }

        if (movie.detail.cast && movie.detail.cast.length > 0) {
          for (const cast of movie.detail.cast) {
            const existingCast = await this.getExistingCast(
              movie.id,
              cast.actor,
              cast.character
            );
            if (!existingCast) {
              const castInsert = `
                INSERT OR IGNORE INTO Cast (id, actor, character, image, contentId)
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
        }

        console.log(
          `Datos de la película "${movie.title}" insertados correctamente.`
        );
      } else {
        console.log(
          `La película "${movie.title}" ya existe, se omite la inserción.`
        );
      }
    }
  }

  //Insertar datos de las Series
  async insertTvShowData(tvShows: TvShow[]): Promise<void> {
    const database = await this.dbService.getDatabase();

    for (const tvShow of tvShows) {
      const query = 'SELECT COUNT(*) AS count FROM TvShows WHERE id = ?';
      const result = await database.executeSql(query, [tvShow.id]);
      const count = result.rows.item(0).count;

      if (count === 0) {
        const detailId = await this.insertDetailForTvShow(tvShow);

        const tvShowInsert = `
          INSERT OR IGNORE INTO TvShows (id, title, description, image, rating, releaseDate, detailId)
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
            const existingReview = await this.reviewService.getExistingReview(
              tvShow.id,
              review.userId,
              review.comment
            );
            if (!existingReview) {
              await this.reviewService.insertReview(
                tvShow.id,
                review.userId,
                review.rating,
                review.comment,
                review.containsSpoilers
              );
            }
          }
        }

        if (tvShow.detail.cast && tvShow.detail.cast.length > 0) {
          for (const cast of tvShow.detail.cast) {
            const existingCast = await this.getExistingCast(
              tvShow.id,
              cast.actor,
              cast.character
            );
            if (!existingCast) {
              const castInsert = `
                INSERT OR IGNORE INTO Cast (id, actor, character, image, contentId)
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
        }

        console.log(
          `Datos de la serie "${tvShow.title}" insertados correctamente.`
        );
      } else {
        console.log(
          `La serie "${tvShow.title}" ya existe, se omite la inserción.`
        );
      }
    }
  }

  //Detalles de juegos
  private async insertDetailForGame(game: Game): Promise<string> {
    const database = await this.dbService.getDatabase();
    let detailId: string;

    const query =
      'SELECT id FROM Detail WHERE summary = ? AND genre = ? AND releaseDate = ?';
    const result = await database.executeSql(query, [
      game.detail.summary,
      game.detail.genre.join(', '),
      game.detail.releaseDate.toString(),
    ]);

    if (result.rows.length === 0) {
      detailId = generateUUID();
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
    } else {
      detailId = result.rows.item(0).id;
      console.log(
        `El detalle del juego ya existe con ID: ${detailId}, se omite la inserción.`
      );
    }

    return detailId;
  }

  //Detalles de peliculas
  private async insertDetailForMovie(movie: Movie): Promise<string> {
    const database = await this.dbService.getDatabase();
    let detailId: string;

    const query =
      'SELECT id FROM Detail WHERE summary = ? AND genre = ? AND releaseDate = ?';
    const result = await database.executeSql(query, [
      movie.detail.summary,
      movie.detail.genre.join(', '),
      movie.detail.releaseDate.toString(),
    ]);

    if (result.rows.length === 0) {
      detailId = generateUUID();
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
    } else {
      detailId = result.rows.item(0).id;
      console.log(
        `El detalle de la película ya existe con ID: ${detailId}, se omite la inserción.`
      );
    }

    return detailId;
  }

  //Detalle de series
  private async insertDetailForTvShow(tvShow: TvShow): Promise<string> {
    const database = await this.dbService.getDatabase();
    let detailId: string;

    const query =
      'SELECT id FROM Detail WHERE genre = ? AND releaseDate = ? AND seasons = ?';
    const result = await database.executeSql(query, [
      tvShow.detail.genre.join(', '),
      tvShow.detail.releaseDate.toString(),
      tvShow.detail.seasons,
    ]);

    if (result.rows.length === 0) {
      detailId = generateUUID();
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
    } else {
      detailId = result.rows.item(0).id;
      console.log(
        `El detalle de la serie ya existe con ID: ${detailId}, se omite la inserción.`
      );
    }

    return detailId;
  }

  //Verificar si el cast ya existe
  private async getExistingCast(
    contentId: string,
    actor: string,
    character: string
  ): Promise<Cast | null> {
    const database = await this.dbService.getDatabase();
    const query =
      'SELECT * FROM Cast WHERE contentId = ? AND actor = ? AND character = ?';
    const result = await database.executeSql(query, [
      contentId,
      actor,
      character,
    ]);

    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  async getAllContents(): Promise<void> {
    const [games, movies, tvShows] = await Promise.all([
      this.getGames(),
      this.getMovies(),
      this.getTvShows(),
    ]);

    const typedGames = games.map((game) => ({ ...game, _type: 'game' }));
    const typedMovies = movies.map((movie) => ({ ...movie, _type: 'movie' }));
    const typedTvShows = tvShows.map((tvShow) => ({
      ...tvShow,
      _type: 'tvshow',
    }));

    const allContents = [...typedGames, ...typedMovies, ...typedTvShows];

    this.contentsSubject.next(allContents);
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

  async getGameByIdWithDetails(gameId: string): Promise<Game | null> {
    console.log('gameId', gameId);
    const database = await this.dbService.getDatabase();

    try {
      const result = await database.executeSql(
        `
        SELECT 
          Games.id AS gameId,
          Games.title,
          Games.description,
          Games.image,
          Games.video,
          Games.rating,
          Detail.id AS detailId,
          Detail.summary,
          Detail.genre,
          Detail.releaseDate,
          Detail.platforms,
          Detail.editor,
          Detail.developer,
          Detail.productionCompany,
          Detail.timeDuration
        FROM Games
        LEFT JOIN Detail ON Games.detailId = Detail.id
        WHERE Games.id = ?;
        `,
        [gameId]
      );

      if (result.rows.length > 0) {
        const gameData = result.rows.item(0);

        const game: Game = {
          id: gameData.gameId,
          title: gameData.title,
          description: gameData.description,
          image: gameData.image,
          video: gameData.video,
          rating: gameData.rating,
          detail: {
            summary: gameData.summary,
            genre: transformDetail(gameData.genre, 'array'),
            releaseDate: new Date(gameData.releaseDate),
            platforms: transformDetail(gameData.platforms, 'array'),
            editor: gameData.editor,
            developer: gameData.developer,
            productionCompany: transformDetail(
              gameData.productionCompany,
              'array'
            ),
            timeDuration: gameData.timeDuration,
          },
          reviews: [],
        };

        return game;
      } else {
        console.log(`No se encontró un juego con ID "${gameId}".`);
        return null;
      }
    } catch (error) {
      console.error(`Error al obtener el juego con ID "${gameId}":`, error);
      return null;
    }
  }

  async getMovieByIdWithDetails(movieId: string): Promise<Movie | null> {
    const database = await this.dbService.getDatabase();

    try {
      const result = await database.executeSql(
        `
        SELECT 
          Movies.id AS movieId,
          Movies.title,
          Movies.description,
          Movies.image,
          Movies.rating,
          Detail.id AS detailId,
          Detail.summary,
          Detail.genre,
          Detail.releaseDate,
          Detail.director,
          Detail.producer,
          Detail.writer,
          Detail.productionCompany,
          Detail.timeDuration
        FROM Movies
        LEFT JOIN Detail ON Movies.detailId = Detail.id
        WHERE Movies.id = ?;
        `,
        [movieId]
      );

      if (result.rows.length > 0) {
        const movieData = result.rows.item(0);

        const movie: Movie = {
          id: movieData.movieId,
          title: movieData.title,
          description: movieData.description,
          image: movieData.image,
          rating: movieData.rating,
          detail: {
            summary: movieData.summary,
            genre: transformDetail(movieData.genre, 'array'),
            releaseDate: new Date(movieData.releaseDate),
            director: transformDetail(movieData.director, 'array'),
            producer: transformDetail(movieData.producer, 'array'),
            writer: transformDetail(movieData.writer, 'array'),
            productionCompany: movieData.productionCompany,
            timeDuration: movieData.timeDuration,
            cast: [],
          },
          reviews: [],
        };

        return movie;
      } else {
        console.log(`No se encontró una película con ID "${movieId}".`);
        return null;
      }
    } catch (error) {
      console.error(`Error al obtener la película con ID "${movieId}":`, error);
      return null;
    }
  }

  async getTvShowByIdWithDetails(tvShowId: string): Promise<TvShow | null> {
    const database = await this.dbService.getDatabase();

    try {
      const result = await database.executeSql(
        `
        SELECT 
          TvShows.id AS tvShowId,
          TvShows.title,
          TvShows.description,
          TvShows.image,
          TvShows.rating,
          Detail.id AS detailId,
          Detail.summary,
          Detail.genre,
          Detail.releaseDate,
          Detail.seasons,
          Detail.episodesPerSeason,
          Detail.episodeDuration,
          Detail.streamingPlatform,
          Detail.producer,
          Detail.writer,
          Detail.director
        FROM TvShows
        LEFT JOIN Detail ON TvShows.detailId = Detail.id
        WHERE TvShows.id = ?;
        `,
        [tvShowId]
      );

      if (result.rows.length > 0) {
        const tvShowData = result.rows.item(0);

        const tvShow: TvShow = {
          id: tvShowData.tvShowId,
          title: tvShowData.title,
          description: tvShowData.description,
          image: tvShowData.image,
          rating: tvShowData.rating,
          detail: {
            summary: tvShowData.summary,
            genre: transformDetail(tvShowData.genre, 'array'),
            releaseDate: new Date(tvShowData.releaseDate),
            seasons: tvShowData.seasons,
            episodesPerSeason: transformDetail(
              tvShowData.episodesPerSeason,
              'json'
            ),
            episodeDuration: tvShowData.episodeDuration,
            streamingPlatform: transformDetail(
              tvShowData.streamingPlatform,
              'array'
            ),
            producer: transformDetail(tvShowData.producer, 'array'),
            writer: transformDetail(tvShowData.writer, 'array'),
            director: transformDetail(tvShowData.director, 'array'),
            cast: [],
          },
          reviews: [],
        };

        return tvShow;
      } else {
        console.log(`No se encontró una serie con ID "${tvShowId}".`);
        return null;
      }
    } catch (error) {
      console.error(`Error al obtener la serie con ID "${tvShowId}":`, error);
      return null;
    }
  }

  async addNewContent(content: Game | Movie | TvShow): Promise<void> {
    const database = await this.dbService.getDatabase();
    const detailId = generateUUID();

    try {
      const insertDetailQuery = `
      INSERT INTO Detail (id, summary, genre, releaseDate, platforms, editor, developer, productionCompany, timeDuration, director, producer, writer, seasons, episodesPerSeason, episodeDuration, streamingPlatform, cast)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const detailValues = [
        detailId,
        content.detail.summary || null,
        formatArrayField(content.detail.genre),
        content.detail.releaseDate.toString(),
        formatArrayField(content.detail.platforms),
        content.detail.editor || null,
        content.detail.developer || null,
        formatArrayField(content.detail.productionCompany),
        content.detail.timeDuration || null,
        formatArrayField(content.detail.director),
        formatArrayField(content.detail.producer),
        formatArrayField(content.detail.writer),
        content.detail.seasons || null,
        content.detail.episodesPerSeason
          ? JSON.stringify(content.detail.episodesPerSeason)
          : null,
        content.detail.episodeDuration || null,
        formatArrayField(content.detail.streamingPlatform),
      ];

      await database.executeSql(insertDetailQuery, detailValues);

      let insertContentQuery = '';
      let contentValues: any[] = [];

      if (this.isGame(content)) {
        const game = content as Game;
        insertContentQuery = `
          INSERT INTO Games (id, title, description, image, video, rating, releaseDate, detailId)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        contentValues = [
          game.id || generateUUID(),
          game.title,
          game.description,
          game.image || null,
          game.video || null,
          game.rating,
          game.detail.releaseDate.toString(),
          detailId,
        ];
      } else if (this.isMovie(content)) {
        const movie = content as Movie;
        insertContentQuery = `
          INSERT INTO Movies (id, title, description, image, rating, releaseDate, detailId)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        contentValues = [
          movie.id || generateUUID(),
          movie.title,
          movie.description,
          movie.image || null,
          movie.rating,
          movie.detail.releaseDate.toString(),
          detailId,
        ];
      } else if (this.isTvShow(content)) {
        const tvShow = content as TvShow;
        insertContentQuery = `
          INSERT INTO TvShows (id, title, description, image, rating, releaseDate, detailId)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        contentValues = [
          tvShow.id || generateUUID(),
          tvShow.title,
          tvShow.description,
          tvShow.image || null,
          tvShow.rating,
          tvShow.detail.releaseDate.toString(),
          detailId,
        ];
      } else {
        throw new Error('Tipo de contenido no válido');
      }

      await database.executeSql(insertContentQuery, contentValues);
      await this.getAllContents();
      console.log(`Nuevo contenido insertado exitosamente.`);
    } catch (error) {
      console.error('Error al agregar el nuevo contenido:', error);
      throw error;
    }
  }

  async updateContent(content: Game | Movie | TvShow): Promise<void> {
    const database = await this.dbService.getDatabase();

    try {
      let detailId = '';

      if (this.isGame(content)) {
        const gameContent = content as Game;

        const result = await database.executeSql(
          'SELECT detailId FROM Games WHERE id = ?',
          [gameContent.id]
        );
        detailId = result.rows.item(0).detailId || '';

        const formattedReleaseDate = new Date(gameContent.detail.releaseDate)
          .toISOString()
          .split('T')[0];
        const genre = gameContent.detail.genre?.join(', ') || null;
        const platforms = gameContent.detail.platforms?.join(', ') || null;

        const updateDetailQuery = `
          UPDATE Detail SET 
            genre = ?, 
            releaseDate = ?, 
            platforms = ?, 
            editor = ?, 
            developer = ?
          WHERE id = ?
        `;

        const detailValues = [
          genre,
          formattedReleaseDate,
          platforms,
          gameContent.detail.editor || null,
          gameContent.detail.developer || null,
          detailId,
        ];

        await database.executeSql(updateDetailQuery, detailValues);

        const updateContentQuery = `
          UPDATE Games SET 
            title = ?, 
            description = ?, 
            image = ?, 
            rating = ?
          WHERE id = ?
        `;

        const contentValues = [
          gameContent.title,
          gameContent.description,
          gameContent.image || null,
          gameContent.rating,
          gameContent.id,
        ];

        await database.executeSql(updateContentQuery, contentValues);
      } else if (this.isMovie(content)) {
        const movieContent = content as Movie;

        const result = await database.executeSql(
          'SELECT detailId FROM Movies WHERE id = ?',
          [movieContent.id]
        );
        detailId = result.rows.item(0)?.detailId || '';

        const updateDetailQuery = `
          UPDATE Detail SET 
            genre = ?, 
            releaseDate = ?, 
            director = ?, 
            producer = ?, 
            writer = ?, 
            productionCompany = ?, 
            timeDuration = ?
          WHERE id = ?
        `;

        const detailValues = [
          movieContent.detail.genre?.join(', ') || null,
          new Date(movieContent.detail.releaseDate).toISOString(),
          movieContent.detail.director?.join(', ') || null,
          movieContent.detail.producer?.join(', ') || null,
          movieContent.detail.writer?.join(', ') || null,
          movieContent.detail.productionCompany || null,
          movieContent.detail.timeDuration || null,
          detailId,
        ];

        await database.executeSql(updateDetailQuery, detailValues);

        const updateContentQuery = `
          UPDATE Movies SET 
            title = ?, 
            description = ?, 
            image = ?, 
            rating = ?
          WHERE id = ?
        `;

        const contentValues = [
          movieContent.title,
          movieContent.description,
          movieContent.image || null,
          movieContent.rating,
          movieContent.id,
        ];

        await database.executeSql(updateContentQuery, contentValues);
      } else if (this.isTvShow(content)) {
        const tvShowContent = content as TvShow;

        const result = await database.executeSql(
          'SELECT detailId FROM TvShows WHERE id = ?',
          [tvShowContent.id]
        );
        detailId = result.rows.item(0)?.detailId || '';

        const updateDetailQuery = `
          UPDATE Detail SET 
            genre = ?, 
            releaseDate = ?, 
            seasons = ?, 
            episodesPerSeason = ?, 
            episodeDuration = ?, 
            streamingPlatform = ?, 
            producer = ?, 
            writer = ?,
            director = ?
          WHERE id = ?
        `;

        const detailValues = [
          tvShowContent.detail.genre?.join(', ') || null,
          new Date(tvShowContent.detail.releaseDate).toISOString(),
          tvShowContent.detail.seasons || null,
          JSON.stringify(tvShowContent.detail.episodesPerSeason) || null,
          tvShowContent.detail.episodeDuration || null,
          tvShowContent.detail.streamingPlatform?.join(', ') || null,
          tvShowContent.detail.producer?.join(', ') || null,
          tvShowContent.detail.writer?.join(', ') || null,
          tvShowContent.detail.director?.join(', ') || null,
          detailId,
        ];

        await database.executeSql(updateDetailQuery, detailValues);

        const updateContentQuery = `
          UPDATE TvShows SET 
            title = ?, 
            description = ?, 
            image = ?, 
            rating = ?
          WHERE id = ?
        `;

        const contentValues = [
          tvShowContent.title,
          tvShowContent.description,
          tvShowContent.image || null,
          tvShowContent.rating,
          tvShowContent.id,
        ];

        await database.executeSql(updateContentQuery, contentValues);
        await this.getAllContents();
      } else {
        throw new Error('Tipo de contenido no válido');
      }

      console.log(`Contenido con ID ${content.id} actualizado exitosamente.`);
    } catch (error) {
      console.error('Error al actualizar el contenido:', error);
      throw error;
    }
  }

  async deleteContent(contentId: string): Promise<void> {
    const database = await this.dbService.getDatabase();

    try {
      const detailIds: string[] = [];

      const gameResult = await database.executeSql(
        'SELECT detailId FROM Games WHERE id = ?',
        [contentId]
      );
      if (gameResult.rows.length > 0) {
        detailIds.push(gameResult.rows.item(0).detailId);
      }

      const movieResult = await database.executeSql(
        'SELECT detailId FROM Movies WHERE id = ?',
        [contentId]
      );
      if (movieResult.rows.length > 0) {
        detailIds.push(movieResult.rows.item(0).detailId);
      }

      const tvShowResult = await database.executeSql(
        'SELECT detailId FROM TvShows WHERE id = ?',
        [contentId]
      );
      if (tvShowResult.rows.length > 0) {
        detailIds.push(tvShowResult.rows.item(0).detailId);
      }

      await database.executeSql('DELETE FROM Games WHERE id = ?', [contentId]);
      await database.executeSql('DELETE FROM Movies WHERE id = ?', [contentId]);
      await database.executeSql('DELETE FROM TvShows WHERE id = ?', [
        contentId,
      ]);
      await database.executeSql('DELETE FROM Reviews WHERE contentId = ?', [
        contentId,
      ]);

      for (const id of detailIds) {
        await database.executeSql('DELETE FROM Detail WHERE id = ?', [id]);
      }

      const currentContents = this.contentsSubject.getValue();
      const updatedContents = currentContents.filter(
        (content) => content.id !== contentId
      );
      this.contentsSubject.next(updatedContents);
      await this.getAllContents();
      console.log(`Contenido con ID "${contentId}" eliminado correctamente.`);
    } catch (error) {
      console.error('Error al eliminar el contenido:', error);
      throw error;
    }
  }
}
