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
  step = 0;
  term: string;

  constructor(private hs: HttpService) { }

  ngOnInit(): void {

    this.hs.getAll().subscribe(websites => this.websites = websites);
  }


  setStep(index: number) {
    this.step = index;
    console.log('setStep:' + this.step);
  }

}
