import { Routes } from '@angular/router';
import { authGuard } from '../app/features/auth/auth.guard';
import { isLoggedGuard } from '../app/features/auth/islogged.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./shared/components/home/home.component').then(
        (c) => c.HomeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./shared/components/admin/admin.component').then(
        (c) => c.AdminComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [isLoggedGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./shared/components/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
    canActivate: [isLoggedGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
