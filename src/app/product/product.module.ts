import { ProductService } from '../services/product.service';
import { MaterialModule } from '../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [ProductComponent, ProductsComponent, SearchComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[ProductService]
})
export class ProductModule { }
