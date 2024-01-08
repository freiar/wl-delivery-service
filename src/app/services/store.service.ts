import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  
  private http = inject(HttpClient);
  private endpointUrl = "../assets/sample-data/stores.json";

 

  getStores(){
    return this.http.get(this.endpointUrl);
  }

}
