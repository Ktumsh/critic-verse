import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ForgotPasswordAnswerPage } from './forgot-password-answer.page';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

describe('ForgotPasswordAnswerPage', () => {
  let component: ForgotPasswordAnswerPage;
  let fixture: ComponentFixture<ForgotPasswordAnswerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordAnswerPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: UserService, useValue: {} },
        {
          provide: RegistrationService,
          useValue: { getEmail: () => 'test@example.com' },
        },
        { provide: Router, useValue: { navigate: () => {} } },
        {
          provide: ToastController,
          useValue: { create: () => Promise.resolve({ present: () => {} }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
