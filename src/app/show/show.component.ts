import { Component, OnInit } from '@angular/core';
import { Show, Podcast } from '../models/api_models';
import { PodcastService } from '../services/podcastservice';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private podcastsService: PodcastService, private route: ActivatedRoute) { }

  spotifyDesktop() {
    window.open('spotify:show' + this.showID, '_blank');
  }

  spotifyApp() {
    window.open('https://play.spotify.com/show/' + this.showID, '_blank');
  }

  searchEpisodes() {
    this.podcastsService.listEpisodes(this.showID, 0, this.search)
      .then(episodes => {
        this.episodes = episodes;
        console.log(episodes);
      })
      .catch((err: Error) => {
          alert(err.message);
      })
  }

  ngOnInit(): void {
    this.showID = this.route.snapshot.paramMap.get('show');
    this.podcastsService.getShow(this.showID)
      .then((show) => {
        this.show = show;
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
