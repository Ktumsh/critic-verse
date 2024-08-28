import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: User | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'] as User;
    }

    if (!this.user) {
      this.router.navigate(['/auth']);
    }
  }

  ngOnInit() {
    if (this.user) {
      console.log('Usuario recibido en main:', this.user);
    }
  }
}
