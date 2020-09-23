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

  search(filter: {name: string} = {name: ''}, page = 1): Observable<Product> {
    return this.http.get<Product>(this.domainUrl+'/api/product/search');
    // .pipe(
    //   tap((response: Product) => {
    //     response.results = response.results
    //       .map(user => new User(user.id, user.name))
    //       // Not filtering in the server since in-memory-web-api has somewhat restricted api
    //       .filter(user => user.name.includes(filter.name))

    //     return response;
    //   })
    //   );
  }
  getAllProduct(){
    return  this.http.get(this.domainUrl+'/api/product');
  }

  addProduct(ptoduct:any){
    return  this.http.post(this.domainUrl+'/api/product', ptoduct);
  }

}

export interface Product {
  _id:any;
  name: string;
  quantity: number;
  cost_price: number;
  selling_price: number;
}
