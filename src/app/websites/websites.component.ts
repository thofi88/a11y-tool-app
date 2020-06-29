import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Websites } from '../websites';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'at-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {

  websites: Websites[];
  newWebsite: Websites;

  step = 0;
  term: string;
  sortField = 'name';

  r = 255;
  g = 0;
  b = 0;

  constructor(private hs: HttpService) {
    this.newWebsite = {
      id: 100,
      name: 'test',
      home_url: 'test',
      last_full_test: 'test',
      category_id: 100,
      ranking: 100,
    };
   }

  ngOnInit(): void {

    this.hs.getAll().subscribe(websites => this.websites = websites);
  }

changeSort(value){

  this.sortField = value;
  this.websites = this.websites.slice();
}
changeColor(i){
  if (i === null){
    return ('rgb( ' + 0 + ',' + 0 + ',' + 0 + ')');
  }
  else{
    this.r = (i <= 50) ? 255 : Math.round(255 - 255 * (i - 50) / 50);
    this.g = (i <= 50) ? Math.round(255 - 255 * (50 - i) / 50) : 255;

    if (this.r > 50){
      this.r = this.r - 49;
    }
    if (this.g > 50){
      this.g = this.g - 49;
    }
    return ('rgb( ' + this.r + ',' + this.g + ',' + this.b + ')');
  }

}
  setStep(index: number) {
    this.step = index;
  }
  isNull(ranking){
    if (ranking === null){
      return 'N';
    }
    else{
      return ranking;
    }
  }
}
