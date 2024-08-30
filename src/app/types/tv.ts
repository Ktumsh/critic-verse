import { Review } from './review';

export interface TvShow {
  id: string;
  title: string;
  image: string;
  description: string;
  genre: string[];
  cast: string[];
  director: string[];
  producers: string[];
  writers: string[];
  seasons: number;
  episodesPerSeason: { season: number; episodes: number }[];
  rating: number;
  releaseDate: Date | string;
  episodeDuration: string;
  streamingPlatforms: string[];
  reviews: Review[];
}
