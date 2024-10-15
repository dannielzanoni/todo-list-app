import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../model/todo-item';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/todo';

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

  deleteTask(todoItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${todoItemId}`);
  }

  updateTaskStatus(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/update/${todoItem.id}`, todoItem);
  }
}