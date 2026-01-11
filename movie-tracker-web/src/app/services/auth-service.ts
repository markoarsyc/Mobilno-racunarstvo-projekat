// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null>(null);

  login(user: User) {
    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('user');
  }

  getUser() {
    return this.user();
  }

  isLoggedIn(): boolean {
    return !!this.user();
  }

  // Opcionalno: inicijalizacija sa localStorage
  initFromStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.user.set(JSON.parse(stored));
    }
  }
}
