import { Component } from '@angular/core';
import { MoviesCarousel } from "../../components/movies-carousel/movies-carousel";

@Component({
  selector: 'app-home',
  imports: [MoviesCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
