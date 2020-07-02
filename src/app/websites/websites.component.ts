import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Websites } from '../websites';
import { Router } from '@angular/router';

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

  step = 0;
  term: string;
  sortField = 'name';
  websiteId: any;

  r = 255;
  g = 0;
  b = 0;

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

    // NOTE get all websites
    this.hs.getAll().subscribe(websites => this.websites = websites);
  }

  // !SECTION

  // SECTION Functions
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
      this.r = (i <= 50) ? 255 : Math.round(255 - 255 * (i - 50) / 50);
      this.g = (i <= 50) ? Math.round(255 - 255 * (50 - i) / 50) : 255;

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
