import { User } from './user';

export interface Report {
  reason: string;
  date: Date | string;
  reportedBy: string;
}
