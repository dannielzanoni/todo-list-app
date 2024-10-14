import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7135/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(page: number, itemsPerPage: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&itemsPerPage=${itemsPerPage}`);
  }
}
