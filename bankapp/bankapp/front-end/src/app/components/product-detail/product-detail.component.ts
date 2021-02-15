import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  slugify(productName: string): void {
    const slug = this.slugifyPipe.transform(productName);
  }

  getProduct(): void {
    const productSlug = this.route.snapshot.params.productSlug;
    this.productService.get(productSlug).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  // getProduct(productSlug: string): void {
  //   this.productService.get(productSlug).subscribe(
  //     response => {
  //       console.log(response);
  //       this.productEditForm.patchValue({
  //         name: response.results.name,
  //         age: response.results.age,
  //         student: response.results.student,
  //         income: response.results.income
  //       });
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  // }


}
