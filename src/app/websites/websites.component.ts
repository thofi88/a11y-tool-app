import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { Websites } from '../websites';
import { Checks } from '../checks';
import { Router, ActivatedRoute } from '@angular/router';

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

  r = 255;
  g = 0;
  b = 0;
  websiteId: any;

  // !SECTION Variables

  // SECTION Start App
  // ANCHOR constructor
  constructor(private hs: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {


    this.newWebsite = {
      id: 100,
      name: 'test',
      home_url: 'test',
      last_full_test: 'test',
      category_id: 100,
      ranking: 100,
    };
  }

  // ANCHOR ngOnit
  ngOnInit(): void {

    this.hs.getAll().subscribe(websites => this.websites = websites);
  }

  // !SECTION Start App

  // SECTION Funktions
  // ANCHOR changeSort
  changeSort(value) {

    this.sortField = value;
    this.websites = this.websites.slice();
  }

  // ANCHOR changeColor
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

  setStep(index: number) {
    this.step = index;
  }

  // ANCHOR isNull if ranking = null

  isNull(ranking) {
    if (ranking === null) {
      return 'N';
    }
    else {
      return ranking;
    }
  }

  // ANCHOR sendWebsite for editing

  sendWebsite(websiteId) {
    this.router.navigate(['websites/new/', websiteId]);
  }
}

  // !SECTION Funktions
