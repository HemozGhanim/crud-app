import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  isLoggedIn() {
    if (this.cookieService.get('authUser')) {
      return true;
    }

    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}