import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SignupUsernamePage } from './signup-username.page';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

describe('SignupUsernamePage', () => {
  let component: SignupUsernamePage;
  let fixture: ComponentFixture<SignupUsernamePage>;
  let mockRegistrationService: any;
  let mockUserService: any;
  let mockRouter: any;

  beforeEach(waitForAsync(() => {
    mockRegistrationService = {
      setUsername: jasmine.createSpy('setUsername'),
    };

    mockUserService = {
      usernameExists: jasmine
        .createSpy('usernameExists')
        .and.returnValue(Promise.resolve(false)),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [SignupUsernamePage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: RegistrationService, useValue: mockRegistrationService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupUsernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería navegar a la página de contraseña si el formulario es válido', async () => {
    component.form.controls['username'].setValue('ValidUsername');
    await component.submit();

    expect(mockUserService.usernameExists).toHaveBeenCalledWith(
      'ValidUsername'
    );
    expect(mockRegistrationService.setUsername).toHaveBeenCalledWith(
      'ValidUsername'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/signup/signup-password',
    ]);
  });
});
