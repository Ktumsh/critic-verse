import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailPage } from './movie-detail.page';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/services/content.service';

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1'),
    },
  };
}

class MockContentService {
  getMovieById = jasmine.createSpy('getMovieById').and.returnValue(
    Promise.resolve({
      id: '1',
      title: 'Mock Movie',
      description: 'This is a mock description.',
      detail: {
        releaseDate: '2024-01-01',
      },
    })
  );
}

class MockModalController {
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
    onDidDismiss: jasmine
      .createSpy('onDidDismiss')
      .and.returnValue(Promise.resolve()),
  });
}

class MockLocation {
  back = jasmine.createSpy('back');
}

describe('MovieDetailPage', () => {
  let component: MovieDetailPage;
  let fixture: ComponentFixture<MovieDetailPage>;
  let mockContentService: MockContentService;

  beforeEach(async () => {
    mockContentService = new MockContentService();

    await TestBed.configureTestingModule({
      declarations: [MovieDetailPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ContentService, useValue: mockContentService },
        { provide: ModalController, useClass: MockModalController },
        { provide: Location, useClass: MockLocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
