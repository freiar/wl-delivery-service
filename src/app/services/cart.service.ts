import { AddToCartPublisherService } from './add.to.cart.publisher.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CartUpdate } from '../interfaces/cart-update';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject to track the count of items in the cart
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  // Array to store the products in the cart
  private cart: Product[] = [];
  // Variable to store the current store ID
  private currentStoreId: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private addToCartPublisherService: AddToCartPublisherService
  ) {}

  // Function to update the cart count
  updateCartCount(count: number): void {
    console.log('Updating cart count:', count);
    this.cartCountSubject.next(count);
  }

  // Function to retrieve the current products in the cart
  getCart(): Product[] {
    return this.cart;
  }

  // Function to clear the cart
  clearCart(count: number = 0): void {
    console.log('Clearing the cart...');
    this.cart = [];
    this.currentStoreId = null;
    this.updateCart({ count, products: [] });
    console.log('Cart cleared successfully.');
  }

  // Function to update the cart with new products
  updateCart(cartUpdate: CartUpdate): void {
    // Update the cart count
    this.cartCountSubject.next(cartUpdate.count);
    // Update the cart array using the spread operator to create a new array
    this.cart = [...cartUpdate.products];
    // Notify the PublisherService about the cart update
    this.addToCartPublisherService.updateCart(cartUpdate);
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
