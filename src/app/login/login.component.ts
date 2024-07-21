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

  authService = inject(AuthService);
  router = inject(Router);
  loadding: boolean = false;

  constructor() {}
  ngOnInit(): void {}
  onSubmit() {
    if (this.credentials.valid) {
      this.loadding = true;
      this.authService.login(this.credentials.value).subscribe((data: any) => {
        if (this.authService.isLoggedIn()) {
          this.loadding = false;
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
