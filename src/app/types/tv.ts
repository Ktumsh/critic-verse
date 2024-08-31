import { CinemaDetail } from './cinema-detail';
import { Review } from './review';

export interface TvShow {
  id: string;
  title: string;
  image: string;
  video?: string;
  rating: number;
  detail: Detail;
  reviews: Review[];
}

interface Detail extends CinemaDetail {
  seasons: number;
  episodesPerSeason: { season: number; episodes: number }[];
  episodeDuration: string;
  streamingPlatform: string[];
}
