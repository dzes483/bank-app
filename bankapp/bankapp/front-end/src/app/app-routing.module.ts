import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductManageComponent } from './components/product-manage/product-manage.component';


const routes: Routes = [
  { path: 'api/products', component: ProductListComponent },
  { path: 'api/manage/add', component: ProductAddComponent },
  { path: 'api/manage/:productSlug', component: ProductManageComponent},
  { path: 'api/manage', component: ProductManageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
