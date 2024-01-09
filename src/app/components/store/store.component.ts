import { Component, Input, inject } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';
import { StoreProductsComponent } from './store-products/store-products.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ProductComponent, StoreProductsComponent, RouterLink, RouterLinkActive],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  storeService = inject(StoreService);
  router: Router = inject(Router);
  store: Store[] = [];
  storeList: any;
  productService: any;
  products: any;

  ngOnInit() {
    this.storeService.getStores().subscribe({
      next: res => this.storeList = res
    })
  }


  viewStoreProducts(id: number) {
    console.log("hello");
    this.router.navigate(["storeProducts", id]);
  }
}
