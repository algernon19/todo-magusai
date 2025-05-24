import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //private baseUrl = 'http://localhost/api';
  private baseUrl = `${window.location.origin}/api`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
     return this.http.post(`${this.baseUrl}/auth/login`, { username, password }).pipe(
       tap((res: any) => {
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('loggedIn', 'true');
       })
     );
   }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      username,
      email,
      password
    });
   }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
   }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
