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

  constructor(private storeService: StoreService) {}

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    this.storeService.getTop8StoresByDrinkCategory().subscribe({
      next: (data: any) => {
        this.stores = data;
      },
    });
  }
}
