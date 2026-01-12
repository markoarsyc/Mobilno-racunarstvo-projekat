import { Component, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review-service';
import { AuthService } from '../../services/auth-service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-rate-movie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rate-movie.html',
  styleUrl: './rate-movie.scss',
})
export class RateMovie {

  rateForm: FormGroup;
  movie = input.required<Movie>();

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private authService: AuthService) {
    this.rateForm = this.fb.group({
      rating: [null, Validators.required],
      review: [''],
    });
  }


  submit() {
    if (this.rateForm.invalid) {
      console.warn('Forma nije validna');
      return;
    }

    this.reviewService.createReview({
      user: this.authService.getUser()?._id || '',
      movieAPI: this.movie().id,
      movieTitle: this.movie().title,
      rating: this.rateForm.value.rating,
      review: this.rateForm.value.review,
    }).subscribe({
      next: (res) => {
        console.log('Recenzija sačuvana', res);
        this.rateForm.reset();
      },
      error: (err) => console.error('Greška', err),
    });
  }
}
