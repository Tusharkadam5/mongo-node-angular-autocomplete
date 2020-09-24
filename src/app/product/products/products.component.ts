import { ProductService } from '../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productColumns:string[] = ['_id','name', 'description', 'quantity', 'cost_price', 'selling_price'];
  productOptions: Observable<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  constructor(private fb:FormBuilder, private productService:ProductService) { }

  ngOnInit(): void {
  this.getAllProduct();
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe((result:any) => {
     // console.log(result);
      this.dataSource = new MatTableDataSource(Object.assign(result));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
