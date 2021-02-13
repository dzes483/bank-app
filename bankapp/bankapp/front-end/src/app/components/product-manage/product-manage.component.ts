import {Component, OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {

  public products$?: any;
  public product$: any;
  productSlug!: string;
  isHideEdit = true;

  constructor(private productService: ProductService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProducts();
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

  updateProduct(): void {
    this.productService.update(this.product$, this.productSlug);
  }

  deleteProduct(productSlug: string): void {
    if (window.confirm('Are you sure you wish to delete this product?')) {
      this.productService.delete(productSlug).subscribe(res => this.getProducts());
    }
  }
}
