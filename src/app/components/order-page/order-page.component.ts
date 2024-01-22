import { SendOrderButtonComponent } from './../send-order-button/send-order-button.component';
import { CartComponent } from './../cart/cart.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { Order } from '../../interfaces/order';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CartComponent,
    SendOrderButtonComponent,
    OrderComponent,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
})
export class OrderPageComponent implements OnInit {
  product: Product[] = [];
  order: Order[] = [];
  store: Store | undefined;
  cart: Product[] = [];
  private orderSubscription: Subscription | undefined;
  private storeSubscription: Subscription | undefined;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    // Subscribe to order changes
    this.orderSubscription = this.orderService.getOrder().subscribe({
      next: (response: Order[]) => {
        this.order = response;

        // Check if there are orders and retrieve associated store details
        if (this.order && this.order.length > 0) {
          const orderStoreId = this.order[0]?.storeId;

          if (orderStoreId) {
            // Subscribe to store details
            this.storeSubscription = this.storeService
              .getStoreById(orderStoreId)
              .subscribe({
                next: (storeResponse: Store) => {
                  this.store = storeResponse;
                },
              });
          }
        }
      },
      error: (error: any) => {
        console.error('Error fetching order:', error);
      },
    });

    // Retrieve cart items
    this.cart = this.cartService.getCart();
  }

  // Create a new order
  createOrder(order: Order): void {
    if (this.product) {
      this.orderService.createOrder(order).subscribe({
        next: (createdOrder: any) => {
          console.log('Order created successfully:', createdOrder);
        },
        error: (error: any) => {
          console.error('Error creating order:', error);
        },
      });
    } else {
      console.error('Product details not available. Unable to create order.');
    }
  }

  // Submit the order and clear the cart
  submitOrder(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to avoid memory leaks
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }

    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
