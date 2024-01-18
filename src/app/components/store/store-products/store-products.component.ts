import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { AddToCartPublisherService } from '../../../services/add.to.cart.publisher.service';
import { map } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { CartComponent } from "../../cart/cart.component";

@Component({
    selector: 'app-store-products',
    standalone: true,
    templateUrl: './store-products.component.html',
    styleUrl: './store-products.component.css',
    imports: [CartComponent]
})
export class StoreProductsComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  storeService : StoreService = inject(StoreService)

  products: Product[] = [];
  addToCartPublisherService = inject(AddToCartPublisherService);

  ngOnInit() {
    this.activatedRoute.params
      .subscribe({
        next: (params: any) => {
          this.storeService.getStoreById(params.id)
            .subscribe(
              r => this.products = r.products
            )
        }
      })
  }

  productButtonClicked(product: Product){
    this.addToCartPublisherService.publishProduct(product);
  }
}
