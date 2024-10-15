import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  private usernameSource = new BehaviorSubject<string>(this.getUsername());

  isLoggedIn$ = this.loggedIn.asObservable();
  username$ = this.usernameSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private toastService: ToastService) { }

  signUp(userData: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData)
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.userName);

            this.loggedIn.next(true);
            this.usernameSource.next(response.userName);
          }
          const successMessage = response.message;
          this.toastService.showSuccess(successMessage)
          return response;
        }),
        catchError(error => {
          const errorMessage = error.error?.message || 'Erro desconhecido';
          this.toastService.showError(errorMessage);
          return throwError(error);
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.userName);

          this.loggedIn.next(true);
          this.usernameSource.next(response.userName);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
    this.usernameSource.next('');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }
}