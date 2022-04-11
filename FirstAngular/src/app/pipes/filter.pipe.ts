import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], stringField:string,prop:string): any[] {
    debugger
    const resArray: any[]=[];
    if(value.length===0 || stringField === '' || prop === ''){
      return value;
    }
   for (let item of value) {
     if(item[prop]=== stringField){
       resArray.push(item);
     }

   }
    return resArray;
  }

}
