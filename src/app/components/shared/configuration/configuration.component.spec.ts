import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { ConfigurationComponent } from './configuration.component';
import { AccessibilityService } from 'src/app/services/accessibility.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

class MockAccessibilityService {
  accessibilitySettings = {
    fontSize: 'medium',
    disableAnimations: false,
  };

  setFontSize = jasmine
    .createSpy('setFontSize')
    .and.callFake((size: string) => {
      this.accessibilitySettings.fontSize = size;
    });

  toggleAnimations = jasmine
    .createSpy('toggleAnimations')
    .and.callFake((disable: boolean) => {
      this.accessibilitySettings.disableAnimations = disable;
    });

  loadSettings = jasmine
    .createSpy('loadSettings')
    .and.returnValue(Promise.resolve());
  saveSettings = jasmine
    .createSpy('saveSettings')
    .and.returnValue(Promise.resolve());
  applySettings = jasmine.createSpy('applySettings');
}

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  const mockAuthService = {
    logout: jasmine.createSpy('logout'),
  };

  const mockUserService = {
    deleteUserByUsername: jasmine.createSpy('deleteUserByUsername'),
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockModalController = {
    dismiss: jasmine.createSpy('dismiss'),
    create: jasmine
      .createSpy('create')
      .and.returnValue(
        Promise.resolve({ present: jasmine.createSpy('present') })
      ),
  };

  const mockAlertController = {
    create: jasmine
      .createSpy('create')
      .and.returnValue(
        Promise.resolve({ present: jasmine.createSpy('present') })
      ),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AccessibilityService, useClass: MockAccessibilityService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: ModalController, useValue: mockModalController },
        { provide: AlertController, useValue: mockAlertController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;

    component.user = { username: 'testuser' } as any;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.accessibilityService).toBeDefined();
    expect(component.accessibilityService.accessibilitySettings).toBeDefined();
    expect(component.accessibilityService.accessibilitySettings.fontSize).toBe(
      'medium'
    );
  });
});
