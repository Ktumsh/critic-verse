import { Review } from './review';

export interface Movie {
  id: string;
  title: string;
  image: string;
  video?: string;
  rating: number;
  details: Detail;
  reviews: Review[];
}

interface Detail {
  description: string;
  cast: string[];
  director: string[];
  producer: string[];
  written: string[];
  productionCompany: string;
  genre: string[];
  releaseDate: string;
  timeDuration: string;
}
