import { Component, effect, signal, inject } from '@angular/core';
import { Review } from '../../interfaces/review';
import { ReviewService } from '../../services/review-service';
import { AuthService } from '../../services/auth-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviews-list',
  imports: [DatePipe],
  templateUrl: './reviews-list.html',
  styleUrl: './reviews-list.scss',
})
export class ReviewsList {
  reviewList = signal<Array<Review>>([]);
  authService = inject(AuthService);
  userId = this.authService.getUser()?._id ?? ""; // postavi na ID trenutno prijavljenog korisnika
  

  constructor(private reviewService: ReviewService) {
    // effect automatski poziva kad se userId promeni
    effect(() => {
      const id = this.userId;

      this.reviewService.getReviewsByUser(id).subscribe({
        next: (reviews) => {
          this.reviewList.set(reviews);
          console.log("Reviews loaded:", reviews);
        },
        error: (err) => {
          console.error("Error fetching reviews:", err);
        }
      });
    });
  }
}
