import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderData } from '../../interfaces/orders';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  @Input() order!: OrderData;
  @Input() index!: number;
  @Input() EditedData!: any;
  @Input() delete_button_can_click!: boolean;
  @Input() delete_Loading!: number | null;
  @Input() deletedOrder!: any;
  @Input() disabled!: boolean;
  @Input() edit_Loading!: boolean;
  @Input() editedOrder: any = null;

  //functions
  @Input() orders!: any;

  @Output() deleteOrderFun = new EventEmitter<void>();
  @Output() editOrderFun = new EventEmitter<void>();
  @Output() checkInputFieldFun = new EventEmitter<void>();
  @Output() EditAndPutEditedData = new EventEmitter<void>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onDeleteOrder() {
    this.deleteOrderFun.emit();
  }
  onEditOrder() {
    this.dataChange.emit(this.EditedData);
    this.editOrderFun.emit();
  }
  onCheckInputField() {
    this.checkInputFieldFun.emit();
  }
  onEditAndPutEditedData() {
    this.EditAndPutEditedData.emit();
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
  doubleCheck(editedData: any, order: OrderData) {
    this.checkInputField(editedData, order);
    this.onCheckInputField();
  }
}
