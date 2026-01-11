export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  genres?: Genre[];
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
  tagline?: string;
}

