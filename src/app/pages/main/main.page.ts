import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: User | undefined;

  constructor(private notificationsService: NotificationsService) {}

  async ngOnInit() {
    await this.notificationsService.notifyAdmins();
    await this.notificationsService.cleanOldNotifications();
  }
}
