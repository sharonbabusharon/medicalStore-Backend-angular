import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartsComponent } from './carts/carts.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';




@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    WishListComponent,
    CartsComponent,
    ViewProductsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule 
  ]
})
export class ProductsModule { }
