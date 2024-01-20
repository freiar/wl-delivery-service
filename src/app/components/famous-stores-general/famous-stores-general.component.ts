import { Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { StoreWithoutProducts } from '../../interfaces/store-without-products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-famous-stores-general',
  standalone: true,
  imports: [],
  templateUrl: './famous-stores-general.component.html',
  styleUrl: './famous-stores-general.component.css'
})
export class FamousStoresGeneralComponent {

  storeService: StoreService = inject(StoreService);
  router: Router = inject(Router);
  famousStoreList: StoreWithoutProducts[] = [];

  ngOnInit() {
    this.storeService.getMostFamousStores().subscribe({
      next: res => this.famousStoreList = res
    })
  }

  viewStoreProducts(id: number) {
    console.log("hello");
    this.router.navigate(["storeProducts", id]);
  }
}
