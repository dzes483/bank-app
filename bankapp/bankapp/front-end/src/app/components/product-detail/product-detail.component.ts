import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productName!: string;
  productAge!: Array<string>;
  productEditForm: FormGroup;
  productSlug!: string;
  isSubmitted = false;
  isUpdateFailed = false;
  errorMessage = '';
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
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.productEditForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      age: [null, Validators.required],
      student: [null, Validators.required],
      income: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.isSubmitted = false;
    this.isUpdateFailed = false;
    this.getProduct(this.route.snapshot.paramMap.get('productSlug') || '');
  }

  getProduct(productSlug: string): any {
    this.productService.get(productSlug).subscribe(
      response => {
        console.log(response);
        this.productEditForm.setValue({
          name: response.name,
          age: response.age,
          student: response.student,
          income: response.income
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  updateProduct(): void {
    this.productService.update(this.productSlug, this.productEditForm.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isSubmitted = true;
        },
        (error: any) => {
          this.errorMessage = error.error.message;
          this.isUpdateFailed = true;
          console.log(error);
        }
      );
  }

  // Getters
  get name(): any {
    return this.productEditForm.get('name');
  }
  get age(): any {
    return this.productEditForm.get('age');
  }
  get income(): any {
    return this.productEditForm.get('income');
  }
  get student(): any {
    return this.productEditForm.get('student');
  }
}
