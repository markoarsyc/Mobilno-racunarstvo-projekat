import { Component, input, signal, effect } from '@angular/core';
import { MoviesService } from '../../services/movies-service';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movies-carousel',
  imports: [RouterLink],
  templateUrl: './movies-carousel.html',
  styleUrl: './movies-carousel.scss',
})
export class MoviesCarousel {
  apiParam = input.required<string>();
  movies = signal<Movie[]>([]);

  constructor(private moviesService: MoviesService) {
    effect(() => {
      const param = this.apiParam();

      this.moviesService.getMoviesList(param).subscribe({
        next: (res) => {
          console.log('Movies list:', res);
          this.movies.set(res.results);
        },
        error: (err) => {
          console.error('Error fetching movies:', err);
        }
      });
    });
  }
}
