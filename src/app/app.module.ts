import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LOCALE_ID} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe, localeDeExtra);

import { HttpClientModule } from '@angular/common/http';
import { WebsitesComponent } from './websites/websites.component';
import { SplitListInLiTagPipe } from './split-list-in-li-tag.pipe';
import { WebsiteDetailsComponent } from './website-details/website-details.component';
import { ChecksDetailsComponent } from './checks-details/checks-details.component';
import { CategoryComponent } from './category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FormsModule} from '@angular/forms';
import { SortByPipe } from './sort-by.pipe'

@NgModule({
  declarations: [
    AppComponent,
    WebsitesComponent,
    SplitListInLiTagPipe,
    WebsiteDetailsComponent,
    ChecksDetailsComponent,
    CategoryComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
