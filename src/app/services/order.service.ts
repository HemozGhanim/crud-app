import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderData } from '../models/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'https://likecard-e68b3-default-rtdb.firebaseio.com/';
  userLocalId: string = '';
  uploaded: any = null;
  orders: OrderData[] = [];

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private _AuthService: AuthService
  ) {
    this.userLocalId = JSON.parse(this._cookieService.get('localId'));
  }
  getOrders() {
    return this.http
      .get(`${this.baseUrl}orders/${this.userLocalId}.json`)
      .subscribe({
        next: (data) => {
          if (data == null) {
            return;
          }
          this.orders = Object.values(data);
        },
        error: (error) => {
          console.log(error);
          throw new Error(error);
        },
      });
  }
  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}orders/${this.userLocalId}.json`, {
      orderName: order,
    });
  }
}
