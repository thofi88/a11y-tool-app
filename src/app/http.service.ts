import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Websites } from './websites';
import { Checks } from './checks';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Websites[]>(`${this.apiUrl}/websites`);
  }
  getAllChecks(websiteId){
    return this.http.get<Checks[]>(`${this.apiUrl}/websiteCheck/` + websiteId);
  }
  getCat(catId: string) {
    return this.http.get(`${this.apiUrl}/category/${catId}`);
  }
  getSingleCheck(checkId: string) {
    return this.http.get<Checks>(`${this.apiUrl}/websiteOneCheck/${checkId}`);
  }
}
