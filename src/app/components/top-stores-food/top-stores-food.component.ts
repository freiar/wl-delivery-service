import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '../../interfaces/store';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-top-stores-food',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './top-stores-food.component.html',
  styleUrl: './top-stores-food.component.css',
})
export class TopStoresFoodComponent implements OnInit {
  // Define an array to store the retrieved stores
  stores: Store[] = [];

  // Constructor to inject the 'StoreService'
  constructor(private storeService: StoreService) {}

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    // Subscribe to the 'getTop8StoresByFoodCategory()' method of 'StoreService'
    this.storeService.getTop8StoresByFoodCategory().subscribe({
      // Callback when data is successfully retrieved
      next: (data: any) => {
        // Update the 'stores' array with the retrieved data
        this.stores = data;
      },
    });
  }
}
