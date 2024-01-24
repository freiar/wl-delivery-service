import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { UserService } from '../../services/user.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',

  providers: [
    UserService,
    RegistrationService
  ]
})

export class NavigationBarComponent {
  
deleteRegistration() {
throw new Error('Method not implemented.');
}

  isUserRegistered: boolean = false;
  registeredUser: any; 

  constructor(private userService: UserService,
    private registrationService: RegistrationService) {
    this.registeredUser = this.userService.getRegisteredUser();
    this.isUserRegistered = this.registeredUser!==null;
    
  }


  /*
  registerUser() {
    this.isUserRegistered = true;
  } */

  logoutUser(){
    this.registrationService.logoutUser();
    this.isUserRegistered = false;
    this.registeredUser = null;
  }
}
