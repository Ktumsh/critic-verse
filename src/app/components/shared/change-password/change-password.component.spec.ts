import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ChangePasswordComponent } from './change-password.component';
import { FormBuilder } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: ModalController, useValue: {} },
        { provide: ToastController, useValue: {} },
        { provide: UserService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
