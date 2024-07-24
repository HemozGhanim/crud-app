import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //variables
  JWT_token: string = '';
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  API_key = 'AIzaSyCzBCPpGlVjQ2JvPfgl2-EpqmcX8MIxHGU';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  //call login server function
  login(data: any) {
    return this.http
      .post(`${this.baseUrl}signInWithPassword?key=${this.API_key}`, data)
      .pipe(
        tap((result: any) => {
          this.cookieService.set('authUser', JSON.stringify(result.idToken));
          this.cookieService.set('localId', JSON.stringify(result.localId));
          this.cookieService.set('userEmail', JSON.stringify(result.email));
        }),
        catchError((error) => {
          throw new Error(error);
        })
      );
  }

  //call signup server function
  signup(data: any) {
    console.log(data);
    return this.http
      .post(`${this.baseUrl}signUp?key=${this.API_key}`, data)
      .pipe(
        tap((result: any) => {
          this.cookieService.set('authUser', JSON.stringify(result.idToken));
          this.cookieService.set('localId', JSON.stringify(result.localId));
          this.cookieService.set('userEmail', JSON.stringify(result.email));
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  //function to signOut
  signOut() {
    this.cookieService.delete('authUser');
    this.cookieService.delete('localId');
    this.cookieService.delete('userEmail');
    this.isLoggedIn();
  }

  //function to check he is auth or not
  isLoggedIn() {
    if (this.cookieService.get('authUser')) {
      return true;
    }
    return false;
  }
}
