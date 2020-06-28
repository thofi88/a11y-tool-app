import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Category } from '../category';

@Component({
  selector: 'at-new-website',
  templateUrl: './new-website.component.html',
  styleUrls: ['./new-website.component.scss']
})
export class NewWebsiteComponent implements OnInit {

  cats: Category[];

  constructor(private hs: HttpService) { }

  ngOnInit(): void {
    this.hs.getAllCat().subscribe(cats => this.cats = cats);
  }

}
