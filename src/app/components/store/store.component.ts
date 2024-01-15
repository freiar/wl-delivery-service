import { Component, Input, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';
import { StoreProductsComponent } from './store-products/store-products.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StoreWithoutProducts } from '../../interfaces/store-without-products';


@Component({
  selector: 'app-store',
  standalone: true,
  imports: [StoreProductsComponent, RouterLink, RouterLinkActive],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  
  storeService: StoreService = inject(StoreService);
  router: Router = inject(Router);
  famousStoreList: StoreWithoutProducts[] = [];
  storeList: Store[] = [];

  ngOnInit() {
    this.storeService.getStores().subscribe({
      next: res => this.storeList = res
    })

    this.storeService.getMostFamousStores().subscribe({
      next: res => this.famousStoreList = res
    })
  }

  viewStoreProducts(id: number) {
    console.log("hello");
    this.router.navigate(["storeProducts", id]);
  }
}
