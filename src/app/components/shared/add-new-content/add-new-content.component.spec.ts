import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddNewContentComponent } from './add-new-content.component';
import {
  ModalController,
  ToastController,
  ActionSheetController,
} from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';

describe('AddNewContentComponent', () => {
  let component: AddNewContentComponent;
  let fixture: ComponentFixture<AddNewContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewContentComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: ToastController, useValue: {} },
        { provide: ActionSheetController, useValue: {} },
        { provide: ContentService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
