import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service'; 
import { Book } from '../../models/book';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'] // Corrected property name
})
export class BookListComponent implements OnInit {
  books: Book[] = []; // Define the books array of type Book

  constructor(private router: Router,private bookService: BookService,private authService: AuthService) {}

 
    ngOnInit(): void {
      // If the user is not authenticated, redirect to login
      if (!this.authService.isAuthenticated()) {
        this.authService.logout();
      } else {
        this.getBooks();
      }
    }
    
     // Fetch books method with authorization header
  getBooks(): void {
    this.bookService.getBooks().subscribe(  
      (data: Book[]) => {
        this.books = data;  // Store fetched books in the array
      },
      (error) => {
        console.error('Error fetching books:', error);  // Log error if any occurs
      }
    );
  }




  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(
        () => {
          console.log('Book deleted successfully');
          this.books = this.books.filter((book) => book.id !== id); // Remove the deleted book from the list
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
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
