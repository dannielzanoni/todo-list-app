import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://localhost:7135/api/auth';
  router: any;

  constructor(private http: HttpClient) { }

  signUp(userData: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData)
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      }));
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
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      const jwtPayload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(new Date().getTime() / 1000);

      if (jwtPayload.exp && jwtPayload.exp > now) {
        return true;
      } else {
        this.logout();
        return false;
      }
    }
    return false;
  }

}