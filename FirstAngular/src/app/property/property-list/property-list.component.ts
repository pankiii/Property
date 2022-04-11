import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Iproperty } from '../Iproperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})

export class PropertyListComponent implements OnInit {
  sellRent=1;
  propertyData: Array<Iproperty>;
  constructor(private route:ActivatedRoute,private common: CommonService) {
  }

  ngOnInit(): any {
    if(this.route.snapshot.url.toString()){
      this.sellRent = 2;
    }
    this.common.getCardDetails().subscribe(data => {
       this.propertyData = data;
       let dataProp= JSON.parse(localStorage.getItem('addProperty'));
       if(dataProp){
        dataProp.forEach((element: Iproperty) => {
          this.propertyData.push(element);
         });

       }
       this.propertyData= this.propertyData.filter(item =>item.SellRent === this.sellRent);
      console.log(this.propertyData)
    });
  }
}
