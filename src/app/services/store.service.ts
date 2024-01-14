import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '../interfaces/store';
import { StoreWithoutProducts } from '../interfaces/store-without-products';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  
  private http = inject(HttpClient);
  private storeEndpointUrl = "../assets/sample-data/stores.json";
  private storeByIdEndpointUrl = "../assets/sample-data/store.json";
  private mostFamousStoresEndpointUrl = "../assets/sample-data/most_famous_stores_in_general.json";

  getStores() {
    return this.http.get<Store[]>(this.storeEndpointUrl);
  }

  getMostFamousStores() {
    return this.http.get<StoreWithoutProducts[]>(this.mostFamousStoresEndpointUrl);
  }

  getStoreById(id: number) {
    return this.http.get<Store>(this.storeByIdEndpointUrl);
  }
}
