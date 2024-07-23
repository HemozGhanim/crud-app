import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { catchError, pipe, tap } from 'rxjs';
import { OrderData } from '../models/orders';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  orderData = '';
  EditorderData = '';
  edit: boolean = false;
  orders: OrderData[] = [];
  uploadOrder: any = null;
  loadding: boolean = false;

  constructor(private _orderService: OrderService) {
    this.getOrders();
  }
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this._orderService.getOrders().subscribe({
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
  createOrder() {
    this.loadding = true;
    this._orderService.createOrder(this.orderData).subscribe({
      next: (data) => {
        this.loadding = false;
        this.uploadOrder = true;
        this.orderData = '';
        this.getOrders();
        setTimeout(() => {
          this.uploadOrder = null;
        }, 2000);
      },
      error: (err) => {
        this.loadding = false;
        this.uploadOrder = false;
      },
    });
  }
  EditOrder(EditorderData: string) {}
}
