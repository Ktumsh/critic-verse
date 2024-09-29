import { Detail } from './detail';
import { Review } from './review';

export interface TvShow {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  rating: number;
  detail: Detail;
  reviews: Review[];
}
