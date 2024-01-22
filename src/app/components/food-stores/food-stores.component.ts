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

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.getFoodStores().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.stores = data;
      },
    });
  }
}
