import { Component } from '@angular/core';
import { StoreComponent } from '../store/store.component';
import { TopStoresDrinkComponent } from '../top-stores-drink/top-stores-drink.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [StoreComponent, TopStoresDrinkComponent],
})
export class HomeComponent {}
