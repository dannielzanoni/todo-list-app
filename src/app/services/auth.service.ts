import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://localhost:7135/api/auth';

  constructor(private http: HttpClient) { }

  signUp(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
