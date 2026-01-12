import { Component, computed, signal, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../../interfaces/movie';
import { Location } from '@angular/common';
import { RateMovie } from '../../components/rate-movie/rate-movie';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-movie-detail',
  imports: [RateMovie],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss'],
})
export class MovieDetail {
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  public authService = inject(AuthService);

  movie = signal<Movie | null>(null);
  releaseYear = computed(() => this.movie()?.release_date?.split('-')[0] ?? 'N/A');
  genres = computed(() => this.movie()?.genres?.map(g => g.name).join(', ') ?? 'N/A');
  runtime = computed(() => this.movie()?.runtime ? this.movie()?.runtime + ' min' : 'N/A');

  constructor() {
    effect(() => {
      const movieId = this.route.snapshot.paramMap.get('id') || '';
      this.moviesService.getMovieDetails(movieId).subscribe((movie) => {
        this.movie.set(movie);
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
