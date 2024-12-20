import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
   constructor(private router: Router,private authService: AuthService) {}
  
   ngOnInit(): void {
    // If the user is not authenticated, redirect to login
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
  // Navigate to Book List
  goToBookList(): void {
    this.router.navigate(['/book-list']);
  }

  // Navigate to Quote List
  goToQuoteList(): void {
    this.router.navigate(['/quote-list']);
  }
  // Logout User
  logout(): void {
    this.authService.logout();
  }
}