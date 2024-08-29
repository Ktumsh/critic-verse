import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TV_MODEL } from 'src/app/models/tv.model';
import { TvShow } from 'src/app/types/tv';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.page.html',
  styleUrls: ['./tv-detail.page.scss'],
})
export class TvDetailPage implements OnInit {
  tv: TvShow | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tv = TV_MODEL.find((tv) => tv.id === id);
  }
}
