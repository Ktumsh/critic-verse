import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPage } from './main.page';
import { NotificationsService } from 'src/app/services/notifications.service';

class MockNotificationsService {
  notifyAdmins = jasmine
    .createSpy('notifyAdmins')
    .and.returnValue(Promise.resolve());
  cleanOldNotifications = jasmine
    .createSpy('cleanOldNotifications')
    .and.returnValue(Promise.resolve());
}

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPage],
      providers: [
        { provide: NotificationsService, useClass: MockNotificationsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
