import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewOptionsComponent } from './review-options.component';

describe('ReviewOptionsComponent', () => {
  let component: ReviewOptionsComponent;
  let fixture: ComponentFixture<ReviewOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewOptionsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewOptionsComponent);
    component = fixture.componentInstance;

    component.review = { id: '123', userId: '456', contentId: '789' } as any;
    component.user = { id: '456', username: 'testUser' } as any;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
