import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-searchbutton',
  standalone: true,
  imports: [ProductComponent,StoreComponent],
  templateUrl: './searchbutton.component.html',
  styleUrl: './searchbutton.component.css'
})
export class SearchbuttonComponent {

//   productService = inject(ProductService);

//   productList: any;

//   getProducts() {
//      return this.productService.getProducts().subscribe({
//       next: res => this.productList = res
//  })

//   }

}
