import { Component } from '@angular/core';
import { QuoteService } from '../../services/quote.service';
import { Router } from '@angular/router';
import { Quote } from '../../models/quote';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent {
  quote: Quote = {
    id: 0,
    text: '',
    author: '',
  }
   

  constructor(
    private quoteService: QuoteService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Submit the new quote
  submitQuote(): void {
    if (this.authService.isAuthenticated()) {
      this.quoteService.addQuote(this.quote).subscribe(
        (response) => {
          console.log('Quote added successfully', response);
          this.router.navigate(['/quote-list']); // Navigate back to the quote list
        },
        (error) => {
          console.error('Error adding quote:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
