import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDetailPage } from './game-detail.page';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1'),
    },
  };
}

class MockLocation {
  back = jasmine.createSpy('back');
}

class MockModalController {
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
    onDidDismiss: jasmine
      .createSpy('onDidDismiss')
      .and.returnValue(Promise.resolve()),
  });
}

class MockContentService {
  getGameById = jasmine.createSpy('getGameById').and.returnValue(
    Promise.resolve({
      id: '1',
      title: 'Mock Game',
      description: 'This is a mock description.',
      detail: {
        releaseDate: '2024-01-01',
        platforms: ['PC', 'PS5'],
      },
    })
  );
}

describe('GameDetailPage', () => {
  let component: GameDetailPage;
  let fixture: ComponentFixture<GameDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameDetailPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Location, useClass: MockLocation },
        { provide: ModalController, useClass: MockModalController },
        { provide: ContentService, useClass: MockContentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
