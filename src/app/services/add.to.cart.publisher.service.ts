import { Product } from './../interfaces/product';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartUpdate } from '../interfaces/cart-update';

@Injectable({
  providedIn: 'root',
})
export class AddToCartPublisherService {
  // ReplaySubject to publish products with the ability for subscribers to receive previously emitted values
  private addToCartPublisher: ReplaySubject<Product> =
    new ReplaySubject<Product>();

  // ReplaySubject to publish cart updates
  private cartSubject: ReplaySubject<CartUpdate> =
    new ReplaySubject<CartUpdate>();

  constructor(private http: HttpClient, private router: Router) {}

  // Method to publish a product to subscribers
  publishProduct(data: Product) {
    this.addToCartPublisher.next(data);
  }

  // Method to listen for products and return an Observable with error handling
  listenForProduct(): Observable<Product> {
    return this.addToCartPublisher
      .asObservable()
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  // Method to update the cart and publish the update with error handling
  updateCart(update: CartUpdate): void {
    // Publish the updated cart count as a Product to subscribers with error handling
    this.addToCartPublisher.next({ count: update.count } as Product);
    // Publish the cart update to subscribers with error handling
    this.cartSubject.next(update);
  }

  // to be used during implementation with backend
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
