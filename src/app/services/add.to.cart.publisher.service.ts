import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class AddToCartPublisherService {

  private publisher = new Subject<any>();

  publishProduct(data: Product) {
    this.publisher.next(data);
  }

  listenForProduct() {
    return this.publisher.asObservable();
  }
}
