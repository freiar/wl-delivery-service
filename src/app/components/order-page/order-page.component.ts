import { SendOrderButtonComponent } from './../send-order-button/send-order-button.component';
import { CartComponent } from './../cart/cart.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent, SendOrderButtonComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
})
export class OrderPageComponent {}
