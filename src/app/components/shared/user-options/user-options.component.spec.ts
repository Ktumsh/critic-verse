import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { UserOptionsComponent } from './user-options.component';

describe('UserOptionsComponent', () => {
  let component: UserOptionsComponent;
  let fixture: ComponentFixture<UserOptionsComponent>;

  const mockPopoverController = {
    dismiss: jasmine.createSpy('dismiss'),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserOptionsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: PopoverController, useValue: mockPopoverController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
