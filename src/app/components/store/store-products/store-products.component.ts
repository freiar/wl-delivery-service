import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { AddToCartPublisherService } from '../../../services/add.to.cart.publisher.service';

@Component({
  selector: 'app-store-products',
  standalone: true,
  imports: [],
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.css'
})
export class StoreProductsComponent {
  activatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);
  products: Product[] = [];
  addToCartPublisherService = inject(AddToCartPublisherService);

  ngOnInit() {
    this.activatedRoute.params
      .subscribe({
        next: (params: any) => {
          this.productService.getProductsById(params.id)
            .subscribe(
              r => this.products = r
            )
        }
      })
  }

  productButtonClicked(product: Product){
    this.addToCartPublisherService.publishProduct(product);
  }
}
