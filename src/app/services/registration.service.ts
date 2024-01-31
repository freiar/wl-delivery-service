import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private isRegisteredSubject: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    // Initialize with the value from local storage or default to false
    const isRegistered =
      localStorage.getItem('isRegistered') === 'true' || false;
    this.isRegisteredSubject = new BehaviorSubject<boolean>(isRegistered);
  }

  isRegistered(): Observable<boolean> {
    return this.isRegisteredSubject.asObservable();
  }

  registerUser() {
    // Update the local storage and notify subscribers
    localStorage.setItem('isRegistered', 'true');
    this.isRegisteredSubject.next(true);

    this.router.navigate(['/home']);
  }

  setRegistrationStatus(isRegistered: boolean) {
    // Update the local storage and notify subscribers
    localStorage.setItem('isRegistered', isRegistered.toString());
    this.isRegisteredSubject.next(isRegistered);
  }

  // Add a method to check if the user is registered (e.g., for the initial check)
  isUserRegistered(): boolean {
    return this.isRegisteredSubject.value;
  }

  logoutUser() {
    localStorage.removeItem('registrations');
    this.isRegisteredSubject.next(false);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong';

    if (error.status) {
      switch (error.status) {
        // Successful responses
        case 200:
          console.log('Request successful:', error.url);
          break;
        case 201:
          console.log('Resource created successfully:', error.url);
          break;
        case 202:
          console.log('Request accepted:', error.url);
          break;
        case 204:
          console.log('Request successful with no content:', error.url);
          break;

        // Client errors
        case 400:
          errorMessage = 'Bad Request';
          break;
        case 401:
          errorMessage = 'Unauthorized';
          // Redirect to the login page
          this.router.navigate(['/register']);
          break;
        case 403:
          errorMessage = 'Forbidden';
          // Redirect to the Error403 component
          this.router.navigate(['/error403']);
          break;
        case 404:
          errorMessage = 'Not Found';
          // Redirect to the error404 page
          this.router.navigate(['/error404']);
          break;

        // Server error
        case 500:
          errorMessage = 'Internal Server Error';
          break;

        // Default case for other status codes
        default:
          errorMessage = `Error ${error.status}`;
          break;
      }
    }
    // Logs the detailed error for debugging purposes
    console.error(error);

    // Pass the error message to the caller
    return throwError(() => new Error(errorMessage));
  }
}
