import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}`, { username, email, password });
  }
}
