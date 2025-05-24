import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/test-cases']);
    } else {
      this.error = 'Hibás felhasználónév vagy jelszó!';
    }
  }
}