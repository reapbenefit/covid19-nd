import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../pages/public-form/public-form.category';
import { subCategory } from '../pages/public-form/public-form.subcategory';


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
  
  getPublicTableData() {
    return this.httpClient.get(this.nodeAppUrl + 'get-public-table', this.nodeJsHttpHeaders);
  }

 
  getWardId(location){
    console.log(location);
    return this.httpClient.get('http://es.solveninja.org/containingWard?longitude='+location.long+'&latitude='+location.lat, this.nodeJsHttpHeaders )
  }

  getCategories() {
    return [
     new Category('Amenities' ),
     new Category('Service' ),
     new Category('Governance' ),
     new Category('Utilities' ),
     new Category('Important Medical Services' ),
     new Category('Coronavirus' ),
     new Category('Relief Resources' ),
     new Category('Social Distancing' ),
     new Category('Relief Requested and Given' ),
     new Category('Shops near me' ),
     new Category('Volunteers near me' ),
     new Category('Settlements' ),
     new Category('Get Supplies' ),
    ];
  }

  getsubCategories() {
    return [
      new subCategory('Amenities', 'Waste - BioMethanisationUnit' ),
      new subCategory('Amenities', 'DryWasteCollectionCentre' ),
      new subCategory('Amenities', 'Waste'),
      new subCategory('Amenities', 'Waste - Bio Methanation Unit'),
 
      new subCategory('Service', 'Waste' ),
 
      new subCategory('Governance', 'MP'),
      new subCategory('Governance', 'MLA' ),
      new subCategory('Governance', 'Corporator' ),
 
      new subCategory('Utilities', 'Citizen Services"' ),
      new subCategory('Utilities', 'Citizen Services"' ),
 
      new subCategory('Important Medical Services', 'Corona Testing Centre' ),
      new subCategory('Important Medical Services', 'First Responder' ),
      new subCategory('Important Medical Services', 'Public Health Centres' ),
 
      new subCategory('Coronavirus', 'Good Social Distance' ),
      new subCategory('Coronavirus', 'Poor Social Distance' ),
 
      new subCategory('Relief Resources', 'Other Canteens' ),
      new subCategory('Relief Resources', 'RationsPDS' ),
      new subCategory('Relief Resources', 'Other NGOs' ),
      new subCategory('Relief Resources', 'Govt Canteens' ),
      new subCategory('Relief Resources', 'Rations' ),
      new subCategory('Relief Resources', 'NGO' ),
      new subCategory('Relief Resources', 'Medicines' ),
      new subCategory('Relief Resources', 'Money' ),
      new subCategory('Relief Resources', 'Shelter homes' ),
      new subCategory('Relief Resources', 'Free Cooked Food' ),
 
      new subCategory('Social Distancing', 'Good' ),
      new subCategory('Social Distancing', 'Poor' ),
 
      new subCategory('Relief Requested and Given', 'Rations-Asked' ),
      new subCategory('Relief Requested and Given', 'Fuel' ),
      new subCategory('Relief Requested and Given', 'Medicines' ),
      new subCategory('Relief Requested and Given', 'Verified' ),
      new subCategory('Relief Requested and Given', 'Rations-Given' ),
      new subCategory('Relief Requested and Given', 'Food – Asked' ),
      new subCategory('Relief Requested and Given', 'Grocery delivery' ),
      new subCategory('Relief Requested and Given', 'Processing' ),
      new subCategory('Relief Requested and Given', 'Health_Supplies-Given' ),
      new subCategory('Relief Requested and Given', 'Food - Given' ),
      new subCategory('Relief Requested and Given', 'Food - Given-DIPR' ),
 
      new subCategory('Shops near me', 'Grocery Delivery' ),
      new subCategory('Shops near me', 'Medicines' ),
      new subCategory('Shops near me', 'LPG' ),
      new subCategory('Shops near me', 'Medical' ),
 
 
      new subCategory('Volunteers near me', 'Volunteer' ),
      new subCategory('Volunteers near me', 'Union Reps' ),
 
      
      new subCategory('Settlements', 'Housing' ),
      new subCategory('Settlements', 'Construction Site' ),
      new subCategory('Settlements', 'Slums' ),
 
      new subCategory('Get Supplies', 'Groceries' ),
      new subCategory('Get Supplies', 'Medical' ),
      new subCategory('Get Supplies', 'Groceries Money' )
 
     ];
   }
 
}


