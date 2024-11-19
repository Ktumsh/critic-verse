import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from 'src/app/services/notifications.service';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  const mockNotificationsService = jasmine.createSpyObj(
    'NotificationsService',
    ['getUserNotifications', 'deleteNotification']
  );

  const mockModalController = jasmine.createSpyObj('ModalController', [
    'dismiss',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: NotificationsService, useValue: mockNotificationsService },
        { provide: ModalController, useValue: mockModalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;

    component.user = { id: 'test-user' } as any;

    mockNotificationsService.getUserNotifications.and.returnValue(
      Promise.resolve([
        { id: '1', receivedAt: new Date(), message: 'Test Notification' },
      ])
    );
    mockNotificationsService.deleteNotification.and.returnValue(
      Promise.resolve()
    );

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
