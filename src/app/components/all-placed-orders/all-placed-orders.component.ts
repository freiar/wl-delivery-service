import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderList } from '../../interfaces/order';

@Component({
  selector: 'app-all-placed-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-placed-orders.component.html',
  styleUrl: './all-placed-orders.component.css',
})
export class AllPlacedOrdersComponent {
  orders: OrderList[] = [];
  hasLoaded: boolean = false;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (response: OrderList[]) => {
        console.log('Orders: ', response);
        this.orders = response;
        this.hasLoaded = true;
      },
      error: (error: any) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  viewOrderDetails(orderId: number) {
    this.router.navigate(['/order', orderId]);
  }
}
