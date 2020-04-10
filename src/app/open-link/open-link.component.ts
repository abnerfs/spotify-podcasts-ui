import { Component, OnInit, Input } from '@angular/core';
import { LinkSpotify } from '../models/api_models';
import { DomSanitizer } from '@angular/platform-browser';

declare const $: any;

@Component({
  selector: 'app-open-link',
  templateUrl: './open-link.component.html',
  styleUrls: ['./open-link.component.css']
})
export class OpenLinkComponent implements OnInit {

  @Input()
  link?: LinkSpotify;

  constructor(private sanitizer: DomSanitizer) { }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  esc(ev: KeyboardEvent) {
    if (ev.keyCode == 27)
      this.close();
  }

  close() {
    $('#modalLink').modal('hide');
  }

  ngOnInit(): void {

  }

}
