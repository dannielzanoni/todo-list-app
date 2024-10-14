import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../model/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7135/api/todo';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  createTask(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}/create`, todoItem);
  }

  updateTask(todoItem: TodoItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${todoItem.id}`, todoItem);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${taskId}`);
  }
}