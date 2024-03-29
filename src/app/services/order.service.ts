import { OrderList } from './../interfaces/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../interfaces/order';
import { Observable, catchError, map } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private endpointUrl = '/assets/sample-data/order.json';

  constructor(private http: HttpClient, private router: Router) {}

  getOrders(): Observable<OrderList[]> {
    // Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .get<OrderList[]>(this.endpointUrl, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getOrder(): Observable<Order[]> {
    // Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .get<Order[]>(this.endpointUrl, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  createOrder(order: Order): Observable<Order> {
    // Header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post<Order>(this.endpointUrl, order, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Method to get a single order by its ID
  getOrderById(orderId: string): Observable<Order | undefined> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<Order[]>(this.endpointUrl, { headers }).pipe(
      catchError((error) => this.handleError(error)),
      // Filter the orders array based on orderId
      map((orders: any) =>
        orders.find((order: any) => order.orderId === orderId)
      )
    );
  }

  // to be used during implementation with backend
  private handleError(error: any): Observable<never> {
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
          this.router.navigate(['/login']);
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
