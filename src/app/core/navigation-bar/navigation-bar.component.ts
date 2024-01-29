import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SearchComponent,
    RouterOutlet,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent implements OnInit {
  isDropdownOpen: { [key: string]: boolean } = {};
  isRegistrationPage: boolean = false;
  isMobileScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobileScreen = window.innerWidth <= 1199.99;
  }

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  isRegistered: boolean = false;

  toggleDropdown(key: string, isOpen?: boolean) {
    this.isDropdownOpen[key] =
      isOpen !== undefined ? isOpen : !this.isDropdownOpen[key];
  }

  ngOnInit() {
    this.registrationService
      .isRegistered()
      .subscribe((isRegistered: boolean) => {
        this.isRegistered = isRegistered;
      });

    this.isRegistered = this.registrationService.isUserRegistered();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the registration page
        this.isRegistrationPage = event.url === '/register';
      }
    });
    this.activatedRoute.url.subscribe((urlSegments: any) => {
      // Check if the last segment of the URL is 'register'
      this.isRegistrationPage =
        urlSegments[urlSegments.length - 1].path === 'register';
    });
  }
}
