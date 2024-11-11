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

  it('inicializar el formulario con el email', () => {
    expect(component.form.contains('email')).toBeTrue();
  });

  it('hacer que el email sea requerido', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('validar correctamente un email válido', () => {
    const control = component.form.get('email');
    control?.setValue('admin@duocuc.cl');
    expect(control?.valid).toBeTrue();
  });

  it('mostrar error cuando el email es inválido', () => {
    const control = component.form.get('email');
    control?.setValue('sjdadjasjd');
    expect(control?.valid).toBeFalse();
  });

  it('no navegar si el email es inválido', async () => {
    component.form.controls.email.setValue('dsjkajdawj');

    await component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
