import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './../../../core/services/auth.service';
import { OrderService } from './../../../core/services/order.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isloggedin: any;
  userEmail: string = '';
  userData: any;
  router = inject(Router);
  userId: any;
  ordersQuantity: number = 0;

  constructor(
    private _authService: AuthService,
    private _orderService: OrderService
  ) {
    let LocalId = JSON.parse(localStorage.getItem('localId') || '');
    this.userId = '';
    if (LocalId.startsWith('"') && LocalId.endsWith('"')) {
      this.userId = LocalId.slice(1, -1);
    } else {
      this.userId = LocalId;
    }
    this._orderService.getOrders(this.userId).subscribe((data: any) => {
      if (data != null || data != undefined) {
        this.ordersQuantity = Object.keys(data || {}).length;
      } else {
        this.ordersQuantity = 0;
      }
    });
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userEmail') || '');
    this.userEmail = '';
    if (this.userData.startsWith('"') && this.userData.endsWith('"')) {
      this.userEmail = this.userData.slice(1, -1);
    } else {
      this.userEmail = this.userData;
    }
    this.isloggedin = this._authService.isLoggedIn();
  }
}
