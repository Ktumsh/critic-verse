import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HomeCarouselSectionComponent } from './home-carousel-section.component';

describe('HomeCarouselSectionComponent', () => {
  let component: HomeCarouselSectionComponent;
  let fixture: ComponentFixture<HomeCarouselSectionComponent>;

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCarouselSectionComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCarouselSectionComponent);
    component = fixture.componentInstance;
    component.title = 'Sample Title';
    component.list = [];
    component.detailRoute = '/detail';
    component.viewAllRoute = '/view-all';
    component.activeIndices = [];
    component.carouselClass = 'carousel-slide';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
