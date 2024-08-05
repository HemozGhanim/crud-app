import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  //variables
  JWT_token: string = '';
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  API_key = 'AIzaSyCzBCPpGlVjQ2JvPfgl2-EpqmcX8MIxHGU';

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
    localStorage.clear();
    this.isLoggedIn();
  }

  //function to check he is auth or not

  get localData() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authUser');
    }
    return null;
  }
  isLoggedIn() {
    if (this.localData) {
      return true;
    }
    return false;
  }
}
