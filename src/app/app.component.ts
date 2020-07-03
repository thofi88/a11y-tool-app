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

    // NOTE get all categories
    this.hs.getAllCat().subscribe(cats => {
      this.cats = cats;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.cats.length; i++) {
        this.panelArray.push(i);
      }
    });

  }
  // ANCHOR setStep accordion
  // NOTE to control the accordion
  setStep(index: number) {
    this.step = index;
  }

  // ANCHOR deleteCat
  // NOTE delete one category and all cross-reference from websites
  deleteCat(id) {
    const confirm = window.confirm('Soll die Kategorie wirklich gelöscht werden, es werden auch alle Querverweise zu den Webseiten gelöscht.');
    if (confirm) {
      console.log('ok');

      this.hs.getAllWebsiteByCatId(id).subscribe(websites => {
        this.websites = websites;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.websites.length; i++) {
          this.categories = this.websites[i].category_id.split(',').map(x => + x);
          for (let i = 0; i < this.categories.length; i++) {

            // FIXME reload category array not working
            const index = this.cats.indexOf(id);
            if (index > -1) {
              this.cats.splice(index, 1);
            }
          }
          const website: NewWebsite = {
            name: this.websites[i].name,
            home_url: this.websites[i].home_url,
            category_id: this.categories.map(x => x).join(',')
          };
          this.hs.updateWebsite(website, this.websites[i].id).subscribe(() => { });
        }
<<<<<<< Updated upstream

        // TODO delete category from database
=======
        // NOTE delete category from database
>>>>>>> Stashed changes
        this.hs.deleteCat(id).subscribe();
      });

    }
    else {
      console.log('cancel');
    }
  }

  // ANCHOR updateCat
  // NOTE to control the accordion
  updateCat(id) {

    console.log(id);

  }
}
