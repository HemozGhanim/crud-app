import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { OrderData } from '../../interfaces/orders';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit, OnDestroy {
  //new order variables
  orderData = '';
  destroyData: Subscription | undefined;

  //orders from DB variables
  orders: OrderData[] = [];

  //creation variables
  uploadOrder: any = null;
  Creat_Loading: boolean = false;
  createOrderError: any = null;
  //delete variables
  deletedOrder: any = null;
  deletedOrderError: any = null;
  delete_Loading: number | null = null;

  //edit variables
  EditorderData = '';
  edit: boolean = false;
  edit_Loading: boolean = false;
  editedOrder: any = null;

  //testing variables
  disabled: boolean = true;
  deleting_order: any;
  constructor(private _orderService: OrderService) {
    // this.getOrders();
  }
  ngOnInit() {
    this.orders = [];
    this.destroyData = this._orderService.getOrders().subscribe({
      next: (data: any) => {
        if (!data || Object.keys(data).length === 0 || data == null) {
          this.orders = [];
        } else {
          this.orders = [];
          console.log(data);
          for (const [key, value] of Object.entries(data)) {
            // Assign the id from the key
            const orderWithId = {
              ...(value as object),
              id: key,
            } as OrderData;
            this.orders.unshift(orderWithId);
          }
        }
      },
      error: (error) => {
        console.log(error);
        throw new Error(error);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.destroyData) {
      this.destroyData.unsubscribe();
    }
  }
  //get Orders
  getOrders() {
    this.orders = [];
    this._orderService.getOrders().subscribe({
      next: (data: any) => {
        if (!data || Object.keys(data).length === 0 || data == null) {
          this.orders = [];
        } else {
          this.orders = [];
          console.log(data);
          for (const [key, value] of Object.entries(data)) {
            // Assign the id from the key
            const orderWithId = {
              ...(value as object),
              id: key,
            } as OrderData;
            this.orders.unshift(orderWithId);
          }
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
    if (
      this.orderData == '' ||
      this.orderData == null ||
      this.orderData == ' '
    ) {
      this.createOrderError = true;
      this.Creat_Loading = false;
    } else {
      this.createOrderError = false;
      this._orderService.createOrder(this.orderData).subscribe({
        next: (data) => {
          this.Creat_Loading = false;
          this.uploadOrder = true;
          this.orderData = '';
          this.getOrders();
          setTimeout(() => {
            this.uploadOrder = null;
          }, 500);
        },
        error: (err) => {
          this.Creat_Loading = false;
          this.uploadOrder = false;
        },
      });
    }
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
  deleteOrder(order: OrderData, index: number) {
    this.delete_Loading = index;
    // await this.checkDeletedField(order);
    this._orderService.deleteOrder(order).subscribe({
      next: (data) => {
        this.uploadOrder = null;
        this.delete_Loading = null;
        this.deletedOrder = index;
        this.deletedOrderError = true;
        setTimeout(() => {
          this.deletedOrder = null;
          this.getOrders();
          this.uploadOrder = null;
          this.deletedOrderError = null;
        }, 500);
      },
      error: (err) => {
        this.delete_Loading = null;
        this.deletedOrderError = false;
        this.deletedOrder = null;
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
    } else if ((editedData || '').trim().length === 0) {
      return (this.disabled = true);
    } else {
      return (this.disabled = false);
    }
  }
}
