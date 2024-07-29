import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
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
  login(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}signInWithPassword?key=${this.API_key}`,
      data
    );
  }

  //call signup server function
  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}signUp?key=${this.API_key}`, data);
  }

  //function to signOut
  signOut() {
    this.cookieService.deleteAll();
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
