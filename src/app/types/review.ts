import { Report } from './report';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: Date | string;
  containsSpoilers?: boolean;
  userId: string;
  report?: Report;
  contentId?: string;
  contentType?: 'game' | 'movie' | 'tv';
}
