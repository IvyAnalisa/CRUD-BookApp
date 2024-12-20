import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = 'https://localhost:7149/api/Quotes'; // Replace with your API endpoint

  constructor(private http: HttpClient, private authService: AuthService ) {}

  // Fetch the list of 5 quotes
  getQuotes(): Observable<Quote[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}` // Add the token for authorized requests
    );
    return this.http.get<Quote[]>(this.apiUrl, { headers });
  }

  // Add a new quote
  addQuote(quote: Quote): Observable<Quote> {
    const headers = this.authService.getAuthHeaders(); // Add auth headers
    return this.http.post<Quote>(this.apiUrl, quote, { headers });
  }
  deleteQuote(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

}
