import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { NotificationsService } from 'src/app/services/notifications.service';

class MockAuthService {
  user = {
    id: '1',
    role: 'user',
    email: 'usuario@duocuc.cl',
    username: '_username69',
    password: '12345',
    birthdate: new Date('2003-01-10T12:00:00'),
    createdAt: new Date('2024-08-28T12:00:00'),
  };
  logout = jasmine.createSpy('logout');
}

class MockUserService {
  getUserQuestionByEmail = jasmine
    .createSpy('getUserQuestionByEmail')
    .and.returnValue(Promise.resolve('¿Cuál es tu comida favorita?'));
}

class MockReviewService {
  getReviewsByUserId = jasmine
    .createSpy('getReviewsByUserId')
    .and.returnValue(Promise.resolve([]));
}

class MockNotificationsService {
  getUserNotifications = jasmine
    .createSpy('getUserNotifications')
    .and.returnValue(Promise.resolve([]));
}

class MockModalController {
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
    onDidDismiss: jasmine
      .createSpy('onDidDismiss')
      .and.returnValue(Promise.resolve({})),
  });
  dismiss = jasmine.createSpy('dismiss');
}

class MockAlertController {
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
  });
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: ReviewService, useClass: MockReviewService },
        { provide: NotificationsService, useClass: MockNotificationsService },
        { provide: ModalController, useClass: MockModalController },
        { provide: AlertController, useClass: MockAlertController },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
