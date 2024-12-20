import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response && response.token) {
          console.log('Login response:', response); 
          this.authService.storeToken(response.token); // Save the token
          console.log('Token saved:', localStorage.getItem('jwt-token'));
          this.router.navigate(['/home']); // Redirect to home page
        } else {
          this.errorMessage = 'Login failed: Invalid response from server';
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login error:', error);
      }
    );
  }
}
