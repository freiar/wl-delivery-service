import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductService } from './service/product.service';
import { SearchbarComponent } from './searchbar/searchbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ProductComponent, SearchbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productList:any;
  name: any;
  category: any;

  service = inject(ProductService);
  

  getProducts() {
    this.service.getProducts().subscribe({
      next: res => this.productList = res
    });
  }
  
}
