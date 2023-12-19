import { Component, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
   @Input() productList: any;

}
