import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { of } from 'rxjs';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    url: '/main/home',
    createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({}),
    serializeUrl: jasmine
      .createSpy('serializeUrl')
      .and.returnValue('/mock-url'),
  };

  const mockNavController = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  const mockActivatedRoute = {
    snapshot: {
      params: {},
    },
    queryParams: of({}),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: NavController, useValue: mockNavController },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
