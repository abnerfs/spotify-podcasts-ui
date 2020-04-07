import { Component, OnInit } from '@angular/core';
import { PodcastService, Show } from '../services/podcastservice';
import UtilService from '../services/Util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search: string;
  shows: Show[];
  loading: boolean;

  async doSearch() {
    this.loading = true;

    this.podcastService.searchShows(this.search)
      .then(shows => {
        this.shows = shows || [];
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  constructor(private podcastService: PodcastService, private util: UtilService) { }

  ngOnInit(): void {
  }

}
