import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   
    private http = inject(HttpClient);
    private endpointUrl = "../assets/sample-data/products.json";
  
    constructor() { }
  
    getProducts(){
      return this.http.get(this.endpointUrl);
    }
  
    getProductsById(id:number){
      return this.http.get(this.endpointUrl + "/" + id);
    }
  }




  

