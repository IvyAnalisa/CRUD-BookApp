import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  //private apiUrl = 'environment.apiUrl/auth';
  private apiUrl = 'environment.apiUrl';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

 

  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders(); // Return empty headers if no token exists
    }
  }
  // Check if the user is authenticated by checking the existence of a valid token
  isAuthenticated(): boolean {
    const token = this.getToken();
       return token != null;
  }
}

