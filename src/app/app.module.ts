// NOTE all app imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NOTE imort german locales
import { LOCALE_ID} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe, localeDeExtra);

// NOTE import all components
import { WebsitesComponent } from './websites/websites.component';
import { WebsiteDetailsComponent } from './website-details/website-details.component';
import { ChecksDetailsComponent } from './checks-details/checks-details.component';
import { CategoryComponent } from './category/category.component';
import { NewWebsiteComponent } from './new-website/new-website.component';

// NOTE all other inputs for the app
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {SortByPipe} from './sort-by.pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { TextFieldModule } from '@angular/cdk/text-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HtmlTagOnlyContentPipe } from './html-tag-only-content.pipe';
import { FilterCategoryPipe } from './filter-category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WebsitesComponent,
    WebsiteDetailsComponent,
    ChecksDetailsComponent,
    CategoryComponent,
    SortByPipe,
    NewWebsiteComponent,
    HtmlTagOnlyContentPipe,
    FilterCategoryPipe,
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
    ReactiveFormsModule,
    TextFieldModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
