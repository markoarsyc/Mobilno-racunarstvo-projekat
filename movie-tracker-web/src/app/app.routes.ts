import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { Profile } from './pages/profile/profile';
import { MovieDetail } from './pages/movie-detail/movie-detail';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'home', component: Home},
  { path: 'search', component: Search},
  { path: 'profile', component: Profile},
  { path: 'movies/:id', component: MovieDetail},

  { path: '**', redirectTo: '' }
];

