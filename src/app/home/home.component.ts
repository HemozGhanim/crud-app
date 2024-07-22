import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  providers: [AuthService, CookieService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isloggedin: any;
  userEmail: string = '';
  userData: any;
  router = inject(Router);

  constructor(
    private service: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userData = this.cookieService.get('authUser') || '';
    this.userEmail = this.userData ? JSON.parse(this.userData).email : '';
    this.isloggedin = this.service.isLoggedIn();
  }
}
