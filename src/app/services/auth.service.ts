import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import e from 'express';
import { FormGroup } from '@angular/forms';
import { userData } from '../models/userdata';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  JWT_token: string = '';
  isLoggedInVar: any = '';
  authListener = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  API_key = 'AIzaSyCzBCPpGlVjQ2JvPfgl2-EpqmcX8MIxHGU';
  login(data: any) {
    return this.http
      .post(`${this.baseUrl}signInWithPassword?key=${this.API_key}`, data)
      .pipe(
        tap((result: any) => {
          this.cookieService.set('authUser', JSON.stringify(result));
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  signup(data: any) {
    console.log(data);
    return this.http
      .post(`${this.baseUrl}signUp?key=${this.API_key}`, data)
      .pipe(
        tap((result: any) => {
          this.cookieService.set('authUser', JSON.stringify(result));
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  signOut() {
    this.cookieService.delete('authUser');
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (this.cookieService.get('authUser')) {
      return true;
    }
    return false;
  }
}
