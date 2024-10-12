import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';
import { User } from 'src/app/types/user';
import { formatRelativeTime } from 'src/utils/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @Input() user!: User;
  notifications: any[] = [];
  loading = true; // Estado de carga

  constructor(
    private modalController: ModalController,
    private notificationsService: NotificationsService
  ) {}

  async ngOnInit() {
    await this.loadNotifications();
  }

  async loadNotifications() {
    this.loading = true;

    await this.notificationsService
      .getUserNotifications(this.user.id)
      .then((notifications) => {
        this.notifications = notifications.map((notification) => ({
          ...notification,
          relativeTime: this.formatTime(notification.receivedAt),
        }));
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  formatTime(date: string | Date): string {
    return formatRelativeTime(date);
  }

  async deleteNotification(notificationId: string) {
    const index = this.notifications.findIndex((n) => n.id === notificationId);
    if (index !== -1) {
      this.notifications[index].deleting = true;

      setTimeout(async () => {
        await this.notificationsService.deleteNotification(notificationId);
        await this.loadNotifications();
      }, 300);
    }
  }

  onDrag(event: any, notificationId: string) {
    const slidingItem = event.target;

    slidingItem.getSlidingRatio().then((ratio: number) => {
      if (Math.abs(ratio) > 3.5) {
        this.deleteNotification(notificationId);
        slidingItem.close();
      }
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
