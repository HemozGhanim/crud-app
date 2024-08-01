import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class isLoggedGuard implements CanActivate {
  constructor(private router: Router) {}

  authUser: string | null = '';

  isLoggedIn() {
    if (window.localStorage.getItem('authUser')) {
      return true;
    }
    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
