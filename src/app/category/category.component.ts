import {Component, OnInit, Input} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute} from '@angular/router';

@Component({selector: 'at-category', templateUrl: './category.component.html', styleUrls: ['./category.component.scss']})
export class CategoryComponent implements OnInit {

    @Input()categoryId : string;

    category;
    cat : any[] = [];
    categories = [];

    constructor(private hs : HttpService, private route : ActivatedRoute) {}

    ngOnInit(): void {
        this.cat = [];

        this.categories = this.categoryId.split(',').map(x => + x);
        if (this.categories[0] > 0) {
            for (let i = 0; i < this.categories.length; i++) {

                this.hs.getCat(this.categories[i]).subscribe(response => {
                    for (const [key, value] of Object.entries(response)) {
                        if (`${key}` === 'name') {
                            // console.log(key);
                            // console.log(value);
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
