import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedin: any;
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLoggedin = this.authService.isLoggedIn();
      }
    });
  }
  public signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
