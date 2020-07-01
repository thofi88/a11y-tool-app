import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

import { Checks } from '../checks';

@Component({
  selector: 'at-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.scss']
})
export class WebsiteDetailsComponent implements OnInit {

  // SECTION Variables

  @Input() websiteId: number;
  checks: Checks[];

  // !SECTION

  // SECTION Start
  // ANCHOR constructor
  constructor(private hs: HttpService) { }

  // ANCHOR ngOnit
  ngOnInit(): void {

    // NOTE get all checks from the website find by websiteId
    this.hs.getAllChecks(this.websiteId).subscribe(checks => this.checks = checks);
  }
}

  // !SECTION
