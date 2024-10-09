import { User } from './user';

export interface Report {
  id?: string;
  reason: string;
  date: Date | string;
  reportedBy: string;
  reviewId?: string;
}
