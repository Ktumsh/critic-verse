import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() routerLink?: string | any[];
  @Input() label?: string;
  @Input() icon?: string;
  @Input() iconSrc?: string;
  @Input() iconSlot: string = 'start';
  @Input() iconClass: string = '';
  @Input() buttonClass: string = '';
  @Input() type: string = 'submit';
  @Input() disabled: boolean = false;
  @Input() action?: () => void;

  executeAction() {
    if (this.action) {
      this.action();
    }
  }
}
