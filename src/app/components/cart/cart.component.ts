import { Component, inject } from '@angular/core';
import { AddToCartPublisherService } from '../../services/add.to.cart.publisher.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  addToCartPublisherService = inject(AddToCartPublisherService);
  cartProducts: Product[] = [];

  constructor() {
    this.addToCartPublisherService.listenForProduct()
      .subscribe((data) => {
        this.cartProducts.push(data);
        // window.alert('Your product has been added to the cart!');
      })
  }

  getTotal() {
    let total: number = 0;
    this.cartProducts.forEach(p => total += p.price);

    return Math.round(total * 100) / 100;
  }
  
  removeProduct(id: number){
    this.cartProducts = this.cartProducts.filter(p => p.id != id)
  } 
}
