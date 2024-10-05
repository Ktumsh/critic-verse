import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-admin-float-btn',
  templateUrl: './admin-float-btn.component.html',
  styleUrls: ['./admin-float-btn.component.scss'],
})
export class AdminFloatBtnComponent {
  user!: User | undefined;
  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  isAdmin() {
    return this.user?.role === 'admin';
  }
}
