import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpService } from '../http.service';
import { Category } from '../category';
import { Router, ActivatedRoute } from '@angular/router';
import { NewWebsite } from '../new-website';
import { NewCheck } from '../new-check';
import { Checks } from '../checks';
import { Websites } from '../websites';


@Component({
  selector: 'at-new-website',
  templateUrl: './new-website.component.html',
  styleUrls: ['./new-website.component.scss']
})
export class NewWebsiteComponent implements OnInit {

  // SECTION Variables

  newCatname;
  changes = false;
  catArray: Category[];
  newChecks = [];
  websiteIds = [];
  cats: Category[];
  catsUpdate: Category[];
  websiteId: any;
  // tslint:disable-next-line: ban-types
  websiteUpdate: Object;
  checksUpdate: Checks[];
  newCheckArray = [];
  updateCheckId: Checks[];
  catname;
  step = 0;
  panelOpenState = false;
  panelArray = [];
  websites: Websites[];
  categories: number[];

  websiteForm = new FormGroup({
    name: new FormControl(''),
    home_url: new FormControl(''),
    checks: new FormArray([
      new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        url: new FormControl('')
      })
    ])
  });

  checks = this.websiteForm.get('checks') as FormArray;

  // !SECTION

  // SECTION Start
  // ANCHOR constructor
  constructor(private route: ActivatedRoute, private hs: HttpService, private router: Router) {

    // NOTE get Parameter websiteID from a updating website
    this.route.params.subscribe(params => {
      this.websiteId = params.websiteId;

      // NOTE Check if update or create a website
      if (this.websiteId === undefined) {
        this.changes = false;
      }
      else {
        this.changes = true;

        // NOTE get the Website find by ID
        this.hs.getSingleWebsite(this.websiteId).subscribe(response => {

          // NOTE find all categories from the updated Website
          this.catsUpdate = Object.values(response)[4].split(',').map(x => + x);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.catsUpdate.length; i++) {
            this.websiteIds.push(this.catsUpdate[i]);
          }

          // NOTE save id as a object to send
          this.websiteUpdate = Object.values(response)[0];

          // NOTE push values to forms input
          this.websiteForm.patchValue({
            name: Object.values(response)[1],
            home_url: Object.values(response)[2]
          });

          // NOTE get all Checks from the website
          this.hs.getAllChecks(this.websiteUpdate).subscribe(checks => {

            this.checksUpdate = checks;

            // NOTE creates so much checkForms how the website have
            for (let i = 0; i < this.checksUpdate.length; i++) {
              if (i >= 1) {
                this.addChecks();
              }

              // NOTE push to array for updating checks form
              this.newCheckArray.push({
                id: Object.values(this.checksUpdate[i])[0],
                name: Object.values(this.checksUpdate[i])[1],
                url: Object.values(this.checksUpdate[i])[3]
              });
            }
            // NOTE push values to check forms inputs
            this.checks.patchValue(this.newCheckArray);
          });
        });
      }
    });
  }
  // ANCHOR ngOnit
  ngOnInit(): void {

    // TODO validate form

    // NOTE get all categories
    this.hs.getAllCat().subscribe(cats => {
      this.cats = cats;
      for (let i = 0; i < this.cats.length; i++) {
        this.panelArray.push(i);
      }
    });
    // tslint:disable-next-line: prefer-for-of

  }

  // !SECTION

  // SECTION Functions
  // ANCHOR ifChecked
  // NOTE Check if the updated website categoriesneed to be checked
  ifChecked(id) {
    if (this.changes) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.catsUpdate.length; i++) {
        if (id === this.catsUpdate[i]) {
          return true;
        }

      }
    }
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
      console.log(id);
      this.hs.getAllWebsiteByCatId(id).subscribe(websites => {
        this.websites = websites;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.websites.length; i++) {
          this.categories = this.websites[i].category_id.split(',').map(x => + x);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.categories.length; i++) {

            const index = this.categories.indexOf(id);
            if (index > -1) {
              this.categories.splice(index, 1);
            }
          }
          const website: NewWebsite = {
            name: this.websites[i].name,
            home_url: this.websites[i].home_url,
            category_id: this.categories.map(x => x).join(',')
          };
          this.hs.updateWebsite(website, this.websites[i].id).subscribe(() => { });
        }

        // NOTE delete category from database
        this.hs.deleteCat(id).subscribe();

        // NOTE Update category list in modal and list

        const index = this.cats.map(item => item.id).indexOf(id);
        console.log(index);
        if (index > -1) {
          this.cats.splice(index, 1);
        }
        const indexWeb = this.websiteIds.indexOf(id);
        if (indexWeb > -1) {
        this.websiteIds.splice(indexWeb, 1);
      }
        // TODO remove this category from form
        console.log(this.cats);

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
  // ANCHOR addChecks
  // NOTE add new form controlls
  addChecks() {
    const group = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      url: new FormControl('')
    });
    this.checks.push(group);
  }

  // ANCHOR removeChecks
  // NOTE remove a spezified check forms
  removeChecks(index: number) {

    if (this.changes) {
      const confirm = window.confirm('Soll der Webseitencheck wirklich gelöscht werden, es werden auch die Ergebnisse der automatischen Überprüfung gelöscht.');
      if (confirm) {

        // NOTE controll wich check must be deleted
        if (this.changes) {
          for (let i = 0; i < this.checks.length; i++) {
            this.newChecks[i] = {
              id: this.websiteForm.value.checks[i].id,
              website_name: this.websiteForm.value.checks[i].name,
              url: this.websiteForm.value.checks[i].url,
            };
          }

          this.hs.deleteCheck(this.checks.value[index].id).subscribe();
          console.log(this.checks.value[index].id);

        }
        // NOTE remove the formcontroll
        this.checks.removeAt(index);
      }
      else {
        console.log('cancel');
      }
    }
    else {
      this.checks.removeAt(index);
    }
  }

  // ANCHOR createCat
  // NOTE create a new category
  createCat() {
    const newCat = {
      name: this.newCatname
    };
    this.hs.createCat(newCat).subscribe(
      () =>
        this.hs.getAllCat().subscribe(cats => {
          this.cats = cats;
          this.newCatname = '';
        })
    );
  }
  // FIXME if checked an than new category push same two IDs

  // ANCHOR websiteCat
  // NOTE push the the categorie the are checked and delete unchecked categories
  websiteCat(ids, event) {
    if (event.target.checked) {
      if (this.websiteIds[0] === 0) {
        this.websiteIds.push(ids);
        const index = this.websiteIds.indexOf(0);
        if (index > -1) {
          this.websiteIds.splice(index, 1);
        }

      }
      else {
        this.websiteIds.push(ids);
      }

    }
    else {
      const index = this.websiteIds.indexOf(ids);
      if (index > -1) {
        this.websiteIds.splice(index, 1);
      }
    }
  }

  // ANCHOR submitForm
  // NOTE save the new or updated website
  submitForm() {

    // NOTE get website and all checks infos from form
    const website: NewWebsite = {
      name: this.websiteForm.value.name,
      home_url: this.websiteForm.value.home_url,
      category_id: this.websiteIds.map(x => x).join(',')
    };
    this.newChecks = [];
    for (let i = 0; i < this.checks.length; i++) {
      this.newChecks[i] = {
        id: this.websiteForm.value.checks[i].id,
        website_name: this.websiteForm.value.checks[i].name,
        url: this.websiteForm.value.checks[i].url,
      };

    }

    // NOTE checks if update or create a website
    if (this.changes) {

      // NOTE updates a website
      this.hs.updateWebsite(website, this.websiteUpdate).subscribe(() => {

        // NOTE get all checks from the updated website
        this.hs.getAllChecks(this.websiteId).subscribe(checks => {
          this.updateCheckId = checks;
          for (let i = 0; i < this.checks.length; i++) {
            const id = this.newChecks[i].id;
            const check: NewCheck = {
              website_name: this.newChecks[i].website_name,
              url: this.newChecks[i].url,
              website_id: this.websiteId,
              checked: false,
              ranking: 0,
              result: JSON.stringify(
                {
                  inapplicable: [
                  ],
                  passes: [],
                  testEngine: {},
                  testEnvironment: {},
                  testRunner: {},
                  timestamp: '',
                  toolOptions: {},
                  url: '',
                  violations: []
                }
              )
            };

            // NOTE if the check not availble create else update
            if (id === '') {
              this.hs.createWebsiteCheck(check).subscribe();
            } else {
              this.hs.updateWebsiteCheck(check, id).subscribe();
            }
          }

          // NOTE if finished go back to the dashboard
          this.router.navigate(['/']);
        });
      });
    }
    else {
      console.log('create');

      // NOTE create the new website
      this.hs.createWebsite(website).subscribe(() => {

        // NOTE get the new website ID
        this.hs.getSingleWebsiteId().subscribe(response => {

          this.websiteId = Object.values(response[0])[0];

          // NOTE read all check forms
          for (let i = 0; i < this.checks.length; i++) {
            const check: NewCheck = {
              website_name: this.newChecks[i].website_name,
              url: this.newChecks[i].url,
              website_id: this.websiteId,
              checked: false,
              ranking: 0,
              result: JSON.stringify(
                {
                  inapplicable: [
                  ],
                  passes: [],
                  testEngine: {},
                  testEnvironment: {},
                  testRunner: {},
                  timestamp: '',
                  toolOptions: {},
                  url: '',
                  violations: []
                }
              )
            };

            // NOTE create the new checks
            this.hs.createWebsiteCheck(check).subscribe();
          }
          // NOTE go back to dashboard
          this.router.navigate(['/']);
        });
      });
    }
    // NOTE reset the websiteform
    this.websiteForm.reset();
  }
}

  // !SECTION
