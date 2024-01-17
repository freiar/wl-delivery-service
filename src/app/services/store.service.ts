import { Store } from '../interfaces/store';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { StoreWithoutProducts } from '../interfaces/store-without-products';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private router: Router) {}

  private http = inject(HttpClient);
  private EndpointUrl = '../assets/sample-data/stores.json';
  private endpointGetTop8StoresPerFoodCategory =
    'assets/sample-data/most_famous_stores_per_food_category.json';
  private endpointGetTop8StoresPerDrinkCategory =
    'assets/sample-data/most_famous_stores_per_drink_category.json';
  private storeByIdEndpointUrl = '../assets/sample-data/store.json';
  private mostFamousStoresEndpointUrl =
    '../assets/sample-data/most_famous_stores_in_general.json';

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.EndpointUrl);
  }

  getMostFamousStores(): Observable<StoreWithoutProducts[]> {
    return this.http.get<StoreWithoutProducts[]>(
      this.mostFamousStoresEndpointUrl
    );
  }

  getStoreById(id: number) {
    return this.http.get<Store>(this.storeByIdEndpointUrl);
  }

  getStoreByName(name: string): Observable<Store | undefined> {
    // Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<Store[]>(this.EndpointUrl, { headers }).pipe(
      map(
        (stores: any) =>
          (stores.find((store: any) => store.name === name) as Store) ||
          undefined
      ),
      catchError(this.handleError) // Apply error handling using catchError operator
    );
  }

  getTop8StoresByFoodCategory(): Observable<Store[]> {
    // Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<Store[]>(this.endpointGetTop8StoresPerFoodCategory, {
      headers,
    });
  }

  getTop8StoresByDrinkCategory(): Observable<Store[]> {
    // Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<Store[]>(this.endpointGetTop8StoresPerDrinkCategory, {
      headers,
    });
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
