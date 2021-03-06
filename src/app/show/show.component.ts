import { Component, OnInit } from '@angular/core';
import { Show, Podcast, LinkSpotify } from '../models/api_models';
import { PodcastService } from '../services/podcastservice';
import { ActivatedRoute, Router } from '@angular/router';

declare const $ : any;


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  showID: string;
  error: boolean;
  show: Show;
  episodes: Podcast[] = [];
  loading: boolean = true;
  search: string;
  searching: boolean = false;
  currentLink?: LinkSpotify;
  nodata: boolean = false;

  constructor(private podcastsService: PodcastService, private route: ActivatedRoute, private router: Router) { }


  openLink(type: 'show' | 'episode', id : string) {
    this.currentLink = {
      type, 
      id
    };

    $('#modalLink').modal({
      show: true,
      backdrop: 'static',
    })
  }

  onKey(event: KeyboardEvent) {
    if(event.keyCode === 13)
      this.searchEpisodes();
  }

  searchEpisodes() {
    if(this.searching)
      return;

    
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: {
          search: this.search
        }, 
        queryParamsHandling: 'merge',
      });

    this.nodata = false;
    this.searching = true;

    this.podcastsService.listEpisodes(this.showID, 0, this.search)
      .then(episodes => {
        this.episodes = episodes;
        this.nodata = this.episodes.length == 0;
      })
      .catch((err: Error) => {
          alert(err.message);
      })
      .finally(() => {
        this.searching = false;
      })
  }

  async ngOnInit() {
    this.showID = this.route.snapshot.paramMap.get('show');    
    this.search = this.route.snapshot.queryParams.search;

    this.podcastsService.getShow(this.showID)
      .then((show) => {
        this.show = show;
        this.searchEpisodes();
      })
      .catch(err => {
        console.log(err);
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      })
  }
}
