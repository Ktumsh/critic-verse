import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AlertController,
  IonicModule,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { ProfileReviewsComponent } from './profile-reviews.component';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';

describe('ProfileReviewsComponent', () => {
  let component: ProfileReviewsComponent;
  let fixture: ComponentFixture<ProfileReviewsComponent>;

  const mockReviewService = jasmine.createSpyObj('ReviewService', [
    'getReviewsByUserId',
    'deleteReviewById',
  ]);
  const mockContentService = jasmine.createSpyObj('ContentService', [
    'getGameById',
    'getMovieById',
    'getTvShowById',
  ]);
  const mockModalController = jasmine.createSpyObj('ModalController', [
    'dismiss',
    'create',
  ]);
  const mockPopoverController = jasmine.createSpyObj('PopoverController', [
    'create',
  ]);
  const mockToastController = jasmine.createSpyObj('ToastController', [
    'create',
  ]);
  const mockAlertController = jasmine.createSpyObj('AlertController', [
    'create',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileReviewsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ReviewService, useValue: mockReviewService },
        { provide: ContentService, useValue: mockContentService },
        { provide: ModalController, useValue: mockModalController },
        { provide: PopoverController, useValue: mockPopoverController },
        { provide: ToastController, useValue: mockToastController },
        { provide: AlertController, useValue: mockAlertController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileReviewsComponent);
    component = fixture.componentInstance;
    component.user = { id: 'test-user' } as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
