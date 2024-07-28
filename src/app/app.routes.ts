import { Routes } from '@angular/router';
import { AdminComponent } from './shared/components/admin/admin.component';
import { HomeComponent } from '../app/shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from '../app/features/auth/auth.guard';
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
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./shared/components/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
