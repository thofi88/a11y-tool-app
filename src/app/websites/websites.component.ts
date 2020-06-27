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

  constructor(private hs: HttpService) {
    this.newWebsite = {
      id: 100,
      name: 'test',
      home_url: 'test',
      last_full_test: 'test',
      category_id: 100,
      ranking: 100,
    }
   }

  ngOnInit(): void {

    this.hs.getAll().subscribe(websites => this.websites = websites);
  }

changeSort(value){

  this.sortField = value;
  this.websites.push(this.newWebsite);
  this.websites.pop();
  console.log();
}
  setStep(index: number) {
    this.step = index;
    console.log('setStep:' + this.step);
  }

}
