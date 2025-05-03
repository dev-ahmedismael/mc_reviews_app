import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  apiUrl = environment.api.origin;

  constructor(private http: HttpClient) {}

  getCSRFCookie() {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`);
  }
}
