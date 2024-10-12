import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private dbService: DbService, private authService: AuthService) {
    this.initializeLocalNotifications();
  }

  initializeLocalNotifications() {
    LocalNotifications.requestPermissions().then((result) => {
      if (result.display === 'granted') {
        console.log('Permisos para notificaciones locales concedidos.');
      }
    });
  }

  async sendNotificationToAdmin(
    contentId: string,
    contentTitle: string,
    adminId: string
  ) {
    const notificationId = Math.floor(Math.random() * 2147483647);

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Nueva reseña publicada',
          body: `Un usuario ha publicado una nueva reseña de "${contentTitle} para su revisión".`,
          id: notificationId,
          schedule: { at: new Date(Date.now() + 1000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: { contentId, adminId },
        },
      ],
    });
  }

  async sendNotificationToUser(userId: string, title: string, body: string) {
    const notificationId = Math.floor(Math.random() * 2147483647);

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: notificationId,
          schedule: { at: new Date(Date.now() + 1000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: { userId },
        },
      ],
    });

    await this.saveNotification({
      id: notificationId.toString(),
      title,
      body,
      userId,
    });
  }

  async notifyAdmins() {
    if (!this.authService.isLoggedIn) {
      console.log('El usuario no está autenticado.');
      return;
    }

    const user = this.authService.user;
    if (user?.role !== 'admin') {
      console.log('El usuario no es admin, no se enviarán notificaciones.');
      return;
    }

    const database = await this.dbService.getDatabase();

    const reviewsQuery = `
      SELECT r.contentId, COALESCE(m.title, g.title, tv.title) AS contentTitle, r.id AS reviewId
      FROM Reviews r
      LEFT JOIN Movies m ON r.contentId = m.id
      LEFT JOIN Games g ON r.contentId = g.id
      LEFT JOIN TvShows tv ON r.contentId = tv.id
      WHERE datetime('now', '-5 minute') <= r.date
      AND r.id NOT IN (SELECT id FROM Notifications WHERE userId = ?)
      LIMIT 10
    `;

    const reviewsResult = await database.executeSql(reviewsQuery, [user.id]);

    if (reviewsResult.rows.length > 0) {
      const adminQuery = `SELECT id FROM Users WHERE role = 'admin'`;
      const adminResult = await database.executeSql(adminQuery, []);

      if (adminResult.rows.length > 0) {
        for (let i = 0; i < reviewsResult.rows.length; i++) {
          const contentId = reviewsResult.rows.item(i).contentId;
          const contentTitle =
            reviewsResult.rows.item(i).contentTitle || 'Contenido desconocido';
          const reviewId = reviewsResult.rows.item(i).reviewId;

          for (let j = 0; j < adminResult.rows.length; j++) {
            const adminId = adminResult.rows.item(j).id;

            await this.sendNotificationToAdmin(
              contentId,
              contentTitle,
              adminId
            );

            await this.saveNotification({
              id: reviewId,
              title: 'Nueva reseña publicada',
              body: `Un usuario ha publicado una nueva reseña de "${contentTitle}" para su revisión.`,
              userId: adminId,
              contentId: contentId,
            });
          }
        }
      }
    }
  }

  async saveNotification(notification: {
    id: string;
    title: string;
    body: string;
    userId: string;
    contentId?: string;
  }): Promise<void> {
    const database = await this.dbService.getDatabase();

    const countQuery =
      'SELECT COUNT(*) AS count FROM Notifications WHERE userId = ?';
    const countResult = await database.executeSql(countQuery, [
      notification.userId,
    ]);
    const notificationCount = countResult.rows.item(0).count;

    if (notificationCount >= 10) {
      console.log(
        `El usuario con ID ${notification.userId} ya tiene 10 notificaciones, no se agregará otra.`
      );
      return;
    }

    const insertQuery = `
      INSERT INTO Notifications (id, title, body, receivedAt, userId, contentId)
      VALUES (?, ?, ?, datetime('now'), ?, ?)
    `;
    const values = [
      notification.id,
      notification.title,
      notification.body,
      notification.userId,
      notification.contentId,
    ];
    await database.executeSql(insertQuery, values);
    console.log('Notificación guardada en la base de datos:', notification);
  }

  async getUserNotifications(userId: string): Promise<any[]> {
    const database = await this.dbService.getDatabase();
    const notifications: any[] = [];

    const query = `
    SELECT n.id, n.title, n.body, n.receivedAt, 
           COALESCE(m.image, g.image, tv.image) AS imageUrl
    FROM Notifications n
    LEFT JOIN Movies m ON n.contentId = m.id
    LEFT JOIN Games g ON n.contentId = g.id
    LEFT JOIN TvShows tv ON n.contentId = tv.id
    WHERE n.userId = ?
    ORDER BY n.receivedAt DESC
  `;

    const result = await database.executeSql(query, [userId]);

    for (let i = 0; i < result.rows.length; i++) {
      notifications.push(result.rows.item(i));
    }

    return notifications;
  }

  async deleteAllNotifications() {
    const database = await this.dbService.getDatabase();

    const deleteQuery = `
      DELETE FROM Notifications 
    `;

    await database.executeSql(deleteQuery);
    console.log('Notificaciones antiguas eliminadas.');
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const database = await this.dbService.getDatabase();
    const deleteQuery = 'DELETE FROM Notifications WHERE id = ?';
    await database.executeSql(deleteQuery, [notificationId]);
    console.log(
      `Notificación con ID ${notificationId} eliminada de la base de datos.`
    );
  }
}
