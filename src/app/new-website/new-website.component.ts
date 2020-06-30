import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpService } from '../http.service';
import { Category } from '../category';
import { Websites } from '../websites';
import { Router, ActivatedRoute } from '@angular/router';
import { NewWebsite } from '../new-website';
import { NewCheck } from '../new-check';
import { Checks } from '../checks';


@Component({
  selector: 'at-new-website',
  templateUrl: './new-website.component.html',
  styleUrls: ['./new-website.component.scss']
})
export class NewWebsiteComponent implements OnInit {

  newCatname;
  changes: boolean = false;
  catArray: Category[];
  newChecks = [];
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

  websiteIds = [];
  cats: Category[];
  catsUpdate: Category[];
  websiteId: any;
  websiteUpdate: Object;
  checks = this.websiteForm.get('checks') as FormArray;
  checksUpdate: Checks[];
  newCheckArray = [];
  updateCheckId: Checks[];

  constructor(private route: ActivatedRoute, private hs: HttpService, private router: Router) {

    this.route.params.subscribe(params => {
      this.websiteId = params.websiteId;
      if (this.websiteId === undefined) {
        this.changes = false;
      }
      else {
        this.changes = true;

        this.hs.getSingleWebsite(this.websiteId).subscribe(response => {

          this.catsUpdate = Object.values(response)[4].split(',').map(x => + x);

          for (let i = 0; i < this.catsUpdate.length; i++) {
            this.websiteIds.push(this.catsUpdate[i]);
          }
          // console.log(this.catsUpdate);

          this.websiteUpdate = Object.values(response)[0];
          this.websiteForm.patchValue({
            name: Object.values(response)[1],
            home_url: Object.values(response)[2]
          });
          // this.websiteForm.setValue(Object.values(response)[1])

          // this.websiteForm.value.home_url = Object.values(response)[2];

          // console.log(this.websiteUpdate)

          this.hs.getAllChecks(this.websiteUpdate).subscribe(checks => {

            this.checksUpdate = checks;

            for (let i = 0; i < this.checksUpdate.length; i++) {

              if (i >= 1) {

                this.addChecks()
              }

              // console.log(this.websiteForm.controls.checks.value[i])

              //

              this.newCheckArray.push({
                id: Object.values(this.checksUpdate[i])[0],
                name: Object.values(this.checksUpdate[i])[1],
                url: Object.values(this.checksUpdate[i])[3]
              })

              // this.websiteForm.controls.checks.value[i].patchValue({
              //     name: Object.values(this.checksUpdate[i])[1],
              //     url: Object.values(this.checksUpdate[i])[3]
              // });


            }
            // console.log(this.newCheckArray)
            this.checks.patchValue(this.newCheckArray)
            //   console.log(this.urls)
            //console.log(this.checks)
          });

        });

      }
    });


  }

  ngOnInit(): void {

    // this.websiteForm = new FormGroup({
    //   name: new FormControl('', [
    //     Validators.required
    //   ]),
    //   home_url: new FormControl('', [
    //     Validators.required,
    //   ])
    // });
    // this.checkForm = new FormGroup({
    //   name: new FormControl('', [
    //     Validators.required
    //   ]),
    //   url: new FormControl('', [
    //     Validators.required
    //   ])
    // });

    this.hs.getAllCat().subscribe(cats => {

      this.cats = cats
      for (let i = 0; i < this.cats.length; i++) {
        // this.addCat(this.catArray[i].name, i, this.catArray[i].id);

      }
    });

  }
  ifChecked(id) {
    // console.log(id)
    if (this.changes) {
      for (let i = 0; i < this.catsUpdate.length; i++) {
        // console.log('id' + id)
        // console.log('catId' + this.catsUpdate[i])
        // console.log('------------------------')
        if (id === this.catsUpdate[i]) {
          return true;
        }

      }
    }
  }

