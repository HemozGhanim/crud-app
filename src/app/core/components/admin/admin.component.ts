import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { OrderData } from '../../../shared/interfaces/orders';
import { Subscription } from 'rxjs';
import { OrderComponent } from '../../../shared/components/order/order.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, OrderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit, OnDestroy {
  constructor(private _orderService: OrderService) {
    let LocalId: any = JSON.parse(localStorage.getItem('localId') as string);
    this.userLocalId = '';
    if (LocalId.startsWith('"') && LocalId.endsWith('"')) {
      this.userLocalId = LocalId.slice(1, -1);
    } else {
      this.userLocalId = LocalId;
    }
  }

  //user variables
  userLocalId: any;

  //new order variables
  orderData = '';
  destroyData: Subscription | undefined;
  dataLoading: boolean = false;

  //orders from DB variables
  orders: OrderData[] = [];

  //creation variables
  uploadOrder: any = null;
  Creat_Loading: boolean = false;
  createOrderError: any = null;
  orderNameExist: any = null;

  //delete variables
  deletedOrder: any = null;
  deletedOrderMessage: any = null;
  delete_Loading: number | null = null;
  delete_button_can_click: boolean = false;
  //edit variables
  EditorderData = '';
  edit: boolean = false;
  edit_Loading: boolean = false;
  editedOrder: any = null;

  //testing variables
  disabled: boolean = true;
  deleting_order: any;

  ngOnInit() {
    this.getOrders();
  }
  ngOnDestroy(): void {
    if (this.destroyData) {
      this.destroyData.unsubscribe();
    }
  }
  //get Orders
  getOrders() {
    // this.orders = [];
    this.dataLoading = true;
    this.destroyData = this._orderService
      .getOrders(this.userLocalId)
      .subscribe({
        next: (data: any) => {
          if (!data || Object.keys(data).length === 0 || data == null) {
            this.orders = [];
            this.dataLoading = false;
          } else {
            this.dataLoading = false;
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
      (this.orderData || '').trim().length === 0
    ) {
      this.createOrderError = true;
      this.Creat_Loading = false;
    } else {
      let orderIsExist = this.orders.some((el) => {
        return el.orderName.trim() === this.orderData.trim();
      });
      if (orderIsExist == true) {
        this.orderNameExist = true;
        this.Creat_Loading = false;
        setTimeout(() => {
          this.orderNameExist = null;
        }, 1000);
      } else {
        this.orderNameExist = false;
        this.createOrderError = false;
        this._orderService
          .createOrder(this.orderData, this.userLocalId)
          .subscribe({
            next: (data) => {
              this.Creat_Loading = false;
              this.uploadOrder = true;
              this.orders.unshift({
                id: data.name,
                orderName: this.orderData,
                isEditing: false,
                isDone: false,
              });
              this.orderData = '';
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
  }

  //edit Orders
  handleDataChange(updatedData: string) {
    this.EditorderData = updatedData;
  }
  EditOrder(editedData: any, order: OrderData, _index: number) {
    this.checkInputField(editedData, order);
    console.log(this.checkInputField(editedData, order));
    this.edit_Loading = true;
    this._orderService
      .editOrder(editedData, order, this.userLocalId)
      .subscribe({
        next: (data) => {
          console.log('edited');
          this.orders.map((el, index) => {
            index == _index ? (el.orderName = editedData) : null;
          });
          this.edit_Loading = false;
          this.editedOrder = true;
          this.toggleEdit(order);
          this.orders[_index] = {
            id: order.id,
            orderName: editedData,
            isEditing: false,
            isDone: false,
          };
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
    this.delete_button_can_click = true;
    this._orderService.deleteOrder(order, this.userLocalId).subscribe({
      next: (data) => {
        this.uploadOrder = null;
        this.delete_Loading = null;
        this.deletedOrder = index;
        this.deletedOrderMessage = true;
        setTimeout(() => {
          this.deletedOrder = null;
          this.orders.splice(index, 1);
          this.uploadOrder = null;
          this.deletedOrderMessage = null;
          this.delete_button_can_click = false;
        }, 500);
      },
      error: (err) => {
        this.delete_Loading = null;
        this.delete_button_can_click = false;
        this.deletedOrderMessage = false;
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
