import { Component, inject, OnChanges, OnInit, DoCheck } from '@angular/core';
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
export class NavbarComponent implements OnInit, DoCheck {
  //variavle to check he is authenticated or not
  isLoggedin: any;

  constructor(private _authService: AuthService, private _router: Router) {}

  //to check if he auth
  ngOnInit(): void {
    this.isLoggedin = this._authService.isLoggedIn();
  }
  ngDoCheck(): void {
    this.isLoggedin = this._authService.isLoggedIn();
  }

  //function to signout
  signOut() {
    this._authService.signOut();
    this._router.navigate(['login']);
  }
}
