import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  public product: Product | undefined;
  public productForm: FormGroup;
  message: null;
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
    this.productForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      age: [null, Validators.required],
      student: [null],
      income: [null, Validators.required]
    });
  }

  createProduct(): any {
    this.productService.create(this.productForm.value)
      .subscribe((result: any) => {
        this.message = result.msg;
      }, (err) => {
        this.message = err.error.msg;
      });
  }
  get name(): any {
    return this.productForm.get('name');
  }
  get age(): any {
    return this.productForm.get('age');
  }
  get income(): any {
    return this.productForm.get('income');
  }
  get student(): any {
    return this.productForm.get('student');
  }
}
