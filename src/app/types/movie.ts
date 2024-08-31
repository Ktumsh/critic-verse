import { CinemaDetail } from './cinema-detail';
import { Review } from './review';

export interface Movie {
  id: string;
  title: string;
  image: string;
  video?: string;
  rating: number;
  detail: Detail;
  reviews: Review[];
}

interface Detail extends CinemaDetail {
  productionCompany: string[];
  timeDuration: string;
}
