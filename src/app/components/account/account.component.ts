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
  user: User[] = [];
  hasLoaded: boolean = false;
  order: Order[] = [];
  id: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (response: User[]) => {
        console.log('User:', response);
        this.user = response;
        this.hasLoaded = true;
      },
    });
  }
}
