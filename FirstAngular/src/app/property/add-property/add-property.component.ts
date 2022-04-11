import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { CommonService } from 'src/app/services/common.service';
import { Iproperty } from '../Iproperty';
import { Property } from '../property';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm: FormGroup;
  // @ViewChild('form') addFrom:NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  property = new Property();
  propertyView: Iproperty = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null,
  };
  nextClicked: boolean;
  constructor(private fb: FormBuilder,
    private common:CommonService,
    private router:Router,
    private alertyfy:AlertyfyService) {}

  ngOnInit(): void {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        sellRent: ['1', Validators.required],
        bhk: [null, Validators.required],
        pType: [null, Validators.required],
        fType: [null, Validators.required],
        name: [null, Validators.required],
        city: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        price: [null, Validators.required],
        builtArea: [null, Validators.required],
        carpetArea: [null],
        security: [null],
        maintenance: [null],
      }),
      AddressInfo: this.fb.group({
        floorNo: [null],
        totalFloor: [null],
        address: [null, Validators.required],
        landMark: [null],
      }),
      OtherInfo: this.fb.group({
        rtm: [null, Validators.required],
        possessionOn: [null],
        aop: [null],
        gated: [null],
        mainEntrance: [null],
        description: [null],
      }),
    });
  }
  get basicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get priceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }
  get addressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }
  get otherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  // get sellRent() {
  //   return this.basicInfo.controls['sellRent'] as FormControl;
  // }
  onSubmit(): void {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.common.addProperty(this.property);
      console.log('Success');
    if(this.SellRent.value ==='2'){
     this.router.navigate(['/rent-property']);
    }
    else{
      this.router.navigate(['/']);
    }
    console.log(this.addPropertyForm);
  }
}

  mapProperty() {
    this.property.Id= this.common.getNewID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.FType = this.FType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }
  allTabsValid(): boolean {
    if (this.basicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.priceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.addressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.otherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  selectTab(tabId: number, isCurrentTab: boolean) {
    this.nextClicked = true;
    if (isCurrentTab) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
  get SellRent() {
    return this.basicInfo.controls['sellRent'] as FormControl;
  }

  get BHK() {
    return this.basicInfo.controls['bhk'] as FormControl;
  }

  get PType() {
    return this.basicInfo.controls['pType'] as FormControl;
  }

  get FType() {
    return this.basicInfo.controls['fType'] as FormControl;
  }

  get Name() {
    return this.basicInfo.controls['name'] as FormControl;
  }

  get City() {
    return this.basicInfo.controls['city'] as FormControl;
  }

  get Price() {
    return this.priceInfo.controls['price'] as FormControl;
  }

  get BuiltArea() {
    return this.priceInfo.controls['builtArea'] as FormControl;
  }

  get CarpetArea() {
    return this.priceInfo.controls['carpetArea'] as FormControl;
  }

  get Security() {
    return this.priceInfo.controls['security'] as FormControl;
  }

  get Maintenance() {
    return this.priceInfo.controls['maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.addressInfo.controls['floorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.addressInfo.controls['totalFloor'] as FormControl;
  }

  get Address() {
    return this.addressInfo.controls['address'] as FormControl;
  }

  get LandMark() {
    return this.addressInfo.controls['landMark'] as FormControl;
  }

  get RTM() {
    return this.otherInfo.controls['rtm'] as FormControl;
  }

  get PossessionOn() {
    return this.otherInfo.controls['possessionOn'] as FormControl;
  }

  get AOP() {
    return this.otherInfo.controls['aop'] as FormControl;
  }

  get Gated() {
    return this.otherInfo.controls['gated'] as FormControl;
  }

  get MainEntrance() {
    return this.otherInfo.controls['mainEntrance'] as FormControl;
  }

  get Description() {
    return this.otherInfo.controls['description'] as FormControl;
  }
}
