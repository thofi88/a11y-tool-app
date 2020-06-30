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


  cats: Category[];
  checks: Checks[];
  newCatname;

  websiteForm = new FormGroup({
    name: new FormControl(''),
    home_url: new FormControl(''),
    skills: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        url: new FormControl('')
      })
    ])
  });

  checkForm: FormGroup;
  websiteIds = [];
  // public urls: any[] = [{
  //   name: '',
  //   url: ''
  // }];
  websiteId: any;
  changes: boolean;
  // websiteUpdate: Object;
  skills = this.websiteForm.get('skills') as FormArray;

  constructor(private route: ActivatedRoute, private hs: HttpService, private router: Router) {

    this.route.params.subscribe(params => {
      this.websiteId = params.websiteId;
      if (this.websiteId === undefined) {
        this.changes = false;
      }
      else {
        this.changes = true;

    //     this.hs.getSingleWebsite(this.websiteId).subscribe(response => {

    //       this.websiteUpdate = Object.values(response)[0];
    //       this.name = Object.values(response)[1];
    //       this.homeUrl = Object.values(response)[2];

    //       console.log(this.websiteUpdate)

    //       this.hs.getAllChecks(this.websiteUpdate).subscribe(checks => {

    //         this.checks = checks;
    //         this.urls = [];

    //         for (let i = 0; i < this.checks.length; i++) {

    //           this.urls.push({
    //             name: '',
    //             url: ''
    //           });

    //           this.urls[i].name = Object.values(this.checks[i])[1];
    //           this.urls[i].url = Object.values(this.checks[i])[3];

    //         }

    //         console.log(this.urls)

    //       });

    //     });

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

    this.hs.getAllCat().subscribe(cats => this.cats = cats);

  }
  addSkill() {
    const group = new FormGroup({
      name: new FormControl(''),
      url: new FormControl('')
    });

    this.skills.push(group);
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  createCat() {
    const newCat = {
      name: this.newCatname
    };
    this.hs.createCat(newCat).subscribe(() =>
      this.hs.getAllCat().subscribe(cats => {
        this.cats = cats
        this.newCatname = '';
      })
    );
  }
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



    if (this.changes) {
      this.update(website);
    }
    else {
      this.create(website);
    }

    this.websiteForm.reset();
  }
  update(website: NewWebsite) {
    console.log('update')
  }

  create(website: NewWebsite) {
    console.log('create')
    this.hs.createWebsite(website).subscribe(() => {

      this.hs.getSingleWebsiteId().subscribe(response => {

        this.websiteId = Object.values(response[0])[0];

        for (let i = 0; i < this.skills.length; i++) {
          // console.log(this.urls[i].name);
          // console.log(this.urls[i].url);
          const check: NewCheck = {

            // ! Hier muss es weiter gehen mit dem auslesen des Formgroup Arrays
            website_name: this.skills[i].name,
            url: this.skills[i].url,
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

          this.hs.createWebsiteCheck(check).subscribe();

          console.log('check:');
          console.log(check);

        }
        this.checkForm.reset();
        this.router.navigate(['/']);
      })
    });

    console.log('Webseite:');
    console.log(website);
  }

  // addURL(i: number) {
  //   this.urls.push({
  //     name: '',
  //     url: ''
  //   });
  //   console.log(this.urls.length)
  // }
  // removeURL(i: number) {
  //   this.urls.splice(i, 1);
  // }

}
