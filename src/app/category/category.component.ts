import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({ selector: 'at-category', templateUrl: './category.component.html', styleUrls: ['./category.component.scss'] })
export class CategoryComponent implements OnInit {

  // SECTION Variables

  // NOTE "Door" open to send categoryId from website.component.ts
  @Input() categoryId: string;

  category;
  cat: any[] = [];
  categories = [];

  // !SECTION

  // SECTION Start
  // ANCHOR constructor
  constructor(private hs: HttpService, private route: ActivatedRoute) { }

  // ANCHOR ngOnit
  ngOnInit(): void {

    this.cat = [];

    // NOTE Split the String on "," and create an Array
    this.categories = this.categoryId.split(',').map(x => + x);

    if (this.categories[0] > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.categories.length; i++) {

        this.hs.getCat(this.categories[i]).subscribe(response => {
          for (const [key, value] of Object.entries(response)) {
            if (`${key}` === 'name') {
              this.cat.push(value);
            }
          }
        });
      }
    } else {
      this.cat = ['Keine Kategorie angegeben'];
    }
  }
}

  // !SECTION
