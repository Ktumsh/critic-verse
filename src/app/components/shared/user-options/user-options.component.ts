import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss'],
})
export class UserOptionsComponent {
  constructor(private popoverController: PopoverController) {}

  performAction(action: string) {
    this.popoverController.dismiss({
      action,
    });
  }
}
