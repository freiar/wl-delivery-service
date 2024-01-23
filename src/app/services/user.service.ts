import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registeredUser: User | null = null;

  getRegisteredUser(): User | null {
    return this.registeredUser;
  }

  setRegisteredUser(user: User): void {
    this.registeredUser = user;
  }

  clearRegisteredUser(): void {
    this.registeredUser = null;
  }



}
