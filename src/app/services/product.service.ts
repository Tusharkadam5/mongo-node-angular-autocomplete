import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 domainUrl = 'http://localhost:4000';
 
  constructor(private http: HttpClient) {}

  search(name): Observable<any> {
    return this.http.post<any>(`${this.domainUrl}/api/product/search`, name);
  }
  getAllProduct(){
    return this.http.get(this.domainUrl+'/api/product');
  }

  addProduct(ptoduct:any){
    return this.http.post(this.domainUrl+'/api/product', ptoduct);
  }

  getProductById(pid:any) {
    return this.http.get(this.domainUrl+'/api/getproduct/'+pid);
  }
}

export interface Product {
  _id:any;
  name: string;
  quantity: number;
  cost_price: number;
  selling_price: number;
}
