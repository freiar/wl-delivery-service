
import { Injectable } from '@angular/core';
import { Registration } from '../interfaces/registration';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  userChange = new BehaviorSubject<User | null>(null);
 

  private registrations : Registration[] = [];
  

  constructor(){
    let savedRegistrations = localStorage.getItem("registrations");
    this.registrations = savedRegistrations? JSON.parse(savedRegistrations) : [];
  }


  // CRUD
  getRegistrations(): Registration[] {
    return this.registrations;
  }

  getRegistration(id: number): Registration | undefined {
    return this.registrations.find(res => res.id === id);
  }

  addRegistration(registration: Registration): void {
    this.registrations.push(registration);
    console.log(this.registrations);
    localStorage.setItem("registrations", JSON.stringify(this.registrations));
    const user: User = registration.user;
    this.userChange.next(user);
  }
  
  deleteRegistration(id:number): void {
    let index = this.registrations.findIndex(res=> res.id === id);
    this.registrations.splice(index,1)
    localStorage.setItem("registrations", JSON.stringify(this.registrations));
  }

  updateRegistration(updatedRegistration: Registration): void {
    let index = this.registrations.findIndex(res => res.id === updatedRegistration.id);
    this.registrations[index] = updatedRegistration;
    localStorage.setItem("registrations", JSON.stringify(this.registrations));
  }

  logoutUser(){
    localStorage.removeItem('registrations');
    this.userChange.next(null);

    
  }

  

  
}