import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

const BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // TODO: Add error handling

  readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`products`);
  }

  read(productName: string): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/${productName}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/manage/add`, data);
  }

  update(product: Product, productName: string): Observable<any> {
    return this.http.put(`${BASE_URL}/manage/${productName}`, product, this.httpOptions);
  }

  delete(product: Product, productName: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/manage/${productName}`, this.httpOptions);
  }

  searchByCriteria(age: string, income: string, student: boolean): Observable<any> {
    return this.http.get(`${BASE_URL}/products/search?age=${age}&income=${income}&student=${student}`,
      this.httpOptions);
  }
}
