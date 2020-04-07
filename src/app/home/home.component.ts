import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../services/podcastservice';
import { Show } from '../models/api_models';

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

  constructor(private podcastService: PodcastService) { }

  ngOnInit(): void {
  }

}
