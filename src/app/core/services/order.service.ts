import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderData } from '../../shared/interfaces/orders';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //variabes
  baseUrl = 'https://likecard-e68b3-default-rtdb.firebaseio.com/';
  userLocalId: string = '';
  orders: OrderData[] = [];

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private _AuthService: AuthService
  ) {
    let LocalId = this._cookieService.get('localId');
    this.userLocalId = '';
    if (LocalId.startsWith('"') && LocalId.endsWith('"')) {
      this.userLocalId = LocalId.slice(1, -1);
    } else {
      this.userLocalId = LocalId;
    }
  }

  //call to get orders from database ( server ) 'using firebase realtime DB '
  getOrders(userId: string) {
    return this.http.get(
      `${this.baseUrl}orders/${userId}/created.json`
    );
  }

  //call to create order and push to database ( server ) 'using firebase realtime DB '
  createOrder(order: any, userId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}orders/${userId}/created.json`,
      {
        orderName: order,
        isEditing: false,
        isDone: false,
      }
    );
  }

  //call to edit order and push to database ( server ) 'using firebase realtime DB '
  editOrder(_editedData: string, _order: OrderData): Observable<any> {
    return this.http.put(
      `${this.baseUrl}orders/${this.userLocalId}/created/${_order.id}.json`,
      {
        orderName: _editedData,
        id: _order.id,
        isEditing: false,
        isDone: false,
      }
    );
  }

  //call to delete order from database ( server ) 'using firebase realtime DB '
  deleteOrder(_order: OrderData): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}orders/${this.userLocalId}/created/${_order.id}.json`
    );
  }
}
