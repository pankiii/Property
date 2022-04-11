import { Component, Input, OnInit } from '@angular/core';
import { Iproperty } from '../Iproperty';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() propertyData:Iproperty;

  constructor() { }

  ngOnInit(): void {
  }

}
