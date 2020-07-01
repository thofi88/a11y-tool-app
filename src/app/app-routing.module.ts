import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsitesComponent } from './websites/websites.component';
import { NewWebsiteComponent } from './new-website/new-website.component';
import { ChecksDetailsComponent } from './checks-details/checks-details.component';

// SECTION defines all routes from app
const routes: Routes = [
  { path: '', redirectTo: 'websites', pathMatch: 'full' },
  { path: 'websites', component: WebsitesComponent},
  { path: 'websites/new', component: NewWebsiteComponent},
  { path: 'websites/new/:websiteId', component: NewWebsiteComponent},
  { path: 'websites/check/:checkId', component: ChecksDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// !SECTION
