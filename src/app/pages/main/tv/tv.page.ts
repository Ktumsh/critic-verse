import { Component, OnInit } from '@angular/core';
import { TV_MODEL } from 'src/app/models/tv.model';
import { TvShow } from 'src/app/types/tv';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss'],
})
export class TvPage implements OnInit {
  tvList: TvShow[] = [];

  constructor() {}

  ngOnInit() {
    this.loadTvShows();
  }

  loadTvShows(): void {
    this.tvList = TV_MODEL;
  }

  getRatingDescription = ratingDescription;
}
