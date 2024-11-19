import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DbService } from './services/db.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';
import { AccessibilityService } from './services/accessibility.service';
import { AuthService } from './services/auth.service';
import { ContentService } from './services/content.service';
import { UserService } from './services/user.service';

class MockDbService {
  createDatabase = jasmine.createSpy('createDatabase');
}

class MockAuthService {
  loadAuthState = jasmine
    .createSpy('loadAuthState')
    .and.returnValue(Promise.resolve());
  isLoggedIn = false;
}

class MockNativeStorage {
  getItem = jasmine
    .createSpy('getItem')
    .and.returnValue(Promise.resolve(false));
  setItem = jasmine.createSpy('setItem').and.returnValue(Promise.resolve());
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockContentService {
  insertGameData = jasmine
    .createSpy('insertGameData')
    .and.returnValue(Promise.resolve());
  insertMovieData = jasmine
    .createSpy('insertMovieData')
    .and.returnValue(Promise.resolve());
  insertTvShowData = jasmine
    .createSpy('insertTvShowData')
    .and.returnValue(Promise.resolve());
}

class MockUserService {
  insertUser = jasmine
    .createSpy('insertUser')
    .and.returnValue(Promise.resolve());
}

class MockAccessibilityService {
  loadSettings = jasmine.createSpy('loadSettings');
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DbService, useClass: MockDbService },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: Router, useClass: MockRouter },
        { provide: AccessibilityService, useClass: MockAccessibilityService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: ContentService, useClass: MockContentService },
        { provide: UserService, useClass: MockUserService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
