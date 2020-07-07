import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Category } from './category';
import { Websites } from './websites';
import { NewWebsite } from './new-website';
import { Auto } from './auto';

@Component({
  selector: 'at-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // SECTION variables

  title = 'a11y-tool';
  automated;

  // !SECTION

  constructor(private hs: HttpService) {
  }

  // ANCHOR ngOnit
  ngOnInit(): void {
    console.log('ng')
    this.hs.getAutomation(0).subscribe(auto => {
      this.automated = auto;
      this.automated = this.automated.automated;
      console.log(this.automated);
    });

  }

  changeCheck(event) {

    if (event.target.checked) {
      console.log('an');
      this.automated = 1;
    }
    else {
      console.log('aus');
      this.automated = 0;
    }
    const auto: Auto = {
      automated: this.automated
    };
    this.hs.updateAutomation(auto, 0).subscribe();
  }
}
