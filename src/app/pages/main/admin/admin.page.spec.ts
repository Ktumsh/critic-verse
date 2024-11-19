import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

class MockLocation {
  back = jasmine.createSpy('back');
}

class MockModalController {
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
    onDidDismiss: jasmine
      .createSpy('onDidDismiss')
      .and.returnValue(Promise.resolve()),
  });
}

class MockReviewService {
  reviews$ = of([]);
  getAllReviews = jasmine
    .createSpy('getAllReviews')
    .and.returnValue(Promise.resolve([]));
}

class MockUserService {
  users$ = of([]);
  getAllUsers = jasmine
    .createSpy('getAllUsers')
    .and.returnValue(Promise.resolve([]));
}

class MockNativeStorage {
  getItem = jasmine.createSpy('getItem').and.returnValue(Promise.resolve([]));
}

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPage],
      providers: [
        { provide: Location, useClass: MockLocation },
        { provide: ModalController, useClass: MockModalController },
        { provide: ReviewService, useClass: MockReviewService },
        { provide: UserService, useClass: MockUserService },
        { provide: NativeStorage, useClass: MockNativeStorage },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
