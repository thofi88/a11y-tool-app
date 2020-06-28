import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsitesComponent } from './websites/websites.component';
import { NewWebsiteComponent } from './new-website/new-website.component';
import { ChecksDetailsComponent } from './checks-details/checks-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'websites', pathMatch: 'full' },
  { path: 'websites', component: WebsitesComponent},
  { path: 'websites/new-website/:websiteId', component: NewWebsiteComponent},
  { path: 'websites/check/:checkId', component: ChecksDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
