import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
propertyData ={
id:1,
name:"Goa Apartment",
type:"House",
price:5000
}
  constructor() { }

  ngOnInit(): void {
  }

}
