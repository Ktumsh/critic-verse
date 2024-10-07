import { Report } from './report';
import { User } from './user';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: Date | string;
  containsSpoilers?: boolean;
  userId: string;
  report?: Report;
  contentId?: string;
}
