import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Category } from '../category';
import { Websites } from '../websites';
import { Router } from '@angular/router';
import { NewWebsite } from '../new-website';

@Component({
  selector: 'at-new-website',
  templateUrl: './new-website.component.html',
  styleUrls: ['./new-website.component.scss']
})
export class NewWebsiteComponent implements OnInit {

  cats: Category[];
  newCatname;
  websiteForm: FormGroup;

  constructor(private hs: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.websiteForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      home_url: new FormControl('', [
        Validators.required,
      ])
    });

    this.hs.getAllCat().subscribe(cats => this.cats = cats);
  }
  createCat(){
    const newCat = {
      name: this.newCatname
        };
    this.hs.createCat(newCat).subscribe( () =>
      this.hs.getAllCat().subscribe(cats => this.cats = cats)
    );
  }
  isInvalid(name: string) {
    const control = this.websiteForm.get(name);
    return control.invalid && control.touched;
  }

  submitForm() {
    if (this.websiteForm.invalid) {
      return;
    }

    const website: NewWebsite = {
      ...this.websiteForm.value,
      category_id: '2'
    };
    this.create(website);
    this.websiteForm.reset();
  }

  create(website: NewWebsite) {
    this.hs.createWebsite(website).subscribe(() => {
       // this.bs.getAll().subscribe(books => this.books = books);
       this.router.navigate(['/']);
    });
    console.log(website);
  }
}
