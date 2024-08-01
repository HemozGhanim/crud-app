import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { NgOptimizedImage } from '@angular/common';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, NgOptimizedImage],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}
  //user data
  protected credentials = new FormGroup({
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

  //variables
  loadding: boolean = false;
  responseError: boolean = false;
  errorMessages: string = '';
  showPassword: boolean = false;

  ngOnInit(): void {}
  //toggle password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  //funciton on login
  get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }
  onSubmit() {
    if (this.credentials.valid) {
      this.loadding = true;
      this._authService.login(this.credentials.value).subscribe({
        next: (data) => {
          window.localStorage.setItem('authUser', JSON.stringify(data.idToken));
          window.localStorage.setItem('localId', JSON.stringify(data.localId));
          window.localStorage.setItem('userEmail', JSON.stringify(data.email));
          if (this._authService.isLoggedIn()) {
            this.loadding = true;
            this.responseError = false;
            this._router.navigate(['/home']);
          } else {
            this.loadding = false;
            this.responseError = true;
          }
        },
        error: (error) => {
          this.loadding = false;
          this.responseError = true;
          this.errorMessages = error.error.error.message;
        },
      });
    }
  }
}
