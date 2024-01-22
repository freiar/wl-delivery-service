
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive  } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})

export class AboutUsComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  scrollToTop() {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }
}
