import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { Observable, Subject } from "rxjs";
import { KeycloakService } from "keycloak-angular";
import { JsonPipe } from "@angular/common";
import { map } from "rxjs/operators";
import * as CryptoJS from 'crypto-js';
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
    getHeader() {
        const pwdToken = environment.token;
      let userToken;
        if (pwdToken === undefined || pwdToken === '' || pwdToken === null ) {
          userToken = '';
        } else {
        // var cipher = CryptoJS.createCipher('aes192', '@reap#PasdWard');;
        //  userToken = cipher.update(pwdToken, 'utf8', 'hex') + cipher.final('hex');
         var ciphertext = CryptoJS.AES.encrypt(pwdToken, 'pwdToken').toString();
         userToken = ciphertext

        }
        // const header = {headers: new HttpHeaders().set('Authorization', userToken)};
        // const header =  new HttpHeaders().set('Authorization', userToken);
        const header =  new HttpHeaders({'Content-Type': 'application/json; charset=utf-8','Authorization': userToken,'apikey':userToken})
        return header;
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
        const headers = this.getHeader();
        return this.httpClient.post(url,payload,{ headers:headers});
    }

    registrationForm(payload) {
        const url = this.newbaseURLCOVID + this.postRegisterdata;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    getnewMenuList(obj) {
        let payload = {
            cityId: '1'
        }
        const url = this.newbaseURLCOVID + this.getMenuItems;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    getCategoryList() {
        const url = this.newbaseURLCOVID + this.getCategory;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers});
    }

    postitemdata(payload) {
        const url = this.newbaseURLCOVID + this.postItems;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    postformdata(payload) {
        const url = this.newbaseURLCOVID + this.postForms;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    approveformdata(payload) {
        const url = this.newbaseURLCOVID + this.updateapproveForms;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    deleteForm(payload) {
        const url = this.newbaseURLCOVID + this.deleteFormslist;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    deleteformtype(payload) {
        const url = this.newbaseURLCOVID + this.deleteFormsoftdelete;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    enableformtype(payload) {
        const url = this.newbaseURLCOVID + this.enableFormdtypes;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    getSniScore(usrid) {
        const url = this.newbaseURLCOVID + this.sniScore+usrid;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers});
    }
    postSniscore(payload){
        const url = this.newbaseURLCOVID + this.shareSniScore;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    getFormList(obj) {
        let payload = {
            cityId: '1'
        }
        const url = this.newbaseURLCOVID + this.getFormslist;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers});
    }

    getorguserdata(payload): Observable<any> {
        const httpParams = new HttpParams().set('orgid', payload.orgid);
        const url = this.newbaseURLCOVID + this.getOrguserlist;
         const headers = this.getHeader();
         const options= {
            headers:headers,
            params: httpParams
         }
        return this.httpClient.get<any>(url, options);
    }

    getOrgList() {
        const url = this.newbaseURLCOVID + this.getOrganisations;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers});
    }

    getFormtype() {
        const url = this.newbaseURLCOVID + this.getFormstype;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers});
    }

    getFormtypedisabled() {
        const url = this.newbaseURLCOVID + this.getFormdisabled;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers});
    }

    getAssetIssueTYpe() {
        const url = this.newbaseURLCOVID + this.getFiltertypes;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers});
    }

    getFormlisttype(payload) {
        const url = this.newbaseURLCOVID + this.getselectedFormlist;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    addFormtypname(payload) {
        const url = this.newbaseURLCOVID + this.addFormtype;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    getFormById(payload) {
        const url = this.newbaseURLCOVID + this.getformId;
        const headers = this.getHeader();
        return this.httpClient.post(url,payload,{ headers:headers})
    }

    getIssueDetailById(payload) {
        const url = this.newbaseURLCOVID + this.getIssueDetail + '/'+ payload.uid;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers})
    }
    getAssetDetailByID(payload) {
        const url = this.newbaseURLCOVID + this.getAssetDetail + '/'+ payload.uid;
        const headers = this.getHeader();
        return this.httpClient.get(url,{ headers:headers})
    }

    deleteAssetCommentsById (payload) {
        const url = this.newbaseURLCOVID + this.deleteAssetComment + '/' + payload;
        const headers = this.getHeader();
        return this.httpClient.delete(url,{ headers:headers})
    }
    deleteIssueCommentsById (payload) {
        const url = this.newbaseURLCOVID + this.deleteIssueComment + '/' + payload;
        const headers = this.getHeader();
        return this.httpClient.delete(url,{ headers:headers})
    }
    deleteIssueConversation(payload) {
        const url = this.newbaseURLCOVID + this.issueConversation + '/' + payload;
        const headers = this.getHeader();
        return this.httpClient.delete(url,{ headers:headers})
    }


    submissionForm(payload) {
        const url = this.newbaseURLCOVID + this.submissioFormslist;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    post_ratingdata(payload) {
        const url = this.newbaseURLCOVID + this.postRatingData;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    update_status(payload) {
        const url = this.newbaseURLCOVID + this.updatecardStatus;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }

    signin(username): Observable<any> {
        let Payload = {
            email: username,
            withCredentials: true
        };
        const headers = this.getHeader();
        const url = this.newbaseURLCOVID + this.signindataData;
        return this.httpClient.post(url, Payload, { withCredentials: true ,headers:headers});
    }


    CollectionsData(obj) {
        return this.httpClient.post(`${this.baseURLCOVID}/neighbourHood/controller.php`, obj, { headers: this.headers });
    }
    cityDetails() {
        let payload = {}
        const url = this.newbaseURLCOVID + this.getCityList;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }
    wardDetails(obj) {
        return this.httpClient.post(`${this.baseURL}/neighbourHood/getWards.php`, obj, { headers: this.headers });
    }
    ichangemycity(lat, lan) {
        return this.httpClient.get(`https://www.ichangemycity.com/map/get_ward?latitude=${lat}&longitude=${lan}`, { headers: this.headers });
    }

    getNotifications(district: String) {
        const url = this.newbaseURLCOVID + this.getNotification;
        const headers = this.getHeader();
        return this.httpClient.post(url, { "districtName": district },{ headers:headers});
    }

    getUserDetails(payload) {
        let params = new HttpParams();
        params = params.set('uid', payload);
        const url = this.newbaseURLCOVID + this.userDetails;
        const headers = this.getHeader();
        return this.httpClient.get(url, { params: params,headers:headers });
    }

    editUserDetails(payload, id) {
        let params = new HttpParams();
        params = params.set('id', id);
        const url = this.newbaseURLCOVID + this.editUserData;
        const headers = this.getHeader();
        return this.httpClient.put(url, payload, { params: params,headers:headers });
    }

    editImageDetails(payload, id) {
        let params = new HttpParams();
        params = params.set('id', id);
        const url = this.newbaseURLCOVID + this.editImage;
        const headers = this.getHeader();
        return this.httpClient.put(url, payload, { params: params,headers:headers });
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
        const headers = this.getHeader();
        return this.httpClient.put(url, payload,{ headers:headers});
    }
    editissueDetails(payload,id) {
        const url = this.newbaseURLCOVID + this.updateIssue + id;
        const headers = this.getHeader();
        return this.httpClient.put(url, payload,{ headers:headers});
    }
    addConversation(payload) {
        const url = this.newbaseURLCOVID + this.addConversations ;
        const headers = this.getHeader();
        return this.httpClient.post(url, payload,{ headers:headers});
    }
    upDateSniScore(payload) {
      const url = this.newbaseURLCOVID + this.UpdateSniScore;
      const headers = this.getHeader();
      return this.httpClient.post(url,payload,{ headers:headers});
    }
    getSniData() {
      const url = this.newbaseURLCOVID + this.SniData;
      const headers = this.getHeader();
      return this.httpClient.get(url,{ headers:headers})
    }
  
}
