import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReportsListComponent } from './reports-list.component';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';

describe('ReportsListComponent', () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;

  const mockReportService = jasmine.createSpyObj('ReportService', [
    'getTotalReports',
    'getTotalReportsByContent',
    'getReportsByContent',
    'deleteReportById',
  ]);
  const mockUserService = jasmine.createSpyObj('UserService', [
    'getUsersByIds',
    'getUserById',
  ]);
  const mockNotificationsService = jasmine.createSpyObj(
    'NotificationsService',
    ['sendNotificationToUser']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsListComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ReportService, useValue: mockReportService },
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsListComponent);
    component = fixture.componentInstance;

    mockReportService.getTotalReports.and.returnValue(Promise.resolve(100));
    mockReportService.getTotalReportsByContent.and.returnValue(
      Promise.resolve(50)
    );
    mockReportService.getReportsByContent.and.returnValue(
      Promise.resolve([
        {
          id: '1',
          source: 'game',
          reportedBy: 'user1',
          contentTitle: 'Game Title',
          reviewComment: 'Inappropriate comment',
          reportedUserId: 'user2',
        },
      ])
    );
    mockUserService.getUsersByIds.and.returnValue(
      Promise.resolve([
        { id: 'user1', username: 'Reporter', profileImage: 'image1.jpg' },
        { id: 'user2', username: 'Reported', profileImage: 'image2.jpg' },
      ])
    );

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
