import { Cast } from './cast';

export interface CinemaDetail {
  description: string;
  cast: Cast[];
  director: string[];
  producer: string[];
  writer: string[];
  genre: string[];
  releaseDate: Date | string;
}
