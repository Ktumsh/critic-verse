import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';

class MockContentService {
  contents$ = of([]);

  getAllContents = jasmine
    .createSpy('getAllContents')
    .and.returnValue(Promise.resolve());
  isGame = jasmine.createSpy('isGame').and.returnValue(false);
  isMovie = jasmine.createSpy('isMovie').and.returnValue(false);
  isTvShow = jasmine.createSpy('isTvShow').and.returnValue(false);
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockContentService: MockContentService;

  beforeEach(async () => {
    mockContentService = new MockContentService();

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [{ provide: ContentService, useValue: mockContentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
