import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClasificationComponent } from './clasification.component';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';

describe('ClasificationComponent', () => {
  let component: ClasificationComponent;
  let fixture: ComponentFixture<ClasificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClasificationComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClasificationComponent);
    component = fixture.componentInstance;

    component.item = { reviews: [] } as unknown as Game | Movie | TvShow;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
