import {Component, OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {

  public products$?: any;
  productSlug?: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.products$ = this.productService.getAll();
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

  deleteProduct(productSlug: string): void {
    if (window.confirm('Are you sure you wish to delete this product?')) {
      this.productService.delete(productSlug).subscribe(res => this.getProducts());
    }
  }
}
