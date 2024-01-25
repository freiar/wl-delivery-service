import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpointUrl = 'assets/sample-data/user.json';
  private registeredUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  getRegisteredUser(): User | null {
    return this.registeredUser;
  }

  setRegisteredUser(user: User): void {
    this.registeredUser = user;
  }

  clearRegisteredUser(): void {
    this.registeredUser = null;
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.endpointUrl);
  }
}
