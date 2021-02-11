import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  queryForm: FormGroup;
  products: any;

  public ageBrackets = {
    '0-17': 'JUNIOR',
    '18-64': 'ADULT',
    '65+': 'SENIOR'
  };

  public incomeBrackets = {
    '0': 'NO_INCOME',
    '1-12000': 'LOW_INCOME',
    '12001-40000': 'MEDIUM_INCOME',
    '40000+': 'HIGH_INCOME'
  };

  constructor(private productService: ProductService,
              private fb: FormBuilder) {
    this.queryForm = this.fb.group({
      age: ['', Validators.required],
      income: ['', Validators.required],
      student: ['', Validators.required]
    });
  }

  get age(): any {
    return this.queryForm.get('age');
  }
  get income(): any {
    return this.queryForm.get('income');
  }
  get student(): any {
    return this.queryForm.get('student');
  }

  getProductsByCriteria(): void {
    this.productService.searchByCriteria(
      this.queryForm.value.age,
      this.queryForm.value.income,
      this.queryForm.value.student
    ).subscribe(
      (products: any) => {
        this.products = products;
        console.log(products);
      },
      error => {
        console.log(error);
      });
  }


}
