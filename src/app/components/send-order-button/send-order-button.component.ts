import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Order } from '../../interfaces/order';
import { Store } from '../../interfaces/store';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-send-order-button',
  standalone: true,
  imports: [],
  templateUrl: './send-order-button.component.html',
  styleUrl: './send-order-button.component.css',
})
export class SendOrderButtonComponent implements OnInit {
  product: Product[] = [];
  order: Order[] = [];
  store: Store[] = [];
  cart: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  submitOrder(): void {
    this.cartService.clearCart();
  }
}
