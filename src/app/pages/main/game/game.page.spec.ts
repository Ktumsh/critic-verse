import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamePage } from './game.page';
import { ContentService } from 'src/app/services/content.service';
import { ReviewService } from 'src/app/services/review.service';
import { of } from 'rxjs';

class MockContentService {
  contents$ = of([]);
  getAllContents = jasmine
    .createSpy('getAllContents')
    .and.returnValue(Promise.resolve());
  isGame = jasmine.createSpy('isGame').and.returnValue(true);
}

class MockReviewService {
  getReviewsByContentId = jasmine
    .createSpy('getReviewsByContentId')
    .and.returnValue(Promise.resolve([]));
}

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePage],
      providers: [
        { provide: ContentService, useClass: MockContentService },
        { provide: ReviewService, useClass: MockReviewService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
