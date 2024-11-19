import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { Router } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let registrationServiceSpy: jasmine.SpyObj<RegistrationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['emailExists']);
    registrationServiceSpy = jasmine.createSpyObj('RegistrationService', [
      'setEmail',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: RegistrationService, useValue: registrationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar correctamente un email valido', () => {
    const control = component.form.get('email');
    control?.setValue('admin@duocuc.cl');
    expect(control?.valid).toBeTrue();
  });
});
