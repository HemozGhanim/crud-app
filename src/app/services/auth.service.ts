import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  JWT_token: any;
  isLoggedInVar: any = '';
  authListener = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  baseUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzBCPpGlVjQ2JvPfgl2-EpqmcX8MIxHGU';
  login(data: any) {
    return this.http.post(`${this.baseUrl}`, data).pipe(
      tap((result: any) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      })
    );
  }

  signOut() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
