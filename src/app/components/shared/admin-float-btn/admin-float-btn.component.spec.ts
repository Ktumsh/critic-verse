import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AdminFloatBtnComponent } from './admin-float-btn.component';
import { AuthService } from 'src/app/services/auth.service';

describe('AdminFloatBtnComponent', () => {
  let component: AdminFloatBtnComponent;
  let fixture: ComponentFixture<AdminFloatBtnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFloatBtnComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: { user: { id: 'test-id', role: 'admin' } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFloatBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
