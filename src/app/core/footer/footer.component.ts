import { RouterLink } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // Inject the DOCUMENT token to access the DOM
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Method to scroll to the top of the page
  scrollToTop() {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }
}
