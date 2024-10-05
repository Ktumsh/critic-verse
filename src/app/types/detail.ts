import { Cast } from './cast';
import { TvShowSeason } from './tv-seasons';

export interface Detail {
  summary?: string;
  genre: string[];
  releaseDate: Date | string;
  editor?: string;
  developer?: string;
  platforms?: string[];
  productionCompany?: string[];
  timeDuration?: string;
  seasons?: number;
  episodesPerSeason?: TvShowSeason[];
  episodeDuration?: string;
  streamingPlatform?: string[];
  cast?: Cast[];
  director?: string[];
  producer?: string[];
  writer?: string[];
  class?: string;
}
