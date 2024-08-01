import { AuthService } from './../../core/services/auth.service';
import { Injectable, inject } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

// import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) {}

  authUser: string | null = '';

  canActivate(
    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot
  ): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
