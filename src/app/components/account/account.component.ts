import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Order } from '../../interfaces/order';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  // Array to store user data
  user: User[] = [];
  // Array to store order data
  order: Order[] = [];
  // Variable to store user ID

  // Constructor with dependency injection of UserService
  constructor(private userService: UserService) {}

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Subscribe to the getUser observable from UserService
    this.userService.getUser().subscribe({
      // Callback function for successful response
      next: (response: User[]) => {
        // Log the user data to the console
        console.log('User:', response);
        // Assign user data to the component property
        this.user = response;
      },
    });
  }
}
