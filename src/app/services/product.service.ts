import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   
    private http = inject(HttpClient);

    constructor() { }    

    getProductsById(id: number) {
      let path = "../assets/sample-data/store." + id + ".products.json";
      return this.http.get<Product[]>(path);
    }
  }
  