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

  it('Ir a la página de contraseña si el formulario es valido', async () => {
    component.form.controls['username'].setValue('usuario123');
    await component.submit();

    expect(mockUserService.usernameExists).toHaveBeenCalledWith('usuario123');
    expect(mockRegistrationService.setUsername).toHaveBeenCalledWith(
      'usuario123'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/signup/signup-password',
    ]);
  });
});
