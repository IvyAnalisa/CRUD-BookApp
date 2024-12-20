import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';  
import { AuthService } from './auth.service';
import { environment } from '../../enviroments/enviroment';
@Injectable({
  providedIn: 'root',  // This registers the service globally
})
export class BookService {
  private apiUrl = environment.apiUrl + '/Books' ; 

  constructor(private http: HttpClient,private authService: AuthService) {}

    getBooks(): Observable<Book[]> {
      const headers = this.getAuthHeaders();  // Get the Authorization header
      return this.http.get<Book[]>(this.apiUrl, { headers });  // Include headers in the GET request
    }

  // Method to get a single book by ID
  getBookById(id: number): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book>(`${this.apiUrl}/${id}`, { headers });
  }

  // Method to add a new book
  addBook(book: Book): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.post<Book>(this.apiUrl, book, { headers });
  }

  // Method to update an existing book
  updateBook(id: number, book: Book): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book, { headers });
  }

  // Method to delete a book
  deleteBook(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Helper method to get the Authorization headers with the token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();  // Get the token from AuthService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Add Authorization header if token exists
    }
    return headers;
  }
}
