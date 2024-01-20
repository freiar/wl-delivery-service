import { Component } from '@angular/core';
import { Order } from '../../interfaces/order';
import { Store } from '../../interfaces/store';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {}
