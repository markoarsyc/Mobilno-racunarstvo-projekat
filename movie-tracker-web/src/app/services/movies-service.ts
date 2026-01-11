import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly BASE_URL = 'https://api.themoviedb.org/3/movie';

  private readonly headers = new HttpHeaders({
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTYxYzdlMDk2MzFiYWE3YzgxYWNkMDdlODU5MzhiMCIsIm5iZiI6MTc1OTc2MjQwOS4xOTEsInN1YiI6IjY4ZTNkN2U5MDE1MTM0ZDQ1NjYxN2Q1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kbFobxXppUO2N0Av_VuU5oECKpvJtk8IVEsitWkIyWY',
  });

  constructor(private http: HttpClient) {}

  getMoviesList(apiParam: string): Observable<any> {
    const url = `${this.BASE_URL}/${apiParam}?language=en-US&page=1`;

    return this.http.get<any>(url, {
      headers: this.headers,
    });
  }

  getMovieDetails(movieId: string): Observable<Movie> {
    const url = `${this.BASE_URL}/${movieId}?language=en-US`;

    return this.http.get<Movie>(url, {
      headers: this.headers,
    });
  }
}
