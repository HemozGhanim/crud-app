// import { inject } from '@angular/core';

// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.isLoggedIn()) {
//     return true;
//   }
//   router.navigate(['/login']);
//   return false;
// };
import { Injectable } from '@angular/core';

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
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.router.url === '/login' || this.router.url === '/signup') {
        return true;
      }
      if (this.router.url !== '/login' && this.router.url !== '/signup') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
