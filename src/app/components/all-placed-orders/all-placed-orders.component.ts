import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderList } from '../../interfaces/order';

@Component({
  selector: 'app-all-placed-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-placed-orders.component.html',
  styleUrl: './all-placed-orders.component.css',
})
export class AllPlacedOrdersComponent implements OnInit {
  orders: OrderList[] = [];
  hasLoaded: boolean = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (response: OrderList[]) => {
        this.orders = response;
        this.hasLoaded = true;
      },
      error: (error: any) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  viewOrderDetails(orderId: string) {
    // Use getOrderById to fetch details of a single order
    this.orderService.getOrderById(orderId).subscribe({
      next: (orderDetails) => {
        // Now you can navigate to a page or display the details as needed
        console.log('Order Details:', orderDetails);
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      },
    });
  }
}
