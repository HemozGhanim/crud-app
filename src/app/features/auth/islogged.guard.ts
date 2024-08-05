import { Injectable } from '@angular/core';
import { AuthService } from './../../core/services/auth.service';

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
  constructor(private router: Router, private _authService: AuthService) {}

  authUser: string | null = '';

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
