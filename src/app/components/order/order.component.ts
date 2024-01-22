import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../interfaces/order';
import { Store } from '../../interfaces/store';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { StoreService } from '../../services/store.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  @Input() isOrderPage: boolean = false;
}
