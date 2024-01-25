import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../interfaces/store';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-stores',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './food-stores.component.html',
  styleUrl: './food-stores.component.css',
})
export class FoodStoresComponent implements OnInit {
  stores: Store[] = [];

  // Constructor injecting the StoreService for fetching food store data
  constructor(private storeService: StoreService) {}

  // Angular lifecycle hook - ngOnInit, called after the component is initialized
  ngOnInit() {
    // Subscribing to the food store service to fetch data
    this.storeService.getFoodStores().subscribe({
      // Handling the response data
      next: (data: any) => {
        // Updating the 'stores' array with the fetched data
        this.stores = data;
      },
    });
  }
}
