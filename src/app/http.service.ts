import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Websites } from './websites';
import { Checks } from './checks';
import { Category } from './category';
import { NewWebsite } from './new-website';
import { NewCheck } from './new-check';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Websites[]>(`${this.apiUrl}/websites`);
  }
  getAllChecks(websiteId) {
    return this.http.get<Checks[]>(`${this.apiUrl}/websiteCheck/` + websiteId);
  }
  getCat(catId: string) {
    return this.http.get(`${this.apiUrl}/category/${catId}`);
  }
  getSingleCheck(checkId: string) {
    return this.http.get<Checks>(`${this.apiUrl}/websiteOneCheck/${checkId}`);
  }
  getAllCat() {
    return this.http.get<Category[]>(`${this.apiUrl}/category`);
  }
  createCat(newCat) {
    return this.http.post<any>(`${this.apiUrl}/newCat`, newCat);
  }
  createWebsite(website: NewWebsite) {
    return this.http.post<NewWebsite>(`${this.apiUrl}/websites`, website);
  }
  createWebsiteCheck(check: NewCheck) {
    return this.http.post<NewCheck>(`${this.apiUrl}/websiteCheck`, check);
  }
  updateWebsite(website: NewWebsite, id) {
    return this.http.put(`${this.apiUrl}/websites/${id}` , website);
  }
  updateWebsiteCheck(check: NewCheck, id) {
    return this.http.put(`${this.apiUrl}/websiteCheck/${id}` , check);
  }
  getSingleWebsiteId() {
    return this.http.get(`${this.apiUrl}/websiteOneId`);
  }
  getSingleWebsite(websiteId) {
    return this.http.get(`${this.apiUrl}/websites/` + websiteId);
  }
}
