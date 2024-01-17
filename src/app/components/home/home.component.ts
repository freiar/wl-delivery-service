import { Component, Inject } from '@angular/core';
import { StoreComponent } from '../store/store.component';
import { TopStoresDrinkComponent } from '../top-stores-drink/top-stores-drink.component';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopStoresFoodComponent } from '../top-stores-food/top-stores-food.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [StoreComponent, RouterLink, RouterOutlet],
})
export class HomeComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Method to scroll to the top of the page when called.
  scrollToTop() {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }
}
