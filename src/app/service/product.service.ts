import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  http = inject(HttpClient)

  url = "http://localhost:3000/products"
  

  getProducts() {
    return this.http.get(this.url);

  }
}
