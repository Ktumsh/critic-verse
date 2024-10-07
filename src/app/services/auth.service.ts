import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: any = null;

  constructor(private nativeStorage: NativeStorage) {
    this.loadAuthState();
  }

  async login(user: any): Promise<void> {
    this.isAuthenticated = true;
    this.currentUser = user;

    await this.nativeStorage.setItem('isAuthenticated', true);
    await this.nativeStorage.setItem('currentUser', user);
  }

  async logout(): Promise<void> {
    this.isAuthenticated = false;
    this.currentUser = null;

    await this.nativeStorage.remove('isAuthenticated');
    await this.nativeStorage.remove('currentUser');

    window.location.reload();
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  get user(): any {
    return this.currentUser;
  }

  async loadAuthState(): Promise<void> {
    try {
      const isAuthenticated = await this.nativeStorage.getItem(
        'isAuthenticated'
      );
      const user = await this.nativeStorage.getItem('currentUser');

      this.isAuthenticated = isAuthenticated ?? false;
      this.currentUser = user ?? null;
    } catch (error) {
      console.error('Error al cargar el estado de autenticación:', error);
      this.isAuthenticated = false;
      this.currentUser = null;
    }
  }
}
