import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReviewsComponent } from './reviews.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { ReportService } from 'src/app/services/report.service';
import { NotificationsService } from 'src/app/services/notifications.service';

describe('ReviewComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', [
    'getUsersByIds',
    'getUserById',
  ]);
  const mockAuthService = {
    user: { id: 'user123', username: 'testuser', profileImage: '' },
  };
  const mockReviewService = jasmine.createSpyObj('ReviewService', [
    'deleteReviewById',
  ]);
  const mockReportService = jasmine.createSpyObj('ReportService', [
    'insertReport',
  ]);
  const mockNotificationsService = jasmine.createSpyObj(
    'NotificationsService',
    ['sendNotificationToUser']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ReviewService, useValue: mockReviewService },
        { provide: ReportService, useValue: mockReportService },
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;

    component.item = {
      reviews: [
        {
          id: 'review1',
          userId: 'user123',
          comment: 'Great movie!',
        },
      ],
      title: 'Test Item',
    } as any;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
