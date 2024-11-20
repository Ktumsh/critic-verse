import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginPasswordPage } from './login-password.page';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

describe('LoginPasswordPage', () => {
  let component: LoginPasswordPage;
  let fixture: ComponentFixture<LoginPasswordPage>;
  let mockUserService: any;
  let mockRouter: any;

  beforeEach(waitForAsync(() => {
    mockUserService = {
      verifyPassword: jasmine
        .createSpy()
        .and.returnValue(Promise.resolve(false)),
      getUserByEmail: jasmine.createSpy(),
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      declarations: [LoginPasswordPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: UserService, useValue: mockUserService },
        {
          provide: RegistrationService,
          useValue: { getEmail: () => 'abab@abababa.com' },
        },
        { provide: AuthService, useValue: { login: jasmine.createSpy() } },
        { provide: Router, useValue: mockRouter },
        {
          provide: NavController,
          useValue: { navigateRoot: jasmine.createSpy() },
        },
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

    fixture = TestBed.createComponent(LoginPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Identificar si una contraseña es incorrecta', async () => {
    component.form.controls['password'].setValue('123456');
    await component.submit();
    expect(mockUserService.verifyPassword).toHaveBeenCalledWith(
      'abab@abababa.com',
      '123456'
    );
    expect(
      component.form.controls['password'].hasError('incorrect')
    ).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
