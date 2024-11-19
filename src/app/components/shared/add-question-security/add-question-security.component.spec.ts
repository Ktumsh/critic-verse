import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddQuestionSecurityComponent } from './add-question-security.component';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddQuestionSecurityComponent', () => {
  let component: AddQuestionSecurityComponent;
  let fixture: ComponentFixture<AddQuestionSecurityComponent>;

  const mockUserService = {
    getUserQuestionByEmail: jasmine
      .createSpy('getUserQuestionByEmail')
      .and.returnValue(
        Promise.resolve({
          question: 'Mock Question?',
          answer: 'Mock Answer',
        })
      ),
    saveSecurityQuestion: jasmine
      .createSpy('saveSecurityQuestion')
      .and.returnValue(Promise.resolve()),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionSecurityComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuestionSecurityComponent);
    component = fixture.componentInstance;
    component.user = { email: 'test@example.com' } as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
