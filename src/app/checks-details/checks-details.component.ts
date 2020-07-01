import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checks } from '../checks';
import { HttpService } from '../http.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'at-checks-details',
  templateUrl: './checks-details.component.html',
  styleUrls: ['./checks-details.component.scss']
})
export class ChecksDetailsComponent implements OnInit {

  // SECTION Variables

  check: Checks;
  step = 0;
  oneCheck: JSON;
  inapplicable;
  incomplete;
  passes;
  violations;
  inapplicableTrue;
  incompleteTrue;
  passesTrue;
  violationsTrue;
  checkTime;
  displayCheck;
  checks: Checks[];
  newCheck: Checks;
  sortField = 'violations';

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
      this.checkTime = this.oneCheck[0].timestamp;
      this.inapplicable = this.oneCheck[0].inapplicable;
      this.incomplete = this.oneCheck[0].incomplete;
      this.passes = this.oneCheck[0].passes;
      this.violations = this.oneCheck[0].violations;
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
