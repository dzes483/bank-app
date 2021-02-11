import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {

  products?: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products);
  }

  getProducts(): void {
    this.productService.readAll().subscribe(
      response => {
        this.products = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
