import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { AddToCartPublisherService } from '../../../services/add.to.cart.publisher.service';
import { map } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { CartComponent } from '../../cart/cart.component';
import { CounterComponent } from '../../counter/counter.component';

@Component({
  selector: 'app-store-products',
  standalone: true,
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.css',
  imports: [CartComponent, RouterLink, CounterComponent],
})
export class StoreProductsComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  storeService: StoreService = inject(StoreService);

  products: Product[] = [];
  addToCartPublisherService = inject(AddToCartPublisherService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params: any) => {
        this.storeService
          .getStoreById(params.id)
          .subscribe((r) => (this.products = r.products));
      },
    });
  }

  productButtonClicked(product: Product) {
    this.addToCartPublisherService.publishProduct(product);
  }

  // Navigate to the order page
  goToOrderPage(): void {
    this.router.navigate(['/order-page']);
  }
}
