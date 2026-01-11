import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('movie-tracker-web');

  constructor(private auth: AuthService) {
  this.auth.initFromStorage(); // učitava korisnika iz localStorage-a pri startu
}
}
