import { Detail } from './detail';
import { Review } from './review';

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  rating: number;
  detail: Detail;
  reviews: Review[];
  detailId?: number;
}
