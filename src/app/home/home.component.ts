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
    this.userData = this.cookieService.get('userEmail') || '';
    this.userEmail = JSON.parse(this.userData);
    this.isloggedin = this.service.isLoggedIn();
  }
}
