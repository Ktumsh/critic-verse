import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { generateUUID } from 'src/utils/common';
import { Report } from '../types/report';

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
    const reportId = generateUUID();
    const reportInsert = `
      INSERT INTO Reports (id, reason, date, reportedBy, reviewId)
      VALUES (?, ?, datetime('now'), ?, ?)
    `;
    const reportValues = [reportId, reason, reportedBy, reviewId];
    await database.executeSql(reportInsert, reportValues);
    console.log(`Reporte con ID "${reportId}" agregado correctamente.`);
  }

  // Actualizar un reporte
  async updateReport(
    reportId: string,
    reason: string,
    reportedBy: string
  ): Promise<void> {
    const database = await this.dbService.getDatabase();
    const query = `
      UPDATE Reports
      SET reason = ?, reportedBy = ?
      WHERE id = ?
    `;
    const values = [reason, reportedBy, reportId];
    await database.executeSql(query, values);
    console.log(`Reporte con ID "${reportId}" actualizado correctamente.`);
  }

  // Eliminar un reporte por ID
  async deleteReportById(reportId: string): Promise<void> {
    const database = await this.dbService.getDatabase();
    const deleteQuery = `DELETE FROM Reports WHERE id = ?`;
    await database.executeSql(deleteQuery, [reportId]);
    console.log(`Reporte con ID "${reportId}" eliminado correctamente.`);
  }

  // Obtener todos los reportes
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

  // Obtener reportes por ID de reseña (reviewId)
  async getReportsByReviewId(reviewId: string): Promise<Report[]> {
    const database = await this.dbService.getDatabase();
    const reports: Report[] = [];
    const query = `SELECT * FROM Reports WHERE reviewId = ?`;
    const result = await database.executeSql(query, [reviewId]);

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

    console.log(
      `Reportes obtenidos para la reseña con ID "${reviewId}":`,
      reports
    );
    return reports;
  }

  // Obtener reportes por usuario que reportó (reportedBy)
  async getReportsByUser(reportedBy: string): Promise<Report[]> {
    const database = await this.dbService.getDatabase();
    const reports: Report[] = [];
    const query = `SELECT * FROM Reports WHERE reportedBy = ?`;
    const result = await database.executeSql(query, [reportedBy]);

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

    console.log(`Reportes obtenidos para el usuario "${reportedBy}":`, reports);
    return reports;
  }
}
