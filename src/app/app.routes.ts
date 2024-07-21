import { Routes, CanActivateFn } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth/auth.guard';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
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
    path: 'admin',
    component: AdminComponent,
    canActivate: [() => inject(authGuard).canActivate() as CanActivateFn[]],
  },
  {
    path: 'no-access',
    component: NoAccessComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
