import { Component, OnInit, Input } from '@angular/core';
import { LinkSpotify } from '../models/api_models';

declare const $ : any;

@Component({
  selector: 'app-open-link',
  templateUrl: './open-link.component.html',
  styleUrls: ['./open-link.component.css']
})
export class OpenLinkComponent implements OnInit {

  @Input()
  link?: LinkSpotify;

  constructor() { }

  esc(ev: KeyboardEvent) {
    if(ev.keyCode == 27)
      this.close();
  }

  openDesktop() {
    window.open('spotify:' + this.link.type + ':' + this.link.id, '_blank');
    this.close();
  }

  openApp() {
    window.open('https://play.spotify.com/' + this.link.type + '/' + this.link.id, '_blank');
    this.close();
  }

  close() {
    $('#modalLink').modal('hide');
  }

  ngOnInit(): void {

  }

}
