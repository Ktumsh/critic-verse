import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddNewContentDetailsComponent } from './add-new-content-details.component';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

describe('AddNewContentDetailsComponent', () => {
  let component: AddNewContentDetailsComponent;
  let fixture: ComponentFixture<AddNewContentDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewContentDetailsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: ToastController, useValue: {} },
        { provide: FormBuilder, useClass: FormBuilder },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewContentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
