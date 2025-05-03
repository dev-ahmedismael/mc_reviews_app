import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.api.base;

  constructor(private http: HttpClient) {}

  index<R>(path: string): Observable<R> {
    return this.http.get<R>(`${this.apiUrl}/${path}`);
  }

  store<T, R>(path: string, data: T): Observable<R> {
    return this.http.post<R>(`${this.apiUrl}/${path}`, data);
  }

  update<T, R>(path: string, id: string, data: T): Observable<R> {
    return this.http.put<R>(`${this.apiUrl}/${path}/${id}`, data);
  }

  destroy<T, R>(path: string, id?: string, data?: T): Observable<R> {
    const url = id ? `${this.apiUrl}/${path}/${id}` : `${this.apiUrl}/${path}`;
    return this.http.delete<R>(url, {
      body: data,
    });
  }
}
