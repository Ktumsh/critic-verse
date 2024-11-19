import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CastingComponent } from './casting.component';

describe('CastingComponent', () => {
  let component: CastingComponent;
  let fixture: ComponentFixture<CastingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CastingComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CastingComponent);
    component = fixture.componentInstance;

    component.item = { detail: {} } as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
