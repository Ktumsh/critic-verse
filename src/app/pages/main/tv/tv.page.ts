import { Component, OnInit } from '@angular/core';
import { TV_MODEL } from 'src/app/models/tv.model';
import { TvShow } from 'src/app/types/tv';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss'],
})
export class TvPage implements OnInit {
  tvList: TvShow[] = [];

  loadTvShows(): void {
    this.tvList = TV_MODEL;
  }
  constructor() {}

  ngOnInit() {
    this.loadTvShows();
  }
}
