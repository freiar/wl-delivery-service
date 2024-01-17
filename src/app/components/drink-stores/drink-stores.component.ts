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
  stores: Store[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.getDrinkStores().subscribe({
      next: (data: any) => {
        this.stores = data;
      },
    });
  }
}
