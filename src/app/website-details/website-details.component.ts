import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Checks } from '../checks';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'at-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.scss']
})
export class WebsiteDetailsComponent implements OnInit {

  @Input() websiteId: number;

  checks: Checks[];

  constructor(private route: ActivatedRoute, private hs: HttpService) { }

  ngOnInit(): void {

      this.hs.getAllChecks(this.websiteId).subscribe(checks => this.checks = checks);


  }

}
