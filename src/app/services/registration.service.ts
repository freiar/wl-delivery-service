
import { Injectable } from '@angular/core';
import { Registration } from '../interfaces/registration';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  private registrations : Registration[] = [];

  // CRUD
  getRegistrations(): Registration[] {
    return this.registrations;
  }

  getRegistration(id: number): Registration | undefined {
    return this.registrations.find(res => res.id === id);
  }

  addRegistration(registration: Registration): void {
    this.registrations.push(registration);
  }

  deleteRegistration(id:number): void {
    let index = this.registrations.findIndex(res=> res.id === id);
    this.registrations.splice(index,1)
  }

  updateRegistration(updatedRegistration: Registration): void {
    let index = this.registrations.findIndex(res => res.id === updatedRegistration.id);
    this.registrations[index] = updatedRegistration;
  }

  

  
}