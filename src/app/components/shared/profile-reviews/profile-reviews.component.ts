import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss'],
})
export class ProfileReviewsComponent implements OnInit {
  @Input() user!: User;
  selectedSegment: string = 'games';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
