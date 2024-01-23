import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { AddToCartPublisherService } from '../../../services/add.to.cart.publisher.service';
import { StoreService } from '../../../services/store.service';
import { CartComponent } from '../../cart/cart.component';
import {
  CounterComponent,
  CounterUpdate,
} from '../../counter/counter.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-store-products',
  standalone: true,
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.css',
  imports: [CartComponent, RouterLink, CounterComponent],
})
export class StoreProductsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() isOrderPage: boolean = false;
  @Input() isOrder: boolean = false;

  constructor(
    private router: Router,
    private addToCartPublisherService: AddToCartPublisherService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params: any) => {
        // Clear the cart when changing stores
        this.cartService.clearCart(0);

        this.storeService
          .getStoreById(params.id)
          .subscribe((r) => (this.products = r.products));
      },
    });
  }

  // Handle the count change event from the CounterComponent
  onCounterChange(
    product: Product,
    event: { productId: number; count: number }
  ): void {
    // Update the count of the specific product and publish the changes
    product.count = event.count;
    this.addToCartPublisherService.publishProduct(product);
  }

  // Navigate to the order page
  goToOrderPage(): void {
    this.router.navigate(['/order-page']);
  }
}
