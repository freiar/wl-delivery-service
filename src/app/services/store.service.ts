import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Store } from '../interfaces/store';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Store } from '../interfaces/store';
import { StoreWithoutProducts } from '../interfaces/store-without-products';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private router: Router) {}

  private http = inject(HttpClient);

  private endpointUrl = '../assets/sample-data/stores.json';

  getStores() {
    return this.http.get(this.endpointUrl);
  }

  getStoreByName(name: string): Observable<Store | undefined> {
    // Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<Store[]>(this.endpointUrl, { headers }).pipe(
      map(
        (stores) =>
          (stores.find((store) => store.name === name) as Store) || undefined
      ),
      catchError(this.handleError) // Apply error handling using catchError operator
    );
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

  private storeEndpointUrl = "../assets/sample-data/stores.json";
  private storeByIdEndpointUrl = "../assets/sample-data/store.json";
  private mostFamousStoresEndpointUrl = "../assets/sample-data/most_famous_stores_in_general.json";

  getStores() {
    return this.http.get<Store[]>(this.storeEndpointUrl);
  }

  getMostFamousStores() {
    return this.http.get<StoreWithoutProducts[]>(this.mostFamousStoresEndpointUrl);
  }

  getStoreById(id: number) {
    return this.http.get<Store>(this.storeByIdEndpointUrl);

  }
}
