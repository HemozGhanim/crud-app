import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private router: Router, private cookieService: CookieService) {}
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
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
