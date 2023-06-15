import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartsComponent } from './carts/carts.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {
     path: '', component: AllProductsComponent
  },
  {
    // 4200/products/viewproducts/2
    path:'viewproducts/:id' ,component:ViewProductsComponent
  },
  {
    path:'wishlist',component:WishListComponent
  },
  {
    path:'cart',component:CartsComponent
  },
  {
    path:'about',component:AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
