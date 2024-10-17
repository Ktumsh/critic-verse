import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { generateUUID } from 'src/utils/common';
import { Report } from '../types/report';

interface DetailedReport extends Report {
  source: string;
  contentTitle: string;
  reviewComment: string;
  reportedUserId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private dbService: DbService) {}

  async insertReport(
    reason: string,
    reportedBy: string,
    reviewId: string
  ): Promise<void> {
    const database = await this.dbService.getDatabase();

    const checkReportQuery = `
      SELECT COUNT(*) as count 
      FROM Reports 
      WHERE reportedBy = ? AND reviewId = ?
    `;
    const checkResult = await database.executeSql(checkReportQuery, [
      reportedBy,
      reviewId,
    ]);

    const reportExists = checkResult.rows.item(0).count > 0;

    if (reportExists) {
      throw new Error('Este usuario ya ha reportado esta reseña.');
    }

    const reportId = generateUUID();
    const reportInsert = `
      INSERT INTO Reports (id, reason, date, reportedBy, reviewId)
      VALUES (?, ?, datetime('now'), ?, ?)
    `;
    const reportValues = [reportId, reason, reportedBy, reviewId];
    await database.executeSql(reportInsert, reportValues);
    console.log(`Reporte con ID "${reportId}" agregado correctamente.`);
  }

  async deleteReportById(reportId: string): Promise<void> {
    const database = await this.dbService.getDatabase();
    const deleteQuery = `DELETE FROM Reports WHERE id = ?`;
    await database.executeSql(deleteQuery, [reportId]);
    console.log(`Reporte con ID "${reportId}" eliminado correctamente.`);
  }

  async getAllReports(): Promise<Report[]> {
    const database = await this.dbService.getDatabase();
    const reports: Report[] = [];
    const query = `SELECT * FROM Reports`;
    const result = await database.executeSql(query, []);

    for (let i = 0; i < result.rows.length; i++) {
      const report = result.rows.item(i);
      reports.push({
        id: report.id,
        reason: report.reason,
        date: new Date(report.date),
        reportedBy: report.reportedBy,
        reviewId: report.reviewId,
      });
    }

    console.log(`Reportes obtenidos correctamente:`, reports);
    return reports;
  }

  async getReportsByContent(
    contentType: string | null,
    limit: number,
    offset: number
  ): Promise<DetailedReport[]> {
    const database = await this.dbService.getDatabase();
    const reports: DetailedReport[] = [];

    let query = `
      SELECT rep.*, rev.comment as reviewComment, rev.userId as reportedUserId,
        CASE 
          WHEN g.id IS NOT NULL THEN 'juegos' 
          WHEN m.id IS NOT NULL THEN 'peliculas' 
          WHEN tv.id IS NOT NULL THEN 'tv shows' 
          ELSE NULL 
        END AS source,
        COALESCE(g.title, m.title, tv.title) AS contentTitle
      FROM Reports rep
      JOIN Reviews rev ON rep.reviewId = rev.id
      LEFT JOIN Games g ON rev.contentId = g.id
      LEFT JOIN Movies m ON rev.contentId = m.id
      LEFT JOIN TvShows tv ON rev.contentId = tv.id
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
      reports.push({
        id: row.id,
        reason: row.reason,
        date: new Date(row.date),
        reportedBy: row.reportedBy,
        reviewId: row.reviewId,
        source: row.source,
        contentTitle: row.contentTitle,
        reviewComment: row.reviewComment,
        reportedUserId: row.reportedUserId,
      });
    }

    return reports;
  }

  async getTotalReports(): Promise<number> {
    const database = await this.dbService.getDatabase();
    const query = `SELECT COUNT(*) as total FROM Reports`;
    const result = await database.executeSql(query, []);
    const total = result.rows.item(0).total;
    return total;
  }

  async getTotalReportsByContent(contentType: string | null): Promise<number> {
    const database = await this.dbService.getDatabase();
    let query = `
      SELECT COUNT(*) as total
      FROM Reports rep
      JOIN Reviews rev ON rep.reviewId = rev.id
      LEFT JOIN Games g ON rev.contentId = g.id
      LEFT JOIN Movies m ON rev.contentId = m.id
      LEFT JOIN TvShows tv ON rev.contentId = tv.id
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

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    const result = await database.executeSql(query, params);
    const total = result.rows.item(0).total;
    return total;
  }
}
