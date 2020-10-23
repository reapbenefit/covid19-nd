import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { Observable, Subject } from "rxjs";
import { KeycloakService } from "keycloak-angular";
import { JsonPipe } from "@angular/common";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {

    public otp = "https://cors-anywhere.herokuapp.com/https://api.msg91.com/api/v5/flow/";
    private totalItems: Subject<any> = new Subject<any>();

    getMaplocation() {
        return this.totalItems.asObservable();
    }

    updatemaplocation(items: any) {
        this.totalItems.next(items);
    }

    public baseURL = "https://devlp.solveninja.org/wp-includes/rest-api";
    public baseURLCOVID = "https://devlp.solveninja.org/wp-includes/covid/rest-api";
    public newbaseURLCOVID = environment.baseURL
    public getMenuItems = "getMenuItems";
    public postItems = "adduser";
    public postForms = "addForms";
    public updateapproveForms = "formstatus";
    public getCityList = "getCityList";
    public getFormslist = "forms";
    public getFormstype = "formtype";
    public addFormtype = "addformtype";
    public deleteFormsoftdelete = "formtype/softDelete";
    public getFormdisabled = "disabledForms";
    public enableFormdtypes = "formtype/enable";
    public getselectedFormlist = "formlist";
    public deleteFormslist = "deleteforms";
    public submissioFormslist = "submissions";
    public getNotification = "getNotification";
    public getOrguserlist = "user/orgid";
    public getFiltertypes = "disabledForms";
    public getOrganisations = "organisations";
    public postRatingData = "transaction";
    public userDetails = "userData";
    public signindataData = "userCheck";
    public getRegisterdata = "registrationForm";
    public postRegisterdata = "userRegistration";
    public editUserData = "profile";
    public editImage = "img";
    public getCategory = "category";
    public updatecardStatus="status";
    public getformId = "getformId";
    public getIssueDetail ="Issue";
    public getAssetDetail ="asset";
    public deleteAssetComment = "asset/deletecomment";
    public deleteIssueComment = "issue/deletecomment";
    public issueConversation = 'deleteConversation'
    public updateAsset= "asset/"
    public updateIssue= "issue/"
    public addConversations = 'AddConversationComment/'
    public sniScore= 'sniscore/';
    public shareSniScore = 'sniscore';
    public SniData = "getsniscore";
    public UpdateSniScore = "updatesniscore";
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
    constructor(private httpClient: HttpClient, private keycloakService: KeycloakService) { }

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
    }

    //New APIs
    getDashboardData(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/getDetailData.php`, obj, { headers: this.headers });
    }

    getMenuList(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/getMenuItems.php`, obj, { headers: this.headers });
    }

    getRegistrationForm(payload) {
        const url = this.newbaseURLCOVID + this.getRegisterdata;
        return this.httpClient.post(url,payload);
    }

    registrationForm(payload) {
        const url = this.newbaseURLCOVID + this.postRegisterdata;
        return this.httpClient.post(url, payload);
    }

    getnewMenuList(obj) {
        let payload = {
            cityId: '1'
        }
        const url = this.newbaseURLCOVID + this.getMenuItems;
        return this.httpClient.post(url, payload);
    }

    getCategoryList() {
        const url = this.newbaseURLCOVID + this.getCategory;
        return this.httpClient.get(url);
    }

    postitemdata(payload) {
        const url = this.newbaseURLCOVID + this.postItems;
        return this.httpClient.post(url, payload);
    }

    postformdata(payload) {
        const url = this.newbaseURLCOVID + this.postForms;
        return this.httpClient.post(url, payload);
    }

    approveformdata(payload) {
        const url = this.newbaseURLCOVID + this.updateapproveForms;
        return this.httpClient.post(url, payload);
    }

    deleteForm(payload) {
        const url = this.newbaseURLCOVID + this.deleteFormslist;
        return this.httpClient.post(url, payload);
    }

    deleteformtype(payload) {
        const url = this.newbaseURLCOVID + this.deleteFormsoftdelete;
        return this.httpClient.post(url, payload);
    }

    enableformtype(payload) {
        const url = this.newbaseURLCOVID + this.enableFormdtypes;
        return this.httpClient.post(url, payload);
    }

    getSniScore(usrid) {
        const url = this.newbaseURLCOVID + this.sniScore+usrid;
        return this.httpClient.get(url);
    }
    postSniscore(payload){
        const url = this.newbaseURLCOVID + this.shareSniScore;
        return this.httpClient.post(url, payload);
    }

    getFormList(obj) {
        let payload = {
            cityId: '1'
        }
        const url = this.newbaseURLCOVID + this.getFormslist;
        return this.httpClient.get(url);
    }

    getorguserdata(payload): Observable<any> {
        const httpParams = new HttpParams().set('orgid', payload.orgid);
        const url = this.newbaseURLCOVID + this.getOrguserlist;
        return this.httpClient.get<any>(url, { params: httpParams });
    }

    getOrgList() {
        const url = this.newbaseURLCOVID + this.getOrganisations;
        return this.httpClient.get(url);
    }

    getFormtype() {
        const url = this.newbaseURLCOVID + this.getFormstype;
        return this.httpClient.get(url);
    }

    getFormtypedisabled() {
        const url = this.newbaseURLCOVID + this.getFormdisabled;
        return this.httpClient.get(url);
    }

    getAssetIssueTYpe() {
        const url = this.newbaseURLCOVID + this.getFiltertypes;
        return this.httpClient.get(url);
    }

    getFormlisttype(payload) {
        const url = this.newbaseURLCOVID + this.getselectedFormlist;
        return this.httpClient.post(url, payload);
    }

    addFormtypname(payload) {
        const url = this.newbaseURLCOVID + this.addFormtype;
        return this.httpClient.post(url, payload);
    }

    getFormById(payload) {
        const url = this.newbaseURLCOVID + this.getformId;
        return this.httpClient.post(url,payload)
    }

    getIssueDetailById(payload) {
        const url = this.newbaseURLCOVID + this.getIssueDetail + '/'+ payload.uid;
        return this.httpClient.get(url)
    }
    getAssetDetailByID(payload) {
        const url = this.newbaseURLCOVID + this.getAssetDetail + '/'+ payload.uid;
        return this.httpClient.get(url)
    }

    deleteAssetCommentsById (payload) {
        const url = this.newbaseURLCOVID + this.deleteAssetComment + '/' + payload;
        return this.httpClient.delete(url)
    }
    deleteIssueCommentsById (payload) {
        const url = this.newbaseURLCOVID + this.deleteIssueComment + '/' + payload;
        return this.httpClient.delete(url)
    }
    deleteIssueConversation(payload) {
        const url = this.newbaseURLCOVID + this.issueConversation + '/' + payload;
        return this.httpClient.delete(url)
    }


    submissionForm(payload) {
        const url = this.newbaseURLCOVID + this.submissioFormslist;
        return this.httpClient.post(url, payload);
    }

    post_ratingdata(payload) {
        const url = this.newbaseURLCOVID + this.postRatingData;
        return this.httpClient.post(url, payload);
    }

    update_status(payload) {
        const url = this.newbaseURLCOVID + this.updatecardStatus;
        return this.httpClient.post(url, payload);
    }

    signin(username): Observable<any> {
        let Payload = {
            email: username,
            withCredentials: true
        };
        const url = this.newbaseURLCOVID + this.signindataData;
        return this.httpClient.post(url, Payload, { withCredentials: true });
    }


    CollectionsData(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/controller.php`, obj, { headers: this.headers });
    }
    cityDetails() {
        let payload = {}
        const url = this.newbaseURLCOVID + this.getCityList;
        return this.httpClient.post(url, payload);
    }
    wardDetails(obj) {
        return this.httpClient.post(`${this.baseURL}/neighbourHood/getWards.php`, obj, { headers: this.headers });
    }
    ichangemycity(lat, lan) {
        return this.httpClient.get(`https://www.ichangemycity.com/map/get_ward?latitude=${lat}&longitude=${lan}`, { headers: this.headers });
    }

    getNotifications(district: String) {
        const url = this.newbaseURLCOVID + this.getNotification;
        return this.httpClient.post(url, { "districtName": district });
    }

    getUserDetails(payload) {
        let params = new HttpParams();
        params = params.set('uid', payload);
        const url = this.newbaseURLCOVID + this.userDetails;
        return this.httpClient.get(url, { params: params });
    }

    editUserDetails(payload, id) {
        let params = new HttpParams();
        params = params.set('id', id);
        const url = this.newbaseURLCOVID + this.editUserData;
        return this.httpClient.put(url, payload, { params: params });
    }

    editImageDetails(payload, id) {
        let params = new HttpParams();
        params = params.set('id', id);
        const url = this.newbaseURLCOVID + this.editImage;
        return this.httpClient.put(url, payload, { params: params });
    }
    async checkUser() {
        let personId = window.sessionStorage.getItem("personId");
        if (!personId) {
            await this.keycloakService.login();
        }
        return true;
    }

    sendOtp(payload) {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'authkey': environment.msgKey
        });
        let options = {
            headers: httpHeaders
        };
        const url = this.otp;
        return this.httpClient.post(url, payload, options);
    }
    editassetDetails(payload,id) {
        const url = this.newbaseURLCOVID + this.updateAsset + id;
        return this.httpClient.put(url, payload);
    }
    editissueDetails(payload,id) {
        const url = this.newbaseURLCOVID + this.updateIssue + id;
        return this.httpClient.put(url, payload);
    }
    addConversation(payload) {
        const url = this.newbaseURLCOVID + this.addConversations ;
        return this.httpClient.post(url, payload);
    }
    upDateSniScore(payload) {
      const url = this.newbaseURLCOVID + this.UpdateSniScore;
      return this.httpClient.post(url,payload);
    }
    getSniData() {
      const url = this.newbaseURLCOVID + this.SniData;
      return this.httpClient.get(url)
    }
  
}
