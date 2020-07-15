import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checks } from '../checks';
import { HttpService } from '../http.service';
import { map, switchMap } from 'rxjs/operators';
import { CheckResults } from '../check-results';

@Component({
  selector: 'at-checks-details',
  templateUrl: './checks-details.component.html',
  styleUrls: ['./checks-details.component.scss']
})
export class ChecksDetailsComponent implements OnInit {

  // SECTION Variables

  check: Checks;
  step = 0;
  oneCheck: CheckResults;
  inapplicable;
  incomplete;
  passes;
  violations;
  checkTime;
  displayCheck;
  checks: Checks[];
  newCheck: Checks;
  sortField = 'violations';
  trackByFn;


  // !SECTION

  // SECTION Start
  // ANCHOR constructor
  constructor(private route: ActivatedRoute, private hs: HttpService) { }

  // ANCHOR ngOnit
  ngOnInit(): void {

    this.route.paramMap.pipe(
      map(params => params.get('checkId')),
      switchMap(checkId => this.hs.getSingleCheck(checkId))
    ).subscribe(check => {
      this.check = check;

      this.oneCheck = JSON.parse(this.check.result);
      console.log(this.oneCheck);
      this.checkTime = this.oneCheck.timestamp;
      this.inapplicable = this.oneCheck.inapplicable;
      this.incomplete = this.oneCheck.incomplete;
      this.passes = this.oneCheck.passes;
      this.violations = this.oneCheck.violations;
      this.displayCheck = this.violations;
    });
  }

  // !SECTION

  // SECTION Functions
  // ANCHOR changeSort
  changeSort(value) {
    if (value === 'violations') {
      this.displayCheck = this.violations;
    }
    if (value === 'inapplicable') {
      this.displayCheck = this.inapplicable;
    }
    if (value === 'incomplete') {
      this.displayCheck = this.incomplete;
    }
    if (value === 'passes') {
      this.displayCheck = this.passes;
    }
  }
}

  // !SECTION
