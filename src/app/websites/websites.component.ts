import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Websites } from '../websites';
import { Router } from '@angular/router';
import { Category } from '../category';

@Component({
  selector: 'at-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {

  // SECTION Variables

  websites: Websites[];
  newWebsite: Websites;
  sendWeb: Websites;
  filterarray: Category[];
  step = 0;
  term: string;
  sortField = 'name';
  filterfield = 'Kein';
  websiteId: any;

  r = 255;
  g = 0;
  b = 0;
  filterfieldId: any;

  // !SECTION

  // SECTION Start
  // ANCHOR constructor
  constructor(private hs: HttpService, private router: Router) {

    this.newWebsite = {
      id: 100,
      name: 'test',
      home_url: 'test',
      last_full_test: 'test',
      category_id: '100',
      ranking: 100,
    };
  }

  // ANCHOR ngOnit
  ngOnInit(): void {

 // NOTE get all categories
 this.hs.getAllCat().subscribe(cats => {
   this.filterarray = cats;
   this.filterarray.push({ id: 0, name: 'Kein' });
   console.log(this.filterarray);
});
    // NOTE get all websites
    this.hs.getAll().subscribe(websites => this.websites = websites);
  }

  // !SECTION

  // SECTION Functions

  // ANCHOR setFilter
  // change the sort for filter
  setFilter(category) {
    this.filterfield = category.name;
    this.filterfieldId = category.id;

  }

  // ANCHOR changeSort
  // change the sort for sorting
  changeSort(value) {
    this.sortField = value;
    this.websites = this.websites.slice();
  }

  // ANCHOR changeColor
  // NOTE change colour based on the ranking
  changeColor(i) {
    if (i === null) {
      return ('rgb( ' + 0 + ',' + 0 + ',' + 0 + ')');
    }
    else {
      this.r = (i <= 70) ? 255 : Math.round(255 - 255 * (i - 70) / 70);
      this.g = (i <= 70) ? Math.round(255 - 255 * (70 - i) / 70) : 255;
      // console.log(this.r);
      // console.log(this.g);
      // console.log('--------------');
      if (this.r > 50) {
        this.r = this.r - 49;
      }
      if (this.g > 50) {
        this.g = this.g - 49;
      }
      return ('rgb( ' + this.r + ',' + this.g + ',' + this.b + ')');
    }

  }

  // ANCHOR setStep accordion
  // NOTE to control the accordion
  setStep(index: number) {
    this.step = index;
  }

  // ANCHOR isNull if ranking = null
  // NOTE if ranking zero write a big N inside the circle
  isNull(ranking) {
    if (ranking === null) {
      return 'N';
    }
    else {
      return ranking;
    }
  }

  // ANCHOR sendWebsite for editing
  // NOTE send the websiteId to update the website
  sendWebsite(websiteId) {
    this.router.navigate(['websites/new/', websiteId]);
  }
}

  // !SECTION
