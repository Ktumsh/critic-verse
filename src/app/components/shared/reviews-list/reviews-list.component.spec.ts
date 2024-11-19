import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReviewsListComponent } from './reviews-list.component';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ContentService } from 'src/app/services/content.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('ReviewsListComponent', () => {
  let component: ReviewsListComponent;
  let fixture: ComponentFixture<ReviewsListComponent>;

  const mockReviewService = jasmine.createSpyObj('ReviewService', [
    'getTotalReviewsByContentType',
    'getReviewsWithContentType',
    'deleteReviewById',
  ]);
  const mockUserService = jasmine.createSpyObj('UserService', [
    'getUsersByIds',
  ]);
  const mockNotificationsService = jasmine.createSpyObj(
    'NotificationsService',
    ['sendNotificationToUser']
  );
  const mockContentService = jasmine.createSpyObj('ContentService', [
    'getGameById',
    'getMovieById',
    'getTvShowById',
  ]);
  const mockNativeStorage = jasmine.createSpyObj('NativeStorage', [
    'getItem',
    'setItem',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsListComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ReviewService, useValue: mockReviewService },
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationsService, useValue: mockNotificationsService },
        { provide: ContentService, useValue: mockContentService },
        { provide: NativeStorage, useValue: mockNativeStorage },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
