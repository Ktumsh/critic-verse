import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  IonicModule,
  ModalController,
  ToastController,
  ActionSheetController,
} from '@ionic/angular';
import { EditProfileComponent } from './edit-profile.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'updateCurrentUser',
  ]);
  const mockUserService = jasmine.createSpyObj('UserService', [
    'usernameExists',
    'updateUser',
    'getUserByEmail',
  ]);
  const mockToastController = jasmine.createSpyObj('ToastController', [
    'create',
  ]);
  const mockActionSheetController = jasmine.createSpyObj(
    'ActionSheetController',
    ['create']
  );
  const mockModalController = jasmine.createSpyObj('ModalController', [
    'dismiss',
  ]);

  const mockUser = {
    id: '123',
    email: 'test@example.com',
    username: 'testuser',
    profileImage: 'path/to/image.png',
    birthdate: new Date('2000-01-01'),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: ToastController, useValue: mockToastController },
        { provide: ActionSheetController, useValue: mockActionSheetController },
        { provide: ModalController, useValue: mockModalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;

    component.user = mockUser as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
