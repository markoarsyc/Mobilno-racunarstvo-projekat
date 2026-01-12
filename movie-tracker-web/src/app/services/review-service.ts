import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'http://localhost:8000/api/reviews';
  constructor(private http: HttpClient) {}

  // GET recenzije po korisniku
  getReviewsByUser(userId: string): Observable<Review[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<Review[]>(url);
  }

  // POST – kreiranje nove recenzije
  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, review);
  }

}
