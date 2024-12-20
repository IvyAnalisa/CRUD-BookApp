import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = []; // Use consistent property name

  constructor(
    private quoteService: QuoteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If the user is not authenticated, redirect to login
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
    } else {
      this.getQuotes();
    }
  }

  // Fetch quotes method
  getQuotes(): void {
    this.quoteService.getQuotes().subscribe(
      (data: Quote[]) => {
        this.quotes = data; // Assign fetched quotes to the array
      },
      (error) => {
        console.error('Error fetching quotes:', error);
      }
    );
  }
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.quoteService.deleteQuote(id).subscribe(
        () => {
          console.log('Quote deleted successfully');
          this.quotes = this.quotes.filter((quote) => quote.id !== id); // Remove the deleted book from the list
        },
        (error) => {
          console.error('Error deleting quote:', error);
        }
      );
    }
  }
  goToQuoteForm(): void {
    this.router.navigate(['/quote-form']);
  }
  // Navigate to Home Page
  returnHome(): void {
    this.router.navigate(['/home']);
  }

  // Logout User
  logout(): void {
    this.authService.logout();
  }
}





  

