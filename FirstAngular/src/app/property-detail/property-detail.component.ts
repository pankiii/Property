import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../property/property';
import { CommonService } from '../services/common.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  propertyId = 0;
  property = new Property();
  localData: any;
  jsonData: any;
  filterData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private common: CommonService
  ) {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:true
      }
    ];

    this.galleryImages = [
      {
        small: '../../../assets/car.jpg',
        medium: '../../../assets/car.jpg',
        big: '../../../assets/car.jpg'
      },
      {
        small: '../../../assets/1.jpg',
        medium: '../../../assets/1.jpg',
        big: '../../../assets/1.jpg'
      },
      {
        small: '../../../assets/3.jpg',
        medium: '../../../assets/3.jpg',
        big: '../../../assets/3.jpg'
      },{
        small: '../../../assets/2.jpg',
        medium: '../../../assets/2.jpg',
        big: '../../../assets/2.jpg'
      },
      {
        small: '../../../assets/1.jpg',
        medium: '../../../assets/1.jpg',
        big: '../../../assets/1.jpg'
      }
    ];
    // this.propertyId = +this.route.snapshot.params['id'];
    // console.log(this.propertyId);
    this.route.params.subscribe((params) => {
      this.propertyId = +params['id'];
      this.filterData = this.detail(this.propertyId);
    });

  }
  detail(id: number) {
    this.common.getCardDetails().subscribe((data) => {
      this.jsonData = data;
      this.localData = JSON.parse(localStorage.getItem('addProperty'));
      if (this.localData) {
        this.localData.forEach((element: any) => {
          this.jsonData.push(element);
        });
      }
      let dataProp = this.jsonData.filter((x: { Id: number }) => x.Id === id);

      this.property.Name = dataProp[0].Name;
      this.property.BHK = dataProp[0].BHK;
      this.property.FType = dataProp[0].FType;
      this.property.PType = dataProp[0].PType;
      this.property.Price = dataProp[0].Price;
      this.property.City = dataProp[0].City;
      this.property.BuiltArea = dataProp[0].BuiltArea;
      this.property.Image = dataProp[0].Image;
    });
  }
  back(): void {
    this.router.navigate(['/']);
  }
}
