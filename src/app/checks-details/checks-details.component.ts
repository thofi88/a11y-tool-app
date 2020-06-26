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

  check: Checks;
  constructor(private route: ActivatedRoute, private hs: HttpService) {

    this.route.paramMap.pipe(
      map(params => params.get('checkId')),
      switchMap(checkId => this.hs.getSingleCheck(checkId))
    ).subscribe(check => this.check = check);

  }

  ngOnInit(): void {
  }

}
