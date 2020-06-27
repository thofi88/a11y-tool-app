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
  step = 0;
  oneCheck: JSON;

  constructor(private route: ActivatedRoute, private hs: HttpService) {



  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('checkId')),
      switchMap(checkId => this.hs.getSingleCheck(checkId))
    ).subscribe(check => this.check = check);

  }

  ngAfterViewInit(){
    //this.oneCheck = this.check.result[0].violations;

    //console.log(JSON.stringify(this.oneCheck));
  };

  setStep(index: number) {
    this.step = index;
    console.log('setStep:' + this.step);
  }

}
