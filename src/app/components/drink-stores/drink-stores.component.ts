import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '../../interfaces/store';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-drink-stores',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './drink-stores.component.html',
  styleUrl: './drink-stores.component.css',
})
export class DrinkStoresComponent implements OnInit {
  // Array to hold the list of drink stores
  stores: Store[] = [];

  // Constructor to inject the StoreService
  constructor(private storeService: StoreService) {}

  // Lifecycle hook: ngOnInit is called after the component has been initialized
  ngOnInit() {
    // Subscribe to the observable returned by getDrinkStores method
    this.storeService.getDrinkStores().subscribe({
      // Callback for successful data retrieval
      next: (data: any) => {
        // Assign the retrieved data to the 'stores' array
        this.stores = data;
      },
    });
  }
}
