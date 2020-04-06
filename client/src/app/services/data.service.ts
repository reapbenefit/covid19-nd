import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    public baseURL = "https://devlp.solveninja.org/wp-includes/rest-api";
    public baseURLCOVID = "https://devlp.solveninja.org/wp-includes/covid/rest-api";
    // public baseURL = "https://solveninja.org/wp-includes/rest-api";
    public SelectedCity = 1;
    public SelectedCityLat = 12.9796;
    public SelectedCityLng = 77.5906;
    public centerLng = 12.9796;
    public centerLat = 77.5906;
    public zoom = 10;
    public AQMDataList;
    public getcurrentlocation = false;
    public catType = 0;
    public SelectCityID = 1;
    public SelIssCat;
    public wardSelectedID = 0;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    constructor(private httpClient: HttpClient) { }

    getCampaigns(obj) {
        return this.httpClient.get(`${this.baseURL}/neighbourHood/getCampaigns.php`, { headers: this.headers });
    }
    getAgencies(obj) {
        return this.httpClient.post(`${this.baseURL}/Agency/GetCivicAgencies.php`, obj, { headers: this.headers });
    }
    getGovernance(obj) {
        return this.httpClient.post(`${this.baseURL}/Governance/GetGovernanceData.php`, obj, { headers: this.headers });
    }
    getDWCC(obj) {
        return this.httpClient.post(`${this.baseURL}/DWCC/GetDWCCData.php`, obj, { headers: this.headers });
    }
    getToilets(obj) {
        return this.httpClient.post(`${this.baseURL}/Toilets/GetToiletsData.php`, obj, { headers: this.headers });
    }
    getReports(obj) {
        return this.httpClient.post(`${this.baseURL}/neighbourHood/getReports.php`, obj, { headers: this.headers });
    }
    compareReport(obj) {
        return this.httpClient.post(`${this.baseURL}/neighbourHood/compareReports.php`, obj, { headers: this.headers });
    }
    AQMdata(obj) {
        return this.httpClient.post(`${this.baseURL}/AQM/GetAqmValues.php`, obj, { headers: this.headers });
    }
    AQMDataStn(obj) {
        return this.httpClient.post(`${this.baseURL}/AQM/GetAqmDataForStation.php`, obj, { headers: this.headers });
    }
    getCorrLocWard(obj) {
        return this.httpClient.post(`${this.baseURL}/getWardName.php`, obj, { headers: this.headers });
    }
    getCorrLocDetails(obj) {
        return this.httpClient.post(`${this.baseURL}/getDetailData.php`, obj, { headers: this.headers });
        // return this.httpClient.post(`${this.baseURL}/neighbourHood/getDetailData.php`, obj, { headers: this.headers });
    }

    //New APIs
    getDashboardData(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/getDetailData.php`, obj, { headers: this.headers });
    }

    getMenuList(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/getMenuItems.php`, obj, { headers: this.headers });
    }
    CollectionsData(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/controller.php`, obj, { headers: this.headers });
    }
    cityDetails() {
        return this.httpClient.post(`${this.baseURL}/neighbourHood/getCities.php`, { headers: this.headers });
    }
    wardDetails(obj) {
        return this.httpClient.post(`${this.baseURL}/neighbourHood/getWards.php`, obj, { headers: this.headers });
    }
    ichangemycity(lat, lan) {
        return this.httpClient.get(`https://www.ichangemycity.com/map/get_ward?latitude=${lat}&longitude=${lan}`, { headers: this.headers });
    }
}