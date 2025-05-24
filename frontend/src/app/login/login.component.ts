import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Hibás felhasználónév vagy jelszó!';
    }
  }
}