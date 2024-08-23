import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  selectedTab: string = 'home';

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }
}
