import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { TvShow } from 'src/app/types/tv';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss'],
})
export class TvPage implements OnInit {
  tvList: TvShow[] = [];

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.loadTvShows();
  }

  async loadTvShows() {
    this.tvList = await this.dbService.getTvShows();
  }

  getRatingDescription = ratingDescription;
}
