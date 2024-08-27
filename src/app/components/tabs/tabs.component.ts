import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() user: User | undefined;
  selectedTab: string = 'home';

  constructor(private router: Router) {}

  tabChanged(event: any) {
    this.selectedTab = event.tab;

    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
      },
    };

    this.router.navigate([`/main/${event.tab}`], navigationExtras);
  }
}
