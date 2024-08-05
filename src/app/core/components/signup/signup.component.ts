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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private orderService: OrderService
  ) {}
  //create user data
  protected createUserData: FormGroup<userData> = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^[a-zA-Z][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z][a-zA-Z0-9-]*\.[a-zA-Z]{2,}$/
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    returnSecureToken: new FormControl(true),
  });
  //confirm password
  protected confirmPassword = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  //variables
  loadding: boolean = false;
  responseError: boolean = false;
  createdSuccess: boolean = false;
  errorMessages: string = '';
  userLocalId: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  toggleShowPassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  toggleShowPassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  get email() {
    return this.createUserData.get('email');
  }

  get password() {
    return this.createUserData.get('password');
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
          localStorage.setItem('authUser', JSON.stringify(data.idToken));
          localStorage.setItem('localId', JSON.stringify(data.localId));
          localStorage.setItem('userEmail', JSON.stringify(data.email));
          this.loadding = true;
          this.responseError = false;
          this.createdSuccess = true;
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

  checkControlValidation(
    controller: any,
    controllerValue: boolean | undefined
  ) {
    if (controllerValue) {
      return 'is-valid';
    } else {
      if (controller.value == '') {
        return '';
      } else {
        return 'is-invalid';
      }
    }
  }

  confimPasswordCheck() {
    if (
      this.confirmPassword.value == this.password?.value &&
      !this.confirmPassword.hasError('minlength') &&
      this.confirmPassword.value != '' &&
      this.password?.value != ''
    ) {
      return 'is-valid';
    } else {
      if (this.confirmPassword.value == '') {
        return '';
      } else {
        return 'is-invalid';
      }
    }
  }
}
