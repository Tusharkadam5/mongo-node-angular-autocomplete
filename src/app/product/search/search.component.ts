import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {map, startWith, switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  hideRequiredMarker:boolean;
  ProductForm:FormGroup;
  searchForm:FormGroup;
  myControl = new FormControl();
  productOptions: Observable<any[]>;
  isLoading:boolean;
  productObj:any;
  isProduct:boolean;

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
      switchMap(value => this.productService.search({name: value})
      .pipe(
        finalize(() => this.isLoading = false),
      )
    )
  )
  .subscribe((product:any) => this.productOptions = product);

    this.ProductForm = this.fb.group({
      _id:[null],
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      cost_price:  ['', [Validators.required]],
      selling_price: ['', [Validators.required]],
      description: ['']
    });
  }

  submitForm(){
    if(this.ProductForm.valid){
      this.productService.addProduct( this.ProductForm.value).subscribe(result => {
        //this.getAllProduct();
        this.ProductForm.reset();
        this.ProductForm.get('name').clearValidators();
        this.ProductForm.get('name').updateValueAndValidity();
        this.ProductForm.get('quantity').clearValidators();
        this.ProductForm.get('quantity').updateValueAndValidity();
        this.ProductForm.get('cost_price').clearValidators();
        this.ProductForm.get('cost_price').updateValueAndValidity();
        this.ProductForm.get('selling_price').clearValidators();
        this.ProductForm.get('selling_price').updateValueAndValidity();
      });
    }
    }
    editProduct(proId){
     
      if(proId){
        this.productService.getProductById(proId).subscribe(result => {
          console.log(result);
          this.isProduct = false;
          this.productObj = result;
          this.ProductForm.patchValue(this.productObj);
        });
      }
    }

    getSelectedProduct(val) {
      console.log(val)
      if(val){
      this.productService.getProductById(val).subscribe(result => {
        console.log(result);
        this.productObj = result;
        this.isProduct = true;
        this.searchForm.reset();
      });
    }
    }
}
export interface Product {
  _id:any;
  name: string;
  quantity: number;
  cost_price: number;
  selling_price: number;
}
