import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ContentListComponent } from './content-list.component';
import { ContentService } from 'src/app/services/content.service';
import {
  ModalController,
  ToastController,
  PopoverController,
  AlertController,
} from '@ionic/angular';
import { of } from 'rxjs';

describe('ContentListComponent', () => {
  let component: ContentListComponent;
  let fixture: ComponentFixture<ContentListComponent>;

  const mockContentService = {
    getGames: jasmine
      .createSpy('getGames')
      .and.returnValue(Promise.resolve([])),
    getMovies: jasmine
      .createSpy('getMovies')
      .and.returnValue(Promise.resolve([])),
    getTvShows: jasmine
      .createSpy('getTvShows')
      .and.returnValue(Promise.resolve([])),
    contents$: of([]),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContentListComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ContentService, useValue: mockContentService },
        { provide: ModalController, useValue: {} },
        { provide: ToastController, useValue: {} },
        { provide: PopoverController, useValue: {} },
        { provide: AlertController, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
