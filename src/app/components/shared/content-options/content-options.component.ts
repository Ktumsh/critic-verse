import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-content-options',
  templateUrl: './content-options.component.html',
  styleUrls: ['./content-options.component.scss'],
})
export class ContentOptionsComponent {
  constructor(private popoverController: PopoverController) {}

  performAction(action: string) {
    this.popoverController.dismiss({
      action,
    });
  }
}
