import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

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
  //user data
  protected credentials = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    returnSecureToken: new FormControl(true),
  });

  //variables
  loadding: boolean = false;
  responseError: boolean = false;
  errorMessages: string = '';
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  //funciton on login

  onSubmit() {
    if (this.credentials.valid) {
      this.loadding = true;
      this._authService.login(this.credentials.value).subscribe({
        next: (data) => {
          this.cookieService.set('authUser', JSON.stringify(data.idToken));
          this.cookieService.set('localId', JSON.stringify(data.localId));
          this.cookieService.set('userEmail', JSON.stringify(data.email));
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
          console.log(error);
          if (error.error.error.message == 'INVALID_LOGIN_CREDENTIALS') {
            this.errorMessages = 'Invalid E-mail or Password';
          }
        },
      });
    }
  }
}
