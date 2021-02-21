import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${BASE_URL}/users`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/users/${id}`);
  }
}
