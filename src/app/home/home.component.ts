import { ProductService } from './../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap, debounceTime, tap, finalize} from 'rxjs/operators';

// const ELEMENT_DATA: Product[] = [
//   {_id: 1, name: 'Hydrogen', quantity: 1.0079, cost_price: 10, selling_price:30},
//   {_id: 2, name: 'Helium', quantity: 4.0026, cost_price: 200, selling_price:222},
//   {_id: 3, name: 'Lithium', quantity: 6.941, cost_price: 300, selling_price:555},
//   {_id: 4, name: 'Beryllium', quantity: 9.0122, cost_price:34, selling_price:38},
//   {_id: 5, name: 'Boron', quantity: 10.811, cost_price: 567, selling_price:678},
//   {_id: 6, name: 'Carbon', quantity: 12.0107, cost_price: 87, selling_price:67},
//   {_id: 7, name: 'Nitrogen', quantity: 14.0067, cost_price: 77, selling_price:89},
//   {_id: 8, name: 'Oxygen', quantity: 15.9994, cost_price: 55, selling_price:99},
//   {_id: 9, name: 'Fluorine', quantity: 18.9984, cost_price: 65, selling_price:78},
//   {_id: 10, name: 'Neon', quantity: 20.1797, cost_price: 57, selling_price:76}
// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ProductForm:FormGroup;
  searchForm:FormGroup;
  myControl = new FormControl();
  productColumns:string[] = ['_id','name', 'quantity', 'cost_price', 'selling_price'];
  productOptions: Observable<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();
  isLoading:boolean;

  constructor(private fb:FormBuilder, private productService:ProductService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      serchInput: null
    });

    this.searchForm
    .get('serchInput')
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.productService.search({name: value}, 1)
      .pipe(
        finalize(() => this.isLoading = false),
      )
    )
  )
  .subscribe((product:any) => this.productOptions = product);

    this.ProductForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      cost_price:  ['', [Validators.required]],
      selling_price: ['', [Validators.required]],
    });

    this.getAllProduct();
  }

  submitForm(){
  if(this.ProductForm.valid){
    this.productService.addProduct( this.ProductForm.value).subscribe(result => {
      console.log(result);
    });
  }
  }
  getAllProduct(){
    this.productService.getAllProduct().subscribe((result:Product) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(Object.assign(result));
    })
  }

}

export interface Product {
  _id:any;
  name: string;
  quantity: number;
  cost_price: number;
  selling_price: number;
}
