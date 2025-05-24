import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    // Ellenőrzés: jelszavak egyeznek-e
    if (this.password !== this.confirmPassword) {
      this.error = 'A jelszavak nem egyeznek meg.';
      return;
    }

    // Regisztrációs hívás
    this.auth.register(
      this.username,
      this.email,
      this.password
    ).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => {
        this.error = err.error?.error || 'A regisztráció sikertelen';
      }
    });
  }

  goToLogin() {
  this.router.navigate(['/']);
}
}
