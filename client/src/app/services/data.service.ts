import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Subscription, forkJoin } from 'rxjs';
import { CommonService } from './common.service';
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
    public zoom = 11;
    public AQMDataList;
    public getcurrentlocation = false;
    public catType = 0;
    public SelectCityID = 1;
    public SelIssCat;
    public wardSelectedID = 0;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    subscriptionWithUserData: Subscription;
    orgname = '';
    constructor(private httpClient: HttpClient, public datepipe: DatePipe, public commonService: CommonService) {
        this.subscriptionWithUserData = this.commonService.getorgname().subscribe(res => {
            return this.orgname = res.data;
        })
    }

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
        var url = `${this.baseEsSolv}/places?id=${obj.id}`;
        return this.httpClient.get(url, { headers: this.headers });
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
        this.subscriptionWithUserData = this.commonService.getorgname().subscribe(res => {
            this.orgname = res.data;
        });
        // console.log(obj);
        let menuItems = this.getSubMenus(obj);
        let params = {
            menuData: menuItems,
            topLeftLat: "" + this.topLeft.lat,
            topLeftLon: "" + this.topLeft.lng,
            bottomRightLat: "" + this.bottomRight.lat,
            bottomRightLon: "" + this.bottomRight.lng,
        };
        if (this.orgname != "All" && this.orgname != '') { params['creatorOrg'] = this.orgname};

        var url = `${this.baseEsSolv}/places`;
        // console.log(this.orgname);
        // console.log(params);
        return this.httpClient.get(url, { params: params, headers: this.headers });
    }
    CollectionsDataESByZone(obj, zoneFilters: string[]) {
        if(zoneFilters && zoneFilters.length > 0) {
            console.log(obj);
            console.log(zoneFilters);
            let url = `http://es.solveninja.org:4321/placesWithZones`;
            let menuItems = this.getSubMenus(obj);
            let params = {
                menuData: menuItems,
                topLeftLat: "" + this.topLeft.lat,
                topLeftLon: "" + this.topLeft.lng,
                bottomRightLat: "" + this.bottomRight.lat,
                bottomRightLon: "" + this.bottomRight.lng,
                zoneIds: zoneFilters
            };
            console.log(params);
            return this.httpClient.get(url, { params: params, headers: this.headers });
        } else {
            return this.CollectionsDataES(obj);
        }
    }
    getCountDataES(obj) {
        this.subscriptionWithUserData = this.commonService.getorgname().subscribe(res => {
            this.orgname = res.data;
        });
        let menuItems = this.getSubMenus(obj);
        let params = {
            menuData: menuItems,
            latitude: "" + obj.latitude,
            longitude: "" + obj.longitude,
            radius: '30km',
        };
        if (this.orgname != "All" && this.orgname != '') { params['creatorOrg'] = this.orgname };
        var url = `${this.baseEsSolv}/categoryCounts`;
        return this.httpClient.get(url, { params: params, headers: this.headers });
    }
    getCategoryImpactsDataES(obj, withparam = false) {
        this.subscriptionWithUserData = this.commonService.getorgname().subscribe(res => {
            this.orgname = res.data;
        });
        // console.log(obj);
        let menuItems = this.getSubMenus(obj);
        let params = {};
        var url = `${this.baseEsSolv}/categoryImpacts`;
        if (withparam) {
            params = {
                menuData: menuItems,
                topLeftLat: "" + obj.topLeftLat,
                topLeftLon: "" + obj.topLeftLon,
                bottomRightLat: "" + obj.bottomRightLat,
                bottomRightLon: "" + obj.bottomRightLon,
                latitude: "" + obj.latitude,
                longitude: "" + obj.longitude,
            };
            if (this.orgname != "All" && this.orgname != '') { params['creatorOrg'] = this.orgname };
        } else {
            params = {
                menuData: menuItems,
            };
        }
        // console.log(params);
        return this.httpClient.get(url, { params: params, headers: this.headers });
    }
    getCountAllDataES(obj) {
        let menuItems = this.getSubMenus(obj);
        let params = {
            menuData: menuItems
        };
        var url = `${this.baseEsSolv}/categoryCounts`;
        return this.httpClient.get(url, { params: params, headers: this.headers });
    }
    /**
     * get oged Inuser Info
     */
    getUserInfo() {
        return this.httpClient.get(`/api/v1/user/data/read`, { headers: this.headers });
    }

    /**
     * Get Orgs List
     * Creaters List
     */
    getOrgsList() {
        return this.httpClient.get(`${this.baseEsSolv}/creators`, { headers: this.headers });
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
                "closed_by": ass != 'assigned' ? obj.closed_by : '',
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
    getTags() {
        return this.httpClient.get('http://es.solveninja.org:4321/getTags', {headers: this.headers});
    }
    submitZone(zoneDetails: any) {
        console.log(JSON.stringify(zoneDetails));
        return this.httpClient.post('http://es.solveninja.org:4321/addZone', zoneDetails, {headers: this.headers});
    }
    updateZone(zoneDetails: any) {
        console.log(JSON.stringify(zoneDetails));
        return this.httpClient.put('http://es.solveninja.org:4321/updateZone', zoneDetails, {headers: this.headers});
    }
    deleteZone(zoneId: string) {
        return this.httpClient.delete('http://es.solveninja.org:4321/deleteZone', {params: {zoneId: zoneId},headers: this.headers});
    }
    loadZones(left: number, bottom: number, right: number, top: number, types: string[] = [], owners: string[] = [], subowners: string[] = [], status: string[] = []): Observable<ZoneGeoJson> {
        let url = 'http://es.solveninja.org:4321/getZones?left='+left+'&right='+right+'&top='+top+'&bottom='+bottom;
        if(types.length > 0) {
            url = url + types.map(type => `&type=${type}`).join('');
        }
        if(owners.length > 0) {
            url = url + owners.map(owner => `&owner=${owner}`).join('');
        }
        if(subowners.length > 0) {
            url = url + subowners.map(subowner => `&subowner=${subowner}`).join('');
        }
        if(status) {
            url = url + status.map(s => `&status=${s}`).join('');
        }
        console.log(url);
        return this.httpClient.get<ZoneGeoJson>(url, {headers: this.headers});
    }
    updateZoneStatus(zoneId: string, status: string) {
        console.log(zoneId + ' -> ' + status);
        return this.httpClient.put('http://es.solveninja.org:4321/updateZoneStatus', {zoneId: zoneId, action: status} , {headers: this.headers});
    }
}

export interface ZoneGeoJson {
    features: ZoneFeature[],
    type: string
}

export interface ZoneFeature {
    type: string,
    properties: ZoneProperties,
    geometry: Geometry
}

export interface ZoneProperties {
    is_deleted: boolean,
    name: string,
    notes: string,
    status: string,
    tag: ZoneTag,
    tagId: number,
    zoneId: string,
    color: string
}

export interface ZoneTag {
    owner: string,
    subowner: string,
    tagId: number,
    type: string
}

export interface Geometry {
    type: string,
    coordinates: number[][]
}
