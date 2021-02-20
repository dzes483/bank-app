import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

const BASE_URL = 'http://localhost:8000/api';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, credentials);
  }

  getUserDetails(): any {
    return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '') : null;
  }

  storeInLocalStorage(variableName: any, data: any): void {
    localStorage.setItem(variableName, data);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
