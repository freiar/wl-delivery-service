import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  // Handle HTTP errors - to be used during implementation with backend
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
    return throwError(() => Error(errorMessage));
  }
}
