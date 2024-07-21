import { Component } from '@angular/core';
import { authGuard } from '../auth/auth.guard';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  orders = [
    {
      name: 'order1',
    },
    {
      name: 'order2',
    },
    {
      name: 'order3',
    },
    {
      name: 'order4',
    },
  ];
}
