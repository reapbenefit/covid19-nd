import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
declare var $: any;
@Injectable({
    providedIn: 'root',
})
export class DataService {

    public baseURL = "https://devlp.solveninja.org/wp-includes/rest-api";
    public baseURLCOVID = "https://devlp.solveninja.org/wp-includes/covid/rest-api";
    public baseURLES = "http://52.172.26.84/"
    public baseEsSolv = "https://es.solveninja.org/"
    // public baseURL = "https://solveninja.org/wp-includes/rest-api";
    public SelectedCity = 1;
    public SelectedCityLat = 12.9796;
    public SelectedCityLng = 77.5906;
    public centerLng = 12.9796;
    public centerLat = 77.5906;
    public topLeft = { lat: this.SelectedCityLat, lng: this.SelectedCityLng };
    public bottomRight = { lat: this.SelectedCityLat, lng: this.SelectedCityLng };
    public zoom = 13;
    public AQMDataList;
    public getcurrentlocation = false;
    public catType = 0;
    public SelectCityID = 1;
    public SelIssCat;
    public wardSelectedID = 0;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    constructor(private httpClient: HttpClient, public datepipe: DatePipe) { }



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
        return this.httpClient.post(`${this.baseURLCOVID}/getDetailData.php`, obj, { headers: this.headers });
        // return this.httpClient.post(`${this.baseURL}/neighbourHood/getDetailData.php`, obj, { headers: this.headers });
    }

    getCorrLocDetailsNewOne(obj) {
        return this.httpClient.get(`${this.baseEsSolv}/places?id=${obj.id}`, { headers: this.headers });
    }

    //New APIs
    getDashboardData(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/getDetailData.php`, obj, { headers: this.headers });
    }

    /**
     * @param obj Get MenuList
     */
    MenuList = [];
    getMenuList(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/getMenuItems.php`, obj, { headers: this.headers });
    }
    private getSubMenus(obj) {
        var menu;
        let menuItems = []
        obj["menuData"].forEach((menu, index) => {
            let submenus = menu["submenus"];
            var id;
            submenus.split(",").forEach((id, index) => {
                menuItems.push(id);
            });
        });
        return menuItems;
    }
    CollectionsDataES(obj) {
        console.log(obj);
        let menuItems = this.getSubMenus(obj);
        let params = {
            menuData: menuItems,
            topLeftLat: "" + this.topLeft.lat,
            topLeftLon: "" + this.topLeft.lng,
            bottomRightLat: "" + this.bottomRight.lat,
            bottomRightLon: "" + this.bottomRight.lng,
        };
        console.log(params);
        return this.httpClient.get(`${this.baseEsSolv}/places`, { params: params, headers: this.headers });
    }
    getCategoryImpactsDataES(obj) {
        console.log(obj);
        let menuItems = this.getSubMenus(obj);
        let params = {
            menuData: menuItems,
            // topLeftLat: "" + obj.topLeftLat,
            // topLeftLon: "" + obj.topLeftLon,
            // bottomRightLat: "" + obj.bottomRightLat,
            // bottomRightLon: "" + obj.bottomRightLon,
            // latitude: "" + obj.latitude,
            // longitude: "" + obj.longitude
        };
        console.log(params);
        return this.httpClient.get(`${this.baseEsSolv}/categoryImpacts`, { params: params, headers: this.headers });
    }
    getCountDataES(obj) {
        let menuItems = this.getSubMenus(obj);
        let params = {
            menuData: menuItems,
            latitude: "" + obj.latitude,
            longitude: "" + obj.longitude,
            radius: '30km'
        };
        return this.httpClient.get(`${this.baseEsSolv}/categoryCounts`, { params: params, headers: this.headers });
    }
    getCountAllDataES(obj) {
        let menuItems = this.getSubMenus(obj);
        let params = {
            menuData: menuItems
        };
        return this.httpClient.get(`${this.baseEsSolv}/categoryCounts`, { params: params, headers: this.headers });
    }
    getUserInfo() {
        return this.httpClient.get(`/api/v1/user/data/read`, { headers: this.headers });
    }

    /**
     * Update ES
     * @param obj
     */
    updateESRecord(obj, ass = '') {
        var settings = {
            "url": "https://es.solveninja.org/updatePlaceClosed",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": {
                "place_org_id": obj.place_org_id,
                "closed_at": ass != 'assigned' ? this.datepipe.transform(new Date(), 'yyyy-MM-dd') : '',
                "closed_by": ass != 'assigned' ? obj.closed_by: '',
                "subcategory": obj.place_org_subcategory
            }
        }
        if ($) {
            $.ajax(settings).done(function (response) {
                console.log(response);
            });
        }
    }

    /**
     * @param obj Get All Given for Logged In User
     */
    assignme(obj) {
        return this.httpClient.post(`/assignme`, obj, { headers: this.headers });
    }

    /**
     * @param obj Get All Given for Logged In User
     */
    givenbyme(obj) {
        return this.httpClient.post(`/givenbyme`, obj, { headers: this.headers });
    }

    /**
     * @param obj Save User for Assign / Given
     */
    getUserAssignedList(obj) {
        return this.httpClient.post(`/getassignedlist`, obj, { headers: this.headers });
    }

    /**
     * @param obj Get getAllassignedList
     */
    getAllassignedList(obj) {
        return this.httpClient.post(`/getAllassignedList`, obj, { headers: this.headers });
    }

    /**
     * @param obj Get GettotalClosedAsignment
     */
    GettotalClosedAsignmentUser(obj) {
        return this.httpClient.post(`/getTotalClosedUser`, obj, { headers: this.headers });
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
