import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:8000/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: any): any {
    return this.http.post(`${BASE_URL}/login/`, credentials);
  }
}
