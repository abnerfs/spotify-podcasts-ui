import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../services/podcastservice';
import { Show } from '../models/api_models';
import { timeoutPromise } from '../services/Util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search: string;
  shows: Show[];
  loading: boolean;
  searching: boolean = false;

  onKey(event: KeyboardEvent) {
    if(event.keyCode == 13) {
      this.doSearch();      
    }
  }

  async doSearch() {
    if(!this.search || this.searching)
      return;

    this.searching = true;

    this.podcastService.searchShows(this.search)
      .then(shows => {
        this.shows = shows || [];
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.searching = false;
      })
  }

  constructor(private podcastService: PodcastService) { }

  ngOnInit(): void {
  }

}
