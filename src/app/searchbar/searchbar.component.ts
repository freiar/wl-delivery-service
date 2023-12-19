import { Component, inject } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductComponent } from '../product/product.component';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ ProductComponent,StoreComponent],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {

  productService = inject(ProductService);

  productList: any;

  getProducts() {
     return this.productService.getProducts().subscribe({
      next: res => this.productList = res
 })

  }

}
