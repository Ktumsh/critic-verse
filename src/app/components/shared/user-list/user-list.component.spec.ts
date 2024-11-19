import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  const mockUserService = {
    users$: of([]),
    getAllUsers: jasmine.createSpy('getAllUsers'),
    deleteUserByUsername: jasmine.createSpy('deleteUserByUsername'),
  };

  const mockAuthService = {
    user: { id: 'test-user-id' },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
