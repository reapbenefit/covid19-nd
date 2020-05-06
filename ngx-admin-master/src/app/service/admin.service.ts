import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IAdmin } from './IAdmin';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  nodeAppUrl = 'http://localhost:8080/';
  nodeJsHttpHeaders = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };


  publicDataFormSubmit(formResponse) {
    return this.httpClient.post(this.nodeAppUrl + 'user-form-submit', formResponse, this.nodeJsHttpHeaders);
  }
  getPublicTableData(): Observable<IAdmin[]> {
    return this.httpClient.get<IAdmin[]>(this.nodeAppUrl + 'get-public-table', this.nodeJsHttpHeaders).catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");

  }

  getcasestats() {
    return this.httpClient.get(this.nodeAppUrl + 'get-case-stats', this.nodeJsHttpHeaders);
  }

  getfoodstats() {
    return this.httpClient.get(this.nodeAppUrl + 'get-food-stats', this.nodeJsHttpHeaders);
  }
}


