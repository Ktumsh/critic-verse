import { Review } from './review';

interface Detail {
  summary: string;
  genre: string[];
  plataforms: string[];
  releaseDate: Date | string;
  editor: string;
  developer: string;
}

export interface Game {
  id: string;
  reviews: Review[];
  title: string;
  image: string;
  video?: string;
  description: string;
  rating: number;
  details: Detail;
}
