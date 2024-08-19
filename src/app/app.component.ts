import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedTab: string = 'home';

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }

  pageTitle: string = 'CriticVerse';
  isHome: boolean = true;
  showSettings: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderContent(event.urlAfterRedirects);
      }
    });
  }

  updateHeaderContent(url: string) {
    if (url === '/home') {
      this.pageTitle = 'Inicio';
      this.isHome = true;
    } else {
      this.pageTitle = this.getPageTitle(url);
      this.isHome = false;
    }
  }

  getPageTitle(url: string): string {
    switch (url) {
      case '/game':
        return 'Juegos';
      case '/movie':
        return 'Películas';
      case '/tv':
        return 'Shows';
      default:
        return 'Mi Aplicación';
    }
  }
}
