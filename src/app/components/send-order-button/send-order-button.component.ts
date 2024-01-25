import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Order } from '../../interfaces/order';
import { Store } from '../../interfaces/store';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

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

  @Output() orderSubmitted = new EventEmitter<void>();

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitOrder(): void {
    this.orderSubmitted.emit();
  }
}
