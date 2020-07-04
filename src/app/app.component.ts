import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Category } from './category';
import { Websites } from './websites';
import { NewWebsite } from './new-website';

@Component({
  selector: 'at-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // SECTION variables

  title = 'a11y-tool';
  cats: Category[];
  catname;
  step = 0;
  panelOpenState = false;
  panelArray = [];
  websites: Websites[];
  categories: number[];

  // !SECTION

  constructor(private hs: HttpService) {
  }

  // ANCHOR ngOnit
  ngOnInit(): void {

  }
}
