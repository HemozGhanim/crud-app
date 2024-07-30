import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userData } from '../../../shared/interfaces/userdata';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  //create user data
  protected createUserData: FormGroup<userData> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    returnSecureToken: new FormControl(true),
  });

  //variables
  loadding: boolean = false;
  confirmPassword: string = '';
  responseError: boolean = false;
  createdSuccess: boolean = false;
  errorMessages: string = '';
  userLocalId: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private cookieService: CookieService,
    private orderService: OrderService
  ) {
    let LocalId = this.cookieService.get('localId');
    this.userLocalId = '';
    if (LocalId.startsWith('"') && LocalId.endsWith('"')) {
      this.userLocalId = LocalId.slice(1, -1);
    } else {
      this.userLocalId = LocalId;
    }
  }

  //function to create account
  /**
   * @function onSubmitCreateAccount
   * @description This function is used to create a new account for the user
   * @returns {void}
   */

  onSubmitCreateAccount(): void {
    if (this.createUserData.valid) {
      this.loadding = true;
      this._authService.signup(this.createUserData.value).subscribe({
        next: (data) => {
          this.cookieService.set('authUser', JSON.stringify(data.idToken));
          this.cookieService.set('localId', JSON.stringify(data.localId));
          this.cookieService.set('userEmail', JSON.stringify(data.email));
          this.loadding = true;
          this.responseError = false;
          this.createdSuccess = true;
          this.orderService.getOrders(this.userLocalId);
          setTimeout(() => {
            this.createdSuccess = false;
            this.createUserData.reset();
            this._router.navigate(['/home']);
          }, 1500);
        },
        error: (error) => {
          this.loadding = false;
          this.createdSuccess = false;
          this.responseError = true;
          this.errorMessages = error.error.error.message;
        },
      });
    }
  }
}
