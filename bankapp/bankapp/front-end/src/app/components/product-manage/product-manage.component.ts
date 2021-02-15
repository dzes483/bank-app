import {Component, OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { SlugifyPipe } from '../../shared/slugify.pipe';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {

  public products$?: any;
  public product$: any;
  slug!: string;
  productEditForm: FormGroup;
  isHideEdit = true;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private slugifyPipe: SlugifyPipe) {
    this.productEditForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      age: [null, Validators.required],
      student: [null, Validators.required],
      income: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getProduct();
  }



  getProducts(): void {
    this.productService.getAll().subscribe(
      response => {
        this.products$ = response.results;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleEditMenu(): void {
    this.isHideEdit = !this.isHideEdit;
  }

  // updateProduct(): void {
  //   this.productService.update(this.product$, this.productSlug);
  // }

  deleteProduct(productSlug: string): void {
    if (window.confirm('Are you sure you wish to delete this product?')) {
      this.productService.delete(productSlug).subscribe(res => this.getProducts());
    }
  }
}
