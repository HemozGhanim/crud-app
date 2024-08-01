import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderData } from '../../shared/interfaces/orders';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  //variabes
  baseUrl = 'https://likecard-e68b3-default-rtdb.firebaseio.com/';
  orders: OrderData[] = [];

  //call to get orders from database ( server ) 'using firebase realtime DB '
  getOrders(userId: string) {
    return this.http.get(`${this.baseUrl}orders/${userId}/created.json`);
  }

  //call to create order and push to database ( server ) 'using firebase realtime DB '
  createOrder(order: any, userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}orders/${userId}/created.json`, {
      orderName: order,
      isEditing: false,
      isDone: false,
    });
  }

  //call to edit order and push to database ( server ) 'using firebase realtime DB '
  editOrder(
    _editedData: string,
    _order: OrderData,
    userId: string
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}orders/${userId}/created/${_order.id}.json`,
      {
        orderName: _editedData,
        id: _order.id,
        isEditing: false,
        isDone: false,
      }
    );
  }

  //call to delete order from database ( server ) 'using firebase realtime DB '
  deleteOrder(_order: OrderData, userid: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}orders/${userid}/created/${_order.id}.json`
    );
  }
}
