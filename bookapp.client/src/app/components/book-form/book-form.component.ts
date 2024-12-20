import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service'; 
import { Book } from '../../models/book'; 

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: 0,        // Assuming id is required for the book
    title: '',
    author: '',
    publishDate: ''
  };
  isEditMode: boolean = false;

  // Inject ActivatedRoute to get route params and Router for navigation
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute, // Use ActivatedRoute for capturing route parameters
    private router: Router
  ) {}

  // ngOnInit lifecycle method to check if we are editing or adding
  ngOnInit(): void {
    // Get the book id from the route params
    const bookId = this.activatedRoute.snapshot.paramMap.get('id'); // Use activatedRoute to get params
    if (bookId) {
      this.isEditMode = true;
      // Ensure the bookId is converted to a number
      const id = Number(bookId);  // Convert bookId to a number (it could be a string)
      if (!isNaN(id)) {
        this.bookService.getBookById(id).subscribe(
          (book) => {
            this.book = book;  
          },
          (error) => {
            console.error('Error fetching book for edit:', error);
          }
        );
      } else {
        console.error('Invalid book id');
        this.router.navigate(['/']);  // Navigate back to list if the id is invalid
      }
    }
  }
  
  // Method to handle form submission
  onSubmit(): void {
    if (this.book.title && this.book.author && this.book.publishDate) {
      if (this.isEditMode) {
        // If in edit mode, update the book
        this.bookService.updateBook(this.book.id, this.book).subscribe(
          (response) => {
            console.log('Book updated successfully', response);
            this.router.navigate(['/book-list']);  // Redirect to the list page after updating
          },
          (error) => {
            console.error('Error updating book:', error);
          }
        );
      } else {
        // If not in edit mode, add a new book
        this.bookService.addBook(this.book).subscribe(
          (response) => {
            console.log('Book added successfully', response);
            this.router.navigate(['/book-list']);  // Redirect to the list page after adding
          },
          (error) => {
            console.error('Error adding book:', error);
          }
        );
      }
    } else {
      console.error('Form is incomplete');
    }
  }
}
