import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { Store } from '../../interfaces/store';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  @Input() orderId: string = ''; // Input to specify the orderId
  order: Order | undefined;
  store: Store | undefined;
  cart: Product[] = [];
  product: Product[] = [];
  private orderSubscription: Subscription | undefined;
  private storeSubscription: Subscription | undefined;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract orderId from route parameters
    const orderIdParam = this.route.snapshot.paramMap.get('orderId');

    if (orderIdParam !== null) {
      this.orderId = orderIdParam;
      // Fetch the order based on orderId
      this.orderSubscription = this.orderService
        .getOrderById(this.orderId)
        .subscribe({
          // ... rest of the code ...
        });
    } else {
      console.error('Order ID not found in route parameters.');
    }

    // Fetch the order based on orderId
    this.orderSubscription = this.orderService
      .getOrderById(this.orderId)
      .subscribe({
        next: (response: Order | undefined) => {
          this.order = response;

          // Check if there is an order and retrieve associated store details
          if (this.order) {
            const orderStoreId = this.order.storeId;

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
