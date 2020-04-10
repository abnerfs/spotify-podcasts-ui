import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../services/podcastservice';
import { Show } from '../models/api_models';
import { Params, Router, ActivatedRoute } from '@angular/router';

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
  nodata: boolean = false;

  onKey(event: KeyboardEvent) {
    if(event.keyCode == 13) {
      this.doSearch();      
    }
  }

  async doSearch() {
    if(!this.search || this.searching)
      return;

    const queryParams: Params = { search: this.search };

    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.nodata = false;
    this.searching = true;

    this.podcastService.searchShows(this.search)
      .then(shows => {
        this.shows = shows || [];
        if(this.shows.length == 0)
          this.nodata = true;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.searching = false;
      })
  }

  constructor(private podcastService: PodcastService, private router: Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.search = this.activatedRoute.snapshot.queryParams.search;
    if(this.search)
      this.doSearch();
  }

}
