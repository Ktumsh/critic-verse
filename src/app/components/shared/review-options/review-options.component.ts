import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Review } from 'src/app/types/review';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-review-options',
  templateUrl: './review-options.component.html',
  styleUrls: ['./review-options.component.scss'],
})
export class ReviewOptionsComponent {
  @Input() review!: Review;
  @Input() user!: User;
  @Input() isProfilePage: boolean = false;

  @Output() editReview = new EventEmitter<void>();
  @Output() deleteReview = new EventEmitter<void>();
  @Output() viewProfileReviews = new EventEmitter<void>();

  constructor(private popoverController: PopoverController) {}

  onEditReview() {
    this.popoverController.dismiss({
      action: 'edit',
    });
  }

  onDeleteReview() {
    this.popoverController.dismiss({
      action: 'delete',
    });
  }

  onViewProfileReviews() {
    this.popoverController.dismiss({
      action: 'viewProfileReviews',
    });
  }
}
