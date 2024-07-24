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
  //new order variables
  orderData = '';

  //orders from DB variables
  orders: OrderData[] = [];

  //creation variables
  uploadOrder: any = null;
  Creat_Loading: boolean = false;

  //delete variables
  deletedOrder: any = null;
  delete_Loading: boolean = false;

  //edit variables
  EditorderData = '';
  edit: boolean = false;
  edit_Loading: boolean = false;
  editedOrder: any = null;

  //testing variables
  disabled: boolean = true;

  constructor(private _orderService: OrderService) {
    this.getOrders();
  }
  ngOnInit(): void {}
  //get Orders
  getOrders() {
    this._orderService.getOrders().subscribe({
      next: (data: any) => {
        if (!data || Object.keys(data).length === 0) {
          this.orders = [];
          return;
        }
        this.orders = [];
        for (const [key, value] of Object.entries(data)) {
          // Assign the id from the key
          const orderWithId = { ...(value as object), id: key } as OrderData;
          this.orders.unshift(orderWithId);
        }
      },
      error: (error) => {
        console.log(error);
        throw new Error(error);
      },
    });
  }

  //create Orders
  createOrder() {
    this.Creat_Loading = true;
    this._orderService.createOrder(this.orderData).subscribe({
      next: (data) => {
        this.Creat_Loading = false;
        this.uploadOrder = true;
        this.orderData = '';
        this.getOrders();
        setTimeout(() => {
          this.uploadOrder = null;
        }, 2000);
      },
      error: (err) => {
        this.Creat_Loading = false;
        this.uploadOrder = false;
      },
    });
  }

  //edit Orders

  EditOrder(editedData: any, order: OrderData) {
    this.checkInputField(editedData, order);
    this.edit_Loading = true;
    this._orderService.editOrder(editedData, order).subscribe({
      next: (data) => {
        this.orders.map((el) => {
          el.id == order.id ? (el.orderName = editedData) : null;
        });
        this.edit_Loading = false;
        this.editedOrder = true;
        this.toggleEdit(order);
        this.getOrders();
        setTimeout(() => {
          this.editedOrder = null;
        }, 2000);
      },
      error: (err) => {
        this.edit_Loading = false;
        this.editedOrder = false;
        console.log(err);
      },
    });
  }

  //delete Orders
  deleteOrder(order: OrderData) {
    this.delete_Loading = true;
    this._orderService.deleteOrder(order).subscribe({
      next: (data) => {
        this.uploadOrder = null;
        this.delete_Loading = false;
        this.deletedOrder = true;
        this.getOrders();
        setTimeout(() => {
          this.deletedOrder = null;
          this.uploadOrder = null;
        }, 2000);
      },
      error: (err) => {
        this.delete_Loading = false;
        this.deletedOrder = false;
        console.log(err);
      },
    });
  }

  // helpers functions
  EditAndPutEditedData(order: any, editedData?: any) {
    this.checkInputField(editedData, order);

    this.toggleEdit(order);
    this.putEditData(order);
  }
  toggleEdit(order: any) {
    order.isEditing = !order.isEditing;
  }
  putEditData(order: any) {
    this.EditorderData = order.orderName;
  }
  checkInputField(editedData: any, order: OrderData) {
    if (editedData == order.orderName) {
      return (this.disabled = true);
    } else if (editedData == '') {
      return (this.disabled = true);
    } else {
      return (this.disabled = false);
    }
  }
}
