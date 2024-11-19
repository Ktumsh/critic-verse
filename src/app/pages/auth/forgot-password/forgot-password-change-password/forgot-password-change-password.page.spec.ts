import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ForgotPasswordChangePasswordPage } from './forgot-password-change-password.page';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

describe('ForgotPasswordChangePasswordPage', () => {
  let component: ForgotPasswordChangePasswordPage;
  let fixture: ComponentFixture<ForgotPasswordChangePasswordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordChangePasswordPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        {
          provide: UserService,
          useValue: { updatePassword: jasmine.createSpy() },
        },
        {
          provide: RegistrationService,
          useValue: { getEmail: () => 'test@example.com' },
        },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
        {
          provide: ToastController,
          useValue: {
            create: jasmine
              .createSpy()
              .and.returnValue(
                Promise.resolve({ present: jasmine.createSpy() })
              ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
