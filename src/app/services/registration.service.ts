import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private userData: {
    email?: string;
    birthdate?: string | Date;
    username?: string;
    password?: string;
  } = {};

  setEmail(email: string) {
    this.userData.email = email;
  }

  getEmail(): string | undefined {
    return this.userData.email;
  }

  setBirthdate(birthdate: string | Date) {
    this.userData.birthdate = birthdate;
  }

  getBirthdate(): string | Date | undefined {
    return this.userData.birthdate;
  }

  setUsername(username: string) {
    this.userData.username = username;
  }

  getUsername(): string | undefined {
    return this.userData.username;
  }

  setPassword(password: string) {
    this.userData.password = password;
  }

  getPassword(): string | undefined {
    return this.userData.password;
  }

  getUserData() {
    return this.userData;
  }

  clearData() {
    this.userData = {};
  }
}
