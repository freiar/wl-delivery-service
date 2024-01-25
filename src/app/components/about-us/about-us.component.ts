import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  // Constructor injecting DOCUMENT to access DOM-related functionality
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Method to scroll to the top of the page
  scrollToTop() {
    // Setting scrollTop for both body and documentElement to 0
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }
}
