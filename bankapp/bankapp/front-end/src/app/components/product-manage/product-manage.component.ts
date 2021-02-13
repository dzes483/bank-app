import {Component, OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {

  public products$?: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.products$ = this.productService.getAll();
  }

  getProducts(): void {
    this.productService.getAll().subscribe(
      response => {
        this.products$ = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
