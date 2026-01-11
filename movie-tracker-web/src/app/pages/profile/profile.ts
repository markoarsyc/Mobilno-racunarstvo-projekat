import { Component, inject, signal } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  user = signal<User | null>(null);

  constructor(private auth: AuthService) {
    this.user.set(this.auth.getUser());
  }

  logout() {
    this.auth.logout();
    location.reload();
  }
}