  addChecks() {
    const group = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      url: new FormControl('')
    });

    this.checks.push(group);
  }
  removeChecks(index: number) {

    if (this.changes) {
      for (let i = 0; i < this.checks.length; i++) {
        this.newChecks[i] = {
          id: this.websiteForm.value.checks[i].id,
          website_name: this.websiteForm.value.checks[i].name,
          url: this.websiteForm.value.checks[i].url,
        }

        // console.log(this.websiteForm.value.checks[i].name)
      }

      // ! wird noch nicht gelöscht
      this.hs.deleteCheck(this.checks.value[index].id).subscribe();
      console.log(this.checks.value[index].id)

    }
    this.checks.removeAt(index);
  }

  // addCat(catName, i , id) {
  //   // console.log(catName)
  //   const newCat = new FormGroup({
  //     name: new FormControl(''),
  //     selected: new FormControl(''),
  //     id: new FormControl(''),
  //   })
  //   this.cats.push(newCat);
  //   this.cats.controls[i].value.selected = true;
  //   this.cats.controls[i].value.name = catName;
  //   console.log(this.cats.controls[i].value.name)
  // }

  // removeCat(index: number) {
  //   this.cats.removeAt(index);
  // }


  createCat() {
    const newCat = {
      name: this.newCatname
    };
    this.hs.createCat(newCat).subscribe(
      () =>
        this.hs.getAllCat().subscribe(cats => {
          this.cats = cats
          this.newCatname = '';
        })
    );
  }

  // ! Hier werden die, wenn schon was gecheckt, dann wird es zweimal gespeichert

  websiteCat(ids, event) {
    if (event.target.checked) {
      this.websiteIds.push(ids);
    }
    else {
      const index = this.websiteIds.indexOf(ids);
      if (index > -1) {
        this.websiteIds.splice(index, 1);
      }
    }

  }

  // isInvalid(name: string) {
  //   const control = this.websiteForm.get(name);
  //   return control.invalid && control.touched;
  // }

  submitForm() {
    // * Check if the websiteform is valid
    // if (this.websiteForm.invalid) {
    //   return;
    // }

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
      }

      // console.log(this.websiteForm.value.checks[i].name)
    }

    if (this.changes) {
      console.log('update');
      //console.log(this.websiteUpdate);
      //console.log(website);
      this.hs.updateWebsite(website, this.websiteUpdate).subscribe(() => {

        this.hs.getAllChecks(this.websiteId).subscribe(checks => {

          this.updateCheckId = checks


          for (let i = 0; i < this.checks.length; i++) {
            // console.log(this.urls[i].name);
            //console.log(this.websiteForm.value.checks[i].name);
            const id = this.newChecks[i].id;
            const check: NewCheck = {

              website_name: this.newChecks[i].website_name,
              url: this.newChecks[i].url,
              website_id: this.websiteId,
              result: JSON.stringify([
                {
                  "inapplicable": [
                  ],
                  "passes": [],
                  "testEngine": {},
                  "testEnvironment": {},
                  "testRunner": {},
                  "timestamp": "",
                  "toolOptions": {},
                  "url": "",
                  "violations": []
                }
              ])

            };


            if (id === '') {
              this.hs.createWebsiteCheck(check).subscribe();
            } else {
              this.hs.updateWebsiteCheck(check, id).subscribe();

            }
            //console.log(check)


            //console.log('check:');
            //console.log(check);

          }
          this.router.navigate(['/']);
        });
      }

      )
      //   .subscribe(() => {


      // })

    }
    else {
      console.log('create')
      this.hs.createWebsite(website).subscribe(() => {

        this.hs.getSingleWebsiteId().subscribe(response => {

          this.websiteId = Object.values(response[0])[0];

          for (let i = 0; i < this.checks.length; i++) {
            // console.log(this.urls[i].name);
            //console.log(this.websiteForm.value.checks[i].name);
            const check: NewCheck = {

              website_name: this.newChecks[i].website_name,
              url: this.newChecks[i].url,
              website_id: this.websiteId,
              result: JSON.stringify([
                {
                  "inapplicable": [
                  ],
                  "passes": [],
                  "testEngine": {},
                  "testEnvironment": {},
                  "testRunner": {},
                  "timestamp": "",
                  "toolOptions": {},
                  "url": "",
                  "violations": []
                }
              ])
            };

            // console.log(check)
            this.hs.createWebsiteCheck(check).subscribe();

            // console.log('check:');
            // console.log(check);

          }
          //this.checkForm.reset();
          this.router.navigate(['/']);
        })
      });

      // console.log('Webseite:');
      // console.log(website);
    }


    this.websiteForm.reset();
  }





}
