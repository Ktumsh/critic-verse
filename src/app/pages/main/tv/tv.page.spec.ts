import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvPage } from './tv.page';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { of } from 'rxjs';

class MockContentService {
  contents$ = of([]);
  getAllContents = jasmine
    .createSpy('getAllContents')
    .and.returnValue(Promise.resolve());
  isTvShow = jasmine.createSpy('isTvShow').and.returnValue(true);
}

class MockReviewService {
  getReviewsByContentId = jasmine
    .createSpy('getReviewsByContentId')
    .and.returnValue(Promise.resolve([]));
}

describe('TvPage', () => {
  let component: TvPage;
  let fixture: ComponentFixture<TvPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvPage],
      providers: [
        { provide: ContentService, useClass: MockContentService },
        { provide: ReviewService, useClass: MockReviewService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
