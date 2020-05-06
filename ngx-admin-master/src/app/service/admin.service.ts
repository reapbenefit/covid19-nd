import { Injectable } from '@angular/core';
import { Category } from '../pages/public-form/public-form.category';
import { subCategory } from '../pages/public-form/public-form.subcategory';
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

  //public_data_place_org_table Form Submit Function
  publicDataFormSubmit(formResponse) {
    return this.httpClient.post(this.nodeAppUrl + 'user-form-submit', formResponse, this.nodeJsHttpHeaders);
  }

  getIndividualsdata() {
    return this.httpClient.get(this.nodeAppUrl + 'individual-details', this.nodeJsHttpHeaders);
  }
  EditFormSubmit(formResponse) {
    console.log(formResponse);
    return this.httpClient.post(this.nodeAppUrl + 'edit-form-submit', formResponse, this.nodeJsHttpHeaders);
  }

  getPublicTableData(): Observable<IAdmin[]> {
    return this.httpClient.get<IAdmin[]>(this.nodeAppUrl + 'get-public-table', this.nodeJsHttpHeaders).catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");

  }

  //Function to Fetch Ward ID using Lat and Long - Works for Lat and Long info available in API (Bangalore)
  //Not Sure about Other Cities
  getWardId(location) {
    return this.httpClient.get('http://es.solveninja.org/containingWard?longitude=' + location.long + '&latitude=' + location.lat, this.nodeJsHttpHeaders)
  }

  //Function to fetch Categories of public_data_place_org_table
  getCategories() {
    return [
      new Category('Amenities'),
      new Category('Service'),
      new Category('Governance'),
      new Category('Utilities'),
      new Category('Important Medical Services'),
      new Category('Coronavirus'),
      new Category('Relief Resources'),
      new Category('Social Distancing'),
      new Category('Relief Requested and Given'),
      new Category('Shops near me'),
      new Category('Volunteers near me'),
      new Category('Settlements'),
      new Category('Get Supplies'),
    ];
  }

  //Function to fetch Mapped Categories and Sub Categories of public_data_place_org_table
  getsubCategories() {
    return [
      new subCategory('Amenities', 'Waste - BioMethanisationUnit'),
      new subCategory('Amenities', 'DryWasteCollectionCentre'),
      new subCategory('Amenities', 'Waste'),
      new subCategory('Amenities', 'Waste - Bio Methanation Unit'),

      new subCategory('Service', 'Waste'),

      new subCategory('Governance', 'MP'),
      new subCategory('Governance', 'MLA'),
      new subCategory('Governance', 'Corporator'),

      new subCategory('Utilities', 'Citizen Services"'),
      new subCategory('Utilities', 'Citizen Services"'),

      new subCategory('Important Medical Services', 'Corona Testing Centre'),
      new subCategory('Important Medical Services', 'First Responder'),
      new subCategory('Important Medical Services', 'Public Health Centres'),

      new subCategory('Coronavirus', 'Good Social Distance'),
      new subCategory('Coronavirus', 'Poor Social Distance'),

      new subCategory('Relief Resources', 'Other Canteens'),
      new subCategory('Relief Resources', 'RationsPDS'),
      new subCategory('Relief Resources', 'Other NGOs'),
      new subCategory('Relief Resources', 'Govt Canteens'),
      new subCategory('Relief Resources', 'Rations'),
      new subCategory('Relief Resources', 'NGO'),
      new subCategory('Relief Resources', 'Medicines'),
      new subCategory('Relief Resources', 'Money'),
      new subCategory('Relief Resources', 'Shelter homes'),
      new subCategory('Relief Resources', 'Free Cooked Food'),

      new subCategory('Social Distancing', 'Good'),
      new subCategory('Social Distancing', 'Poor'),

      new subCategory('Relief Requested and Given', 'Rations-Asked'),
      new subCategory('Relief Requested and Given', 'Fuel'),
      new subCategory('Relief Requested and Given', 'Medicines'),
      new subCategory('Relief Requested and Given', 'Verified'),
      new subCategory('Relief Requested and Given', 'Rations-Given'),
      new subCategory('Relief Requested and Given', 'Food – Asked'),
      new subCategory('Relief Requested and Given', 'Grocery delivery'),
      new subCategory('Relief Requested and Given', 'Processing'),
      new subCategory('Relief Requested and Given', 'Health_Supplies-Given'),
      new subCategory('Relief Requested and Given', 'Food - Given'),
      new subCategory('Relief Requested and Given', 'Food - Given-DIPR'),

      new subCategory('Shops near me', 'Grocery Delivery'),
      new subCategory('Shops near me', 'Medicines'),
      new subCategory('Shops near me', 'LPG'),
      new subCategory('Shops near me', 'Medical'),


      new subCategory('Volunteers near me', 'Volunteer'),
      new subCategory('Volunteers near me', 'Union Reps'),


      new subCategory('Settlements', 'Housing'),
      new subCategory('Settlements', 'Construction Site'),
      new subCategory('Settlements', 'Slums'),

      new subCategory('Get Supplies', 'Groceries'),
      new subCategory('Get Supplies', 'Medical'),
      new subCategory('Get Supplies', 'Groceries Money')

    ];
  }

}
