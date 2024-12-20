import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

// Define the Book interface
interface Book {
  id: number;           // Unique identifier for each book
  title: string;        // Title of the book
  author: string;       // Author of the book
  publishDate: string;  // Date the book was published (use string for date format)
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = true;
  public books: Book[] = []; // Array to hold the list of books

  constructor(private http: HttpClient,private authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Show the navbar only on specific routes
        const currentRoute = event.urlAfterRedirects;
        this.showNavbar = !(currentRoute === '/login'); // Hide navbar on login
      }
    });
    this.getBooks(); // Fetch the books on component initialization
   
  }

// Function to fetch books from the backend API
getBooks() {
  const headers = this.authService.getAuthHeaders(); // Get the headers with the token
  this.http.get<Book[]>('environment.apiUrl/Books', { headers }).subscribe(  // Send token with the request
    (result) => {
      this.books = result; // Store the fetched books in the 'books' array
    },
    (error) => {
      console.error('Error fetching books:', error); // Log error if any occurs
    }
  );
}
 

  title = 'bookapp.client'; // Application title
}

