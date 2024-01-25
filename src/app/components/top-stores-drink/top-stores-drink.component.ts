import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '../../interfaces/store';
import { StoreService } from '../../services/store.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-stores-drink',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-stores-drink.component.html',
  styleUrl: './top-stores-drink.component.css',
})
export class TopStoresDrinkComponent {
  // Define an array to store the retrieved stores
  stores: Store[] = [];

  // Constructor for dependency injection
  constructor(private storeService: StoreService) {}

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    // Subscribe to the observable to get top 8 stores by drink category
    this.storeService.getTop8StoresByDrinkCategory().subscribe({
      // Handle the next value emitted by the observable
      next: (data: any) => {
        this.stores = data; // Assign the retrieved stores to the component property
      },
    });
  }
}
