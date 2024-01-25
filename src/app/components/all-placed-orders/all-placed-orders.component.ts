import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderList } from '../../interfaces/order';

@Component({
  selector: 'app-all-placed-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-placed-orders.component.html',
  styleUrl: './all-placed-orders.component.css',
})
export class AllPlacedOrdersComponent implements OnInit {
  // Array to store orders fetched from the service
  orders: OrderList[] = [];

  // Flag to track if orders have been loaded
  hasLoaded: boolean = false;

  // Constructor with injected services (orderService, router, and activated route)
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Lifecycle hook: ngOnInit - called after Angular initializes the component
  ngOnInit() {
    // Subscribe to the order service to fetch orders
    this.orderService.getOrders().subscribe({
      // Success callback when orders are successfully fetched
      next: (response: OrderList[]) => {
        // Assign the fetched orders to the component variable
        this.orders = response;
        // Set the 'hasLoaded' flag to true
        this.hasLoaded = true;
      },
      // Error callback for handling errors during the fetch operation
      error: (error: any) => {
        // Log the error to the console
        console.error('Error fetching orders:', error);
      },
    });
  }

  // Method to navigate to the order details page
  viewOrderDetails(orderId: number) {
    // Use the Angular router to navigate to the '/order' route with the specific order ID
    this.router.navigate(['/order', orderId]);
  }
}
