import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddReviewComponent } from './add-review.component';
import { ModalController, ToastController } from '@ionic/angular';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from 'src/app/services/auth.service';

describe('AddReviewComponent', () => {
  let component: AddReviewComponent;
  let fixture: ComponentFixture<AddReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddReviewComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: ToastController, useValue: {} },
        { provide: ReviewService, useValue: {} },
        { provide: AuthService, useValue: { user: { id: 'test-user-id' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
