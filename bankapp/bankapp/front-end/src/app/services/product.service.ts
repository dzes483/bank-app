import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${BASE_URL}/manage`);
  }

  get(productSlug: string): Observable<any> {
    return this.http.get(`${BASE_URL}/manage/${productSlug}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/manage/add`, data);
  }

  update(productSlug: string, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/manage/${productSlug}`, data);
  }

  delete(productSlug: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/manage/${productSlug}`);
  }

  searchByCriteria(age: string, income: string, student: boolean): Observable<any> {
    return this.http.get(`${BASE_URL}/products/search?age=${age}&income=${income}&student=${student}`);
  }
}
