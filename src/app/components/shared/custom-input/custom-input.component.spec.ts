import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomInputComponent } from './custom-input.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputComponent],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
