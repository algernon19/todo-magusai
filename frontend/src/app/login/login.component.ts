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
    this.auth.login(
      this.username,
      this.password
    ).subscribe({
      next: () => this.router.navigate(['/test-cases']),
      error: (err: any) => {
        this.error = err.error?.error || 'Hibás felhasználónév vagy jelszó!';
      }
    });
  }

  goToRegister() {
  this.router.navigate(['/register']);
}

}
