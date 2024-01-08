import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { map } from 'rxjs';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-store-products',
  standalone: true,
  imports: [],
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.css'
})
export class StoreProductsComponent {


  // activatedRoute = inject(ActivatedRoute);
  productService : ProductService = inject(ProductService);
  products: Product[]=[];
  ProductList:any;

  category: any;
  name: any;
  price: any;


}

