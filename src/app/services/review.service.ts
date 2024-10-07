import { Injectable } from '@angular/core';
import { generateUUID } from 'src/utils/common';
import { Review } from '../types/review';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
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
    console.log(
      `Reseña agregada correctamente para el contenido con ID "${contentId}".`
    );
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
    console.log(`Reseña con ID "${reviewId}" actualizada correctamente.`);
  }

  //Eliminar una reseña
  async deleteReviewById(reviewId: string): Promise<void> {
    const database = await this.dbService.getDatabase();
    const deleteQuery = `DELETE FROM Reviews WHERE id = ?`;
    await database.executeSql(deleteQuery, [reviewId]);
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
}
