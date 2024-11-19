import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SignupPasswordPage } from './signup-password.page';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

describe('SignupPasswordPage', () => {
  let component: SignupPasswordPage;
  let fixture: ComponentFixture<SignupPasswordPage>;
  let mockRegistrationService: any;
  let mockUserService: any;

  beforeEach(waitForAsync(() => {
    mockRegistrationService = {
      setPassword: jasmine.createSpy(),
      getUserData: jasmine.createSpy().and.returnValue({
        email: 'test@example.com',
        username: 'testuser',
        password: 'Test@123',
        birthdate: new Date('2000-01-01'),
      }),
      clearData: jasmine.createSpy(),
    };

    mockUserService = {
      createUser: jasmine.createSpy().and.returnValue(Promise.resolve()),
      getUserByEmail: jasmine
        .createSpy()
        .and.returnValue(
          Promise.resolve({ id: '1', email: 'test@example.com' })
        ),
    };

    TestBed.configureTestingModule({
      declarations: [SignupPasswordPage],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: RegistrationService, useValue: mockRegistrationService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: { login: jasmine.createSpy() } },
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

    fixture = TestBed.createComponent(SignupPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería manejar errores si el formulario no es valido', async () => {
    component.form.controls['password'].setValue('');
    await component.submit();

    expect(mockRegistrationService.setPassword).not.toHaveBeenCalled();
    expect(mockUserService.createUser).not.toHaveBeenCalled();

    const mockRouter = TestBed.inject(Router);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
