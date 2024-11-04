import { Injectable } from '@angular/core';
import { generateUUID } from 'src/utils/common';
import { Review } from '../types/review';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  reviews$ = this.reviewsSubject.asObservable();

  constructor(private dbService: DbService) {}

  //Intertar una reseña
  async insertReview(
    contentId: string,
    userId: string,
    rating: number,
    comment: string,
    containsSpoilers: boolean = false
  ): Promise<void> {
    const database = await this.dbService.getDatabase();
    const reviewId = generateUUID();
    const reviewInsert = `
      INSERT INTO Reviews (id, rating, comment, date, containsSpoilers, userId, contentId, reportId)
      VALUES (?, ?, ?, datetime('now'), ?, ?, ?, ?)
    `;
    const reviewValues = [
      reviewId,
      rating,
      comment,
      containsSpoilers ? 1 : 0,
      userId,
      contentId,
      null,
    ];
    await database.executeSql(reviewInsert, reviewValues);
    this.getAllReviews();
  }

  //Actualizar una reseña
  async updateReview(
    reviewId: string,
    rating: number,
    comment: string,
    containsSpoilers: boolean
  ): Promise<void> {
    const database = await this.dbService.getDatabase();
    const query = `
      UPDATE Reviews
      SET rating = ?, comment = ?, containsSpoilers = ?
      WHERE id = ?
    `;
    const values = [rating, comment, containsSpoilers ? 1 : 0, reviewId];
    await database.executeSql(query, values);
    this.getAllReviews();
    console.log(`Reseña con ID "${reviewId}" actualizada correctamente.`);
  }

  //Eliminar una reseña
  async deleteReviewById(reviewId: string): Promise<void> {
    const database = await this.dbService.getDatabase();
    const deleteQuery = `DELETE FROM Reviews WHERE id = ?`;
    await database.executeSql(deleteQuery, [reviewId]);
    this.getAllReviews();
    console.log(`Reseña con ID "${reviewId}" eliminada correctamente.`);
  }

  //Obtener reseñas por contentId
  async getReviewsByContentId(contentId: string): Promise<Review[]> {
    const database = await this.dbService.getDatabase();
    const reviews: Review[] = [];
    const query = `
      SELECT id, rating, comment, date, containsSpoilers, userId 
      FROM Reviews 
      WHERE contentId = ?
    `;
    const result = await database.executeSql(query, [contentId]);

    for (let i = 0; i < result.rows.length; i++) {
      const review = result.rows.item(i);
      reviews.push({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.date),
        containsSpoilers: review.containsSpoilers === 1,
        userId: review.userId,
      });
    }

    console.log(
      `Reseñas obtenidas correctamente para el contenido con ID "${contentId}":`,
      reviews
    );
    return reviews;
  }

  //Verificar si existe una reseña con el mismo contentId y userId y comment
  async getExistingReview(
    contentId: string,
    userId: string,
    comment: string
  ): Promise<Review | null> {
    const database = await this.dbService.getDatabase();
    const query = `
      SELECT id, rating, comment, date, containsSpoilers, userId 
      FROM Reviews 
      WHERE contentId = ? AND userId = ? AND comment = ?
    `;
    const result = await database.executeSql(query, [
      contentId,
      userId,
      comment,
    ]);
    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  //Obtener reseñas por userId
  async getReviewsByUserId(userId: string): Promise<Review[]> {
    const database = await this.dbService.getDatabase();
    const reviews: Review[] = [];
    const query = `
      SELECT * 
      FROM Reviews 
      WHERE userId = ?
    `;
    const result = await database.executeSql(query, [userId]);

    for (let i = 0; i < result.rows.length; i++) {
      const review = result.rows.item(i);
      reviews.push({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.date),
        containsSpoilers: review.containsSpoilers === 1,
        userId: review.userId,
        contentId: review.contentId,
      });
    }

    return reviews;
  }

  //Obtener todas las reseñas
  async getAllReviews(): Promise<Review[]> {
    const database = await this.dbService.getDatabase();
    const reviews: Review[] = [];
    const query = `
      SELECT id, rating, comment, date, containsSpoilers, userId, contentId 
      FROM Reviews
    `;
    const result = await database.executeSql(query, []);

    for (let i = 0; i < result.rows.length; i++) {
      const review = result.rows.item(i);
      reviews.push({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.date),
        containsSpoilers: review.containsSpoilers === 1,
        userId: review.userId,
        contentId: review.contentId,
      });
    }
    this.reviewsSubject.next(reviews);
    console.log('Todas las reseñas obtenidas correctamente:', reviews);
    return reviews;
  }

  async getReviewsWithContentType(
    contentType: string | null,
    limit: number,
    offset: number
  ): Promise<Review[]> {
    const database = await this.dbService.getDatabase();
    const reviews: Review[] = [];

    let query = `
      SELECT r.*, 
        CASE 
          WHEN g.id IS NOT NULL THEN 'game' 
          WHEN m.id IS NOT NULL THEN 'movie' 
          WHEN tv.id IS NOT NULL THEN 'tv' 
          ELSE NULL 
        END AS contentType
      FROM Reviews r
      LEFT JOIN Games g ON r.contentId = g.id
      LEFT JOIN Movies m ON r.contentId = m.id
      LEFT JOIN TvShows tv ON r.contentId = tv.id
    `;

    const params: any[] = [];

    if (contentType) {
      query += ' WHERE ';
      switch (contentType) {
        case 'game':
          query += 'g.id IS NOT NULL';
          break;
        case 'movie':
          query += 'm.id IS NOT NULL';
          break;
        case 'tv':
          query += 'tv.id IS NOT NULL';
          break;
      }
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const result = await database.executeSql(query, params);

    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      reviews.push({
        id: row.id,
        rating: row.rating,
        comment: row.comment,
        date: new Date(row.date),
        containsSpoilers: row.containsSpoilers === 1,
        userId: row.userId,
        contentId: row.contentId,
        contentType: row.contentType,
      });
    }

    return reviews;
  }

  async getTotalReviewsByContentType(
    contentType: string | null,
    excludeReviewIds: string[] = []
  ): Promise<number> {
    const database = await this.dbService.getDatabase();
    let query = `
      SELECT COUNT(*) as total
      FROM Reviews r
      LEFT JOIN Games g ON r.contentId = g.id
      LEFT JOIN Movies m ON r.contentId = m.id
      LEFT JOIN TvShows tv ON r.contentId = tv.id
    `;

    const params: any[] = [];
    const whereClauses: string[] = [];

    if (contentType) {
      switch (contentType) {
        case 'game':
          whereClauses.push('g.id IS NOT NULL');
          break;
        case 'movie':
          whereClauses.push('m.id IS NOT NULL');
          break;
        case 'tv':
          whereClauses.push('tv.id IS NOT NULL');
          break;
      }
    }

    if (excludeReviewIds.length > 0) {
      const placeholders = excludeReviewIds.map(() => '?').join(',');
      whereClauses.push(`r.id NOT IN (${placeholders})`);
      params.push(...excludeReviewIds);
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    const result = await database.executeSql(query, params);
    const total = result.rows.item(0).total;
    return total;
  }
}
