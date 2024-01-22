import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {

  isUserRegistered: boolean = false;
  registeredUser: any; // Replace 'any' with the actual type of your user model

  constructor(private userService: UserService) {
    this.registeredUser = this.userService.getRegisteredUser();
  }

  
  registerUser() {
    this.isUserRegistered = true;
  }
}
