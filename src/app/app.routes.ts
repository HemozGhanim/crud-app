import { Routes, CanActivateFn } from '@angular/router';
import { AdminComponent } from './shared/components/admin/admin.component';
import { HomeComponent } from '../app/shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from '../app/features/auth/auth.guard';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'orders',
    component: AdminComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
