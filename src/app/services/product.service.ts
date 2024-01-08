import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   
    private http = inject(HttpClient);
    private endpointUrl = "../assets/sample-data/products.json";
  
    constructor() { }
  
    getProducts(){
      return this.http.get<Product[]>(this.endpointUrl);
    }

  }




  

