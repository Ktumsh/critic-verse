import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { SignupSecurityQuestionPage } from './signup-security-question.page';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

describe('SignupSecurityQuestionPage', () => {
  let component: SignupSecurityQuestionPage;
  let fixture: ComponentFixture<SignupSecurityQuestionPage>;
  let mockUserService: any;
  let mockAuthService: any;
  let mockRouter: any;
  let mockToastController: any;

  beforeEach(waitForAsync(() => {
    mockUserService = {
      saveSecurityQuestion: jasmine
        .createSpy()
        .and.returnValue(Promise.resolve()),
    };

    mockAuthService = {
      user: { id: '123', username: 'testuser' },
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    mockToastController = {
      create: jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ present: jasmine.createSpy() })),
    };

    TestBed.configureTestingModule({
      declarations: [SignupSecurityQuestionPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupSecurityQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Guardar la pregunta de seguridad si el formulario es valido', async () => {
    component.form.controls['securityQuestion'].setValue(
      '¿Cuál es tu comida favorita?'
    );
    component.form.controls['securityAnswer'].setValue('Pizza');
    await component.submit();

    expect(mockUserService.saveSecurityQuestion).toHaveBeenCalledWith(
      '123',
      '¿Cuál es tu comida favorita?',
      'Pizza'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/main']);
  });
});
