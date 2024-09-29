import { Game } from './game';
import { Movie } from './movie';
import { TvShow } from './tv';
import { User } from './user';

export interface Favorite {
  id: string;
  user: User;
  content: Movie | TvShow | Game;
  tipo: string;
}
