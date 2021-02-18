import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${BASE_URL}/users`);
  }

  register(user: any) {
    return this.http.post(`${BASE_URL}/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${BASE_URL}/users/${id}`);
  }
}
