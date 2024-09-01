import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() logo: boolean = true;
  @Input() backButton?: string | (() => void);
  @Input() headerClass?: string;

  constructor(private router: Router) {}

  onBackButtonClick() {
    if (typeof this.backButton === 'function') {
      this.backButton();
    } else if (typeof this.backButton === 'string') {
      this.router.navigate([this.backButton]);
    }
  }

  shouldShowBackButton(): boolean {
    return this.backButton !== undefined;
  }
}
