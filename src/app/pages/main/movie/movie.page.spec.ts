import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviePage } from './movie.page';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { of } from 'rxjs';

class MockContentService {
  contents$ = of([]);
  getAllContents = jasmine
    .createSpy('getAllContents')
    .and.returnValue(Promise.resolve());
  isMovie = jasmine.createSpy('isMovie').and.returnValue(true);
}

class MockReviewService {
  getReviewsByContentId = jasmine
    .createSpy('getReviewsByContentId')
    .and.returnValue(Promise.resolve([]));
}

describe('MoviePage', () => {
  let component: MoviePage;
  let fixture: ComponentFixture<MoviePage>;
  let mockContentService: MockContentService;
  let mockReviewService: MockReviewService;

  beforeEach(async () => {
    mockContentService = new MockContentService();
    mockReviewService = new MockReviewService();

    await TestBed.configureTestingModule({
      declarations: [MoviePage],
      providers: [
        { provide: ContentService, useValue: mockContentService },
        { provide: ReviewService, useValue: mockReviewService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
