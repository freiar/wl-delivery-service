import { Component, Input, OnInit } from '@angular/core';
import { AddToCartPublisherService } from '../../services/add.to.cart.publisher.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { CartOrderPageService } from '../../services/cart-order-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  // Input properties for the component
  @Input() isOrderPage: boolean = false;
  @Input() currentStoreId: number | null = null;

  // Array to hold cart products
  cartProducts: Product[] = [];
  // Variable to store the total price of items in the cart
  totalPrice: number = 0;
  // Subscription to handle updates to the cart
  private cartSubscription: Subscription | undefined;

  // Constructor with injected services
  constructor(
    private addToCartPublisherService: AddToCartPublisherService,
    private cartOrderPage: CartOrderPageService
  ) {}

  // Lifecycle hook - ngOnInit
  ngOnInit(): void {
    this.cartSubscription = this.cartOrderPage.cart$.subscribe((cart: any) => {
      this.cartProducts = cart;
      this.calculateTotalPrice();
    });

    // Subscribe to product additions/removals
    this.addToCartPublisherService
      .listenForProduct()
      .subscribe((product: Product) => {
        this.defineProductAction(product);
      });
  }

  // Method to handle product additions/removals in the cart
  private defineProductAction(product: Product): void {
    if (product.count === -1) {
      this.cartProducts = [];
    } else {
      let productIndex: number = this.findIndexOfProductInCart(product);
      if (productIndex >= 0) {
        let existingProduct: Product = this.cartProducts[productIndex];
        existingProduct.count = product.count;
        if (existingProduct.count === 0) {
          this.cartProducts.splice(productIndex, 1);
        }
      } else {
        this.cartProducts.push(product);
      }

      this.calculateTotalPrice();

      // Update the service only after modifying the array
      this.cartOrderPage.updateCart(this.cartProducts);
    }
  }

  // Method to find the index of a product in the cart array
  private findIndexOfProductInCart(product: Product): number {
    return this.cartProducts.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );
  }

  // Method to calculate the total price of items in the cart
  calculateTotalPrice() {
    let price = 0;
    for (let cartProduct of this.cartProducts) {
      if (cartProduct.count !== undefined) {
        price += cartProduct.price * cartProduct.count;
      }
    }

    // Round the total price to two decimal places
    this.totalPrice = Number(price.toFixed(2));
  }
}
