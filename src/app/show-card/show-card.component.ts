import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../models/api_models';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {

  @Input()
  public show: Show;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
