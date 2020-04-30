import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getCategory() {
    return this.httpClient.get(this.nodeAppUrl + 'get-category', this.nodeJsHttpHeaders)
  }

  getPublicTableData() {
    return this.httpClient.get(this.nodeAppUrl + 'get-public-table', this.nodeJsHttpHeaders);
  }
}


