import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ContentOptionsComponent } from './content-options.component';
import { PopoverController } from '@ionic/angular';

describe('ContentOptionsComponent', () => {
  let component: ContentOptionsComponent;
  let fixture: ComponentFixture<ContentOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContentOptionsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: PopoverController,
          useValue: { dismiss: jasmine.createSpy() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
