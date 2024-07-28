import { AuthService } from '../../../core/services/auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { userData } from '../../interfaces/userdata';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  //create user data
  protected createUserData: FormGroup<userData> = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    returnSecureToken: new FormControl(true),
  });

  //variables
  loadding: boolean = false;
  confirmPassword: string = '';
  responseError: boolean = false;
  createdSuccess: boolean = false;
  errorMessages: string = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  //function to create account
  /**
   * @function onSubmitCreateAccount
   * @description This function is used to create a new account for the user
   * @returns {void}
   */
  onSubmitCreateAccount(): void {
    console.log(this.createUserData.valid);
    if (this.createUserData.valid) {
      this.loadding = true;
      this._authService.signup(this.createUserData.value).subscribe(
        (data: any) => {
          if (this._authService.isLoggedIn()) {
            this.loadding = true;
            this.responseError = false;
            this.createdSuccess = true;
            setTimeout(() => {
              this.createdSuccess = false;
              this.createUserData.reset();
              this._router.navigate(['/home']);
            }, 1500);
          } else {
            this.loadding = false;
            this.createdSuccess = false;
            this.responseError = true;
          }
        },
        (error) => {
          this.loadding = false;
          this.createdSuccess = false;
          this.responseError = true;
          this.errorMessages = error.error.error.message;
        }
      );
    }
  }
}
