import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../property/property';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  modelData :any;
  localData:any;
  constructor(private http: HttpClient) {}

  // fetchData(id: number): Observable<any> {

  //   this.getCardDetails().subscribe((data) => {
  //     debugger
  //     this.modelData = data;
  //     this.localData = JSON.parse(localStorage.getItem('addProperty'));
  //     if (this.localData) {
  //       this.localData.forEach((element: any) => {
  //         this.modelData.push(element);
  //       });
  //     }
  //     console.log(this.modelData.filter((x: { Id: number }) => x.Id === id))
  //   });
  //   return this.modelData.filter((x: { Id: number }) => x.Id === id);
  // }
  getCardDetails() {
    return this.http.get<any>('data/properties.json');
    //.pipe(
    //     map(data=>{
    //       const propertiesArray :Array<any> =[];
    //       for(const id in data){
    //         if(data.hasOwnProperty(id)){
    //           propertiesArray.push(data[id])
    //         }
    //       }
    //     })
    //   )
  }
  addProperty(property: Property) {
    let users = [];
    if (localStorage.getItem('addProperty')) {
      users = JSON.parse(localStorage.getItem('addProperty'));
    }
    users.push(property);
    localStorage.setItem('addProperty', JSON.stringify(users));
  }
  getNewID(): number {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID') + 1;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
