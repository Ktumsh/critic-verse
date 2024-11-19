import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddNewUserComponent } from './add-new-user.component';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

describe('AddNewUserComponent', () => {
  let component: AddNewUserComponent;
  let fixture: ComponentFixture<AddNewUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewUserComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: ToastController, useValue: {} },
        { provide: UserService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
