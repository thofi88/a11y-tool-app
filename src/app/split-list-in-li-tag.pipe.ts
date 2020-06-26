import { Pipe, PipeTransform } from '@angular/core';

import { HttpService } from './http.service';

@Pipe({
  name: 'splitListInLiTag'
})
export class SplitListInLiTagPipe implements PipeTransform {

  listOfPages = [];
  liAsString: string;

  constructor(private hs: HttpService){}
  check;
  transform(input: any, seperator: string, limit?: number): any {
    if (typeof input === 'string') {
      input.toString();
    }
    this.listOfPages = input.split(seperator, limit);

    for (let i = 0; i < this.listOfPages.length; i++) {

      if (i === 0){
        this.liAsString = `<li><a [routerLink]="[ 'website', '` + this.listOfPages[i] + `']">` + this.listOfPages[i] + '</a></li>';
      }
      else{
        this.liAsString = this.liAsString + '<li><a href="' + this.listOfPages[i] + '" target="_blank" >' + this.listOfPages[i] + '</a></li>';
      }


   }
   //console.log(this.liAsString);
    return this.liAsString;
  }

}
