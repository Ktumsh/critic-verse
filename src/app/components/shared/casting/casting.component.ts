import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';

@Component({
  selector: 'app-casting',
  templateUrl: './casting.component.html',
  styleUrls: ['./casting.component.scss'],
})
export class CastingComponent {
  @Input() item!: Movie | TvShow;
}
