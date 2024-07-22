import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  protected credentials = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    returnSecureToken: new FormControl(true),
  });
  loadding: boolean = false;
  responseError: boolean = false;
  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit(): void {}
  onSubmit() {
    if (this.credentials.valid) {
      this.loadding = true;
      this._authService.login(this.credentials.value).subscribe((data: any) => {
        if (this._authService.isLoggedIn()) {
          this.loadding = true;
          this.responseError = false;
          this._router.navigate(['/home']);
        } else {
          this.loadding = false;
          this.responseError = true;
        }
      });
    }
  }
}
