import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  TemplateRef,
  ChangeDetectorRef,
  ViewRef,
} from "@angular/core";
import { DataService } from "./services/data.service";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { MapsAPILoader } from "@agm/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { CommonService } from "./services/common.service";
import { ward } from "./services/wards";
import { TreeviewItem, TreeviewConfig } from "ngx-treeview";
import { GoogleAnalyticsService } from "./services/google-analytics.service";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RoutesRecognized,
} from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import * as data from "./formly.json";
import { HttpClient } from "@angular/common/http";
import { ToasterConfig } from "angular2-toaster";
import { MatIconRegistry } from "@angular/material/icon";
import { MapService } from "./services/map.service";
import { MenuService, Menu, newMenuList } from "./services/menu.service";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { ToasterService } from "angular2-toaster";
import { KeycloakService } from "keycloak-angular";
import { FilterserviceService } from "./services/filterservice.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { AddDetailsComponent } from "./components/add-details/add-details.component";
import { MapComponent } from "./components/map/map.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild(MapComponent) mapview: MapComponent;
  global_form_id: string = "";
  notification: boolean = false;
  show: boolean = false;
  notifCount: number = 0;
  public incoming_data = data;
  showHeader = false;
  showSidebar = false;
  showFooter = false;
  private geoCoder;
  searchText = ""; //md
  isGpsNotAvailable = false;
  mob_view: boolean = true;
  userForms: boolean = false;
  UsersId: any;
  share = true;
  capsuletext = "Reports";
  add_img = "../../../assets/Icons/add.png";
  toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
  toggle_text = "Map View";
  url: SafeResourceUrl;
  show_subment: boolean = false;
  dashboardimgsrc = "../../assets/Icons/menuicons/city-dashboard.png";
  civicimgsrc = "../../assets/Icons/menuicons/discourse.png";

  public toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-center",
  });

  @ViewChild("content_tree") private contentRef: TemplateRef<Object>;
  @ViewChild("refer_needy") private refer_needyRef: TemplateRef<Object>;
  @ViewChild("signup_volunteer") private signup_volunteerref: TemplateRef<
    Object
  >;
  @ViewChild("inforamation_local") private local_informationref: TemplateRef<
    Object
  >;
  @ViewChild("content") private contentmodalRef: TemplateRef<Object>;

  subMenuList = ["http://nd.solveninja.org/", "https://forum.solveninja.org/"];
  form_type_list: any;
  formtypelistdata: any;
  preview_fields: any;
  selectedValue = "Select Form Types";
  coordinates: Coordinates;
  img_upload_data = "";
  current_location: string = "";
  locationsList = [];
  selectedRow: Number;
  selectedorgRow: Number;
  count: number = 0;
  isFilterPageVisible: boolean = false;
  @ViewChild("focus") input: ElementRef;
  public toggleButton: boolean = true;
  key: string = "type";
  reverse: boolean = false;
  disticName: string = "";
  popupmessage1 = "Card/Pins not available for this location";
  popupmessage2 =
    "please click on the below link to see the data for Bangalore";
  popupmessage3 = "https://rb-ingress.study-circle.in/#/app/bangalore";
  spinner_show: boolean = true;
  persona: string='';
  hideMap: boolean =true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  itemsperpage = "5";
  userDetails: boolean = false;
  list_view: boolean = true;
  map_show: boolean = false;
  ifram_show: boolean = false;
  @ViewChild("modal_customize_tree") private deletemodal_typeRef: ElementRef;
  activeMenu: string;
  selectedMenu;
  menuList: Array<Menu>;
  _router;
  url1: SafeResourceUrl;
  url2: SafeResourceUrl;
  categorylist: any;
  throttle = 50;
  scrollDistance = 2;
  scrollUpDistance = 2;
  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private commonService: CommonService,
    public router: Router,

    public http: HttpClient,
    private googleAnalyticsService: GoogleAnalyticsService,
    private _matIconReistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _mapService: MapService,
    private route: ActivatedRoute,
    private _menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    public toasterService: ToasterService,
    private keyCloakService: KeycloakService,
    private _filterService: FilterserviceService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show()
    const _cityURlList = window.location.href.split("/");
    let _city = "";

    if (
      _cityURlList &&
      _cityURlList.length > 0 &&
      _cityURlList.some((i) => i === "app")
    ) {
      _city = _cityURlList[_cityURlList.length - 1];
      // this.global_city = _city;
    }

    if (navigator && _city === "") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this._mapService.currentLat = +pos.coords.latitude;
          this._mapService.currentLng = +pos.coords.longitude;
          this.getMapLocations();
        },
        (error) => {
          console.error(error);
          this.isGpsNotAvailable = true;
        }
      );
    } else if (_city) {
      this.addressToCoordinates(_city);
    }

    this._filterService.getFiltersList$().subscribe();
    this._mapService.locationsData$.subscribe((data) => {
      this.spinner_show = false;
      this.spinner.hide()
      if (data) {
        // this.locationsList = data;
        // console.log(this.pageNo,"this.pageNo")
        // console.log(data)
        if (this.pageNo === 1) {
          this.locationsList =[]
          this.locationsList = data;
        } else {
          // data =[{"disticName":"Bangalore Urban","locationId":"dc29d078-83b8-4179-8aa7-4dd88f69b30f","index":64345,"id":"7d0c27cb-1e5a-471a-932c-a4fbf5c1f06e","name":"asset-issue","typeId":96,"description":"description goes here","imgId":0,"members":[],"supportes":[],"rating":2,"noOfRating":1,"tags":"empty","contactNumber":"42342-42342","contactName":"empty","catId":15,"workingHoursOpen":"empty","workingHoursClose":"empty","date":"2020-10-20T06:25:52.608Z","formType":52,"sub_id":"1e93a41c-67fd-49c9-bf53-7a7f673f0b2b","userId":18,"createdBy":"divya","creatorImg":null,"orgIds":[72,70],"catName":"Government Resources","lat":12.926976,"long":77.6077312,"address":"15, 2nd Cross Rd, Tavarekere, Balaji Nagar, S.G. Palya, Bengaluru, Karnataka 560029, India","avgRating":2,"imgName":null,"comment":[]},{"disticName":"Bangalore Urban","locationId":"69ceeb4a-3d89-4b75-ae2b-02e94fd59abe","index":67,"id":"979e1d6e-ac4b-4c20-987b-e0ecc6e4bdfe","name":"test","typeId":93,"description":"test","imgId":0,"status":"Open","supportes":[],"rating":5,"noOfRating":1,"assignedTo":[],"tags":"empty","date":"2020-09-06T08:48:54.546Z","url":"test","formType":49,"sub_id":"f9da9e88-47a5-487f-8ea4-4d83b46780b8","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.960572,"long":77.641679,"address":"Under the Domlur flyover, Domur, Bengalore","avgRating":5,"imgName":null,"comment":[],"conversation":[]},{"disticName":"Bangalore Urban","locationId":"0855f201-661b-4c95-aaea-605b444af062","index":66,"id":"37a5e69c-3b44-4492-bee4-bb0e19be66c2","name":"test img abi","typeId":93,"description":"test","imgId":80,"status":"Open","supportes":[],"rating":5,"noOfRating":1,"assignedTo":[],"tags":"empty","date":"2020-09-06T08:47:52.791Z","url":"empty","formType":49,"sub_id":"4c22a120-8832-4a22-a3f7-e5d28c354145","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.960572,"long":77.641679,"address":"Under the Domlur flyover, Domur, Bengalore","avgRating":5,"imgName":"DSC_1058.JPG","comment":[],"conversation":[]},{"disticName":"Bangalore Urban","locationId":"715ae0e3-f8cc-4b6c-a797-54ac73b64628","index":63,"id":"dc308dd4-b2c3-4b71-af93-1f263ac389b8","name":"compress","typeId":93,"description":"compress","imgId":78,"status":"Open","supportes":[],"rating":9,"noOfRating":2,"assignedTo":[],"tags":"empty","date":"2020-09-06T08:35:08.457Z","url":"empty","formType":49,"sub_id":"2b188be9-3fff-4bb1-8fc4-4db9c7136f61","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.9715987,"long":77.5945627,"address":"15/11, HSR Layout, KG Halli, D' Souza Layout, Nagar, Bengaluru, Karnataka 560001, India","avgRating":4.5,"imgName":"download.jpeg","comment":[],"conversation":[{"Conversation":"testconvo","name":"prasanna","id":"0d848941-7226-4415-a6cf-66c3f22a0452","commenterPic":"download.jpeg"}]},{"disticName":"Bangalore Urban","locationId":"cb3ec5de-db0e-468f-9a06-d8b1e527cf77","index":63,"id":"dc308dd4-b2c3-4b71-af93-1f263ac389b8","name":"compress","typeId":93,"description":"compress","imgId":78,"status":"Open","supportes":[],"rating":9,"noOfRating":2,"assignedTo":[],"tags":"empty","date":"2020-09-06T08:35:08.457Z","url":"empty","formType":49,"sub_id":"2b188be9-3fff-4bb1-8fc4-4db9c7136f61","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.960572,"long":77.641679,"address":"Under the Domlur flyover, Domur, Bengalore","avgRating":4.5,"imgName":"download.jpeg","comment":[],"conversation":[{"Conversation":"testconvo","name":"prasanna","id":"0d848941-7226-4415-a6cf-66c3f22a0452","commenterPic":"download.jpeg"}]},{"disticName":"Bangalore Urban","locationId":"44cc2a29-1270-4a15-862c-e062e59ac512","index":44,"id":"651349d9-741c-4518-ad64-bf51aa5d7510","name":"notification test 1","typeId":93,"description":"empty","imgId":0,"status":"Open","supportes":["5","13"],"rating":19.5,"noOfRating":6,"assignedTo":[],"tags":"empty","date":"2020-09-01T12:32:27.678Z","url":"empty","formType":49,"sub_id":"f3f90eef-d8fb-4ca5-979e-714b412e42e6","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.9715987,"long":77.5945627,"address":"15/11, HSR Layout, KG Halli, D' Souza Layout, Nagar, Bengaluru, Karnataka 560001, India","avgRating":3.25,"imgName":null,"comment":[{"text":"cdsas","name":"prasanna","id":"de95d860-30b6-4d26-a1d3-70bddf272cd2","commenterPic":"download.jpeg"},{"text":"dffsd","name":"prasanna","id":"9d03d29e-d0bf-4d50-8a7d-d0aaf4ef7083","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"0e4ca145-bdfa-4d04-9342-aab9237e2dd6","commenterPic":"download.jpeg"},{"text":"11","name":"prasanna","id":"25d5246c-c36f-43ad-959f-19c160415e4f","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"56ef3dd3-e650-4138-be69-d975b3cabe15","commenterPic":"download.jpeg"},{"text":"kl","name":"prasanna","id":"31754ffd-2775-439a-943b-048ea073a46d","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"d43c6cba-4b83-4411-a826-d84b1e94019a","commenterPic":"download.jpeg"},{"text":"ew","name":"prasanna","id":"61e7ffa8-830b-450c-b7fa-2aa38e910d3b","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"c3a80a7d-baf3-4cf7-9eee-1d6aa3125d3c","commenterPic":"download.jpeg"},{"text":"22","name":"prasanna","id":"0a5fb8e9-d52b-4aa1-849c-1112ea937fa0","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"d832301b-bc83-4303-8d78-7971adae9245","commenterPic":"download.jpeg"},{"text":"333","name":"prasanna","id":"5b2c1e48-0b24-4e61-8b36-a7dfc8614fac","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"50a5617c-298c-4374-91ec-744e2784ef4f","commenterPic":"download.jpeg"},{"text":"333","name":"prasanna","id":"f4f3df36-1ab5-48ab-ba0f-de09a1cbcf13","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"1590e9cf-0354-4049-85a4-cd060b496cfd","commenterPic":"download.jpeg"}],"conversation":[]},{"disticName":"Bangalore Urban","locationId":"845385ab-658a-4807-a9b6-523bbf7e90c1","index":44,"id":"651349d9-741c-4518-ad64-bf51aa5d7510","name":"notification test 1","typeId":93,"description":"empty","imgId":0,"status":"Open","supportes":["5","13"],"rating":19.5,"noOfRating":6,"assignedTo":[],"tags":"empty","date":"2020-09-01T12:32:27.678Z","url":"empty","formType":49,"sub_id":"f3f90eef-d8fb-4ca5-979e-714b412e42e6","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.960572,"long":77.641679,"address":"Under the Domlur flyover, Domur, Bengalore","avgRating":3.25,"imgName":null,"comment":[{"text":"cdsas","name":"prasanna","id":"de95d860-30b6-4d26-a1d3-70bddf272cd2","commenterPic":"download.jpeg"},{"text":"dffsd","name":"prasanna","id":"9d03d29e-d0bf-4d50-8a7d-d0aaf4ef7083","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"0e4ca145-bdfa-4d04-9342-aab9237e2dd6","commenterPic":"download.jpeg"},{"text":"11","name":"prasanna","id":"25d5246c-c36f-43ad-959f-19c160415e4f","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"56ef3dd3-e650-4138-be69-d975b3cabe15","commenterPic":"download.jpeg"},{"text":"kl","name":"prasanna","id":"31754ffd-2775-439a-943b-048ea073a46d","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"d43c6cba-4b83-4411-a826-d84b1e94019a","commenterPic":"download.jpeg"},{"text":"ew","name":"prasanna","id":"61e7ffa8-830b-450c-b7fa-2aa38e910d3b","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"c3a80a7d-baf3-4cf7-9eee-1d6aa3125d3c","commenterPic":"download.jpeg"},{"text":"22","name":"prasanna","id":"0a5fb8e9-d52b-4aa1-849c-1112ea937fa0","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"d832301b-bc83-4303-8d78-7971adae9245","commenterPic":"download.jpeg"},{"text":"333","name":"prasanna","id":"5b2c1e48-0b24-4e61-8b36-a7dfc8614fac","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"50a5617c-298c-4374-91ec-744e2784ef4f","commenterPic":"download.jpeg"},{"text":"333","name":"prasanna","id":"f4f3df36-1ab5-48ab-ba0f-de09a1cbcf13","commenterPic":"download.jpeg"},{"text":"true","name":"prasanna","id":"1590e9cf-0354-4049-85a4-cd060b496cfd","commenterPic":"download.jpeg"}],"conversation":[]},{"disticName":"Bangalore Urban","locationId":"af815966-506e-4e14-b373-93662689cc14","index":43,"id":"2ac1e7f8-4edf-463f-8863-7eb6d66e1067","name":"report test 90901","typeId":93,"description":"test","imgId":0,"status":"Open","supportes":["5"],"rating":13,"noOfRating":4,"assignedTo":[],"tags":"test","date":"2020-08-29T15:07:39.155Z","url":"url","formType":49,"sub_id":"7f7b906f-0e40-4c4d-b06b-a5a503478177","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.9715987,"long":77.5945627,"address":"15/11, HSR Layout, KG Halli, D' Souza Layout, Nagar, Bengaluru, Karnataka 560001, India","avgRating":3.25,"imgName":null,"comment":[{"text":"hello","name":"prasanna","id":"0a3fea2e-2f2e-4408-9db8-cef5dec67e7e","commenterPic":"download.jpeg"},{"text":"hi","name":"prasanna","id":"874484e6-a563-49c3-9661-73a689519027","commenterPic":"download.jpeg"},{"text":"ko","name":"prasanna","id":"85d075e4-bf32-4ffe-8795-237f84cedb71","commenterPic":"download.jpeg"},{"text":"1","name":"prasanna","id":"66109855-44b0-4da6-b8e0-5b655cefa229","commenterPic":"download.jpeg"},{"text":"2","name":"prasanna","id":"631137aa-ec86-43af-bbfb-093f1224f212","commenterPic":"download.jpeg"},{"text":"3","name":"prasanna","id":"284bcaaf-2c0d-45da-a6b3-6adbda2ed0fc","commenterPic":"download.jpeg"},{"text":"k","name":"prasanna","id":"b1d81ab7-de52-4dbc-ad03-6b39aee91abb","commenterPic":"download.jpeg"},{"text":"l","name":"prasanna","id":"e5cf9def-0fbc-4bda-a88f-593dc9ed97e9","commenterPic":"download.jpeg"},{"text":"ll","name":"prasanna","id":"8b1fb6fc-c5d2-44c5-a338-8dc9aa600592","commenterPic":"download.jpeg"},{"text":"hii","name":"prasanna","id":"21d6e765-39b3-4ac4-8260-484beeef75c1","commenterPic":"download.jpeg"},{"text":"hello","name":"prasanna","id":"bf74b437-1f25-4eda-8f67-82078106d79c","commenterPic":"download.jpeg"},{"text":"hii","name":"prasanna","id":"f507b0e6-8e27-4d89-b794-3e8e5a4d4a86","commenterPic":"download.jpeg"},{"text":"lo","name":"prasanna","id":"bd508e6c-b846-4c50-929c-a80e091147d6","commenterPic":"download.jpeg"}],"conversation":[]},{"disticName":"Bangalore Urban","locationId":"b1f5cde5-fb8b-4057-9a5a-9891443384ca","index":43,"id":"2ac1e7f8-4edf-463f-8863-7eb6d66e1067","name":"report test 90901","typeId":93,"description":"test","imgId":0,"status":"Open","supportes":["5"],"rating":13,"noOfRating":4,"assignedTo":[],"tags":"test","date":"2020-08-29T15:07:39.155Z","url":"url","formType":49,"sub_id":"7f7b906f-0e40-4c4d-b06b-a5a503478177","userId":5,"createdBy":"prasanna","creatorImg":"download.jpeg","orgIds":[3,2],"catName":"Air","lat":12.960572,"long":77.641679,"address":"Under the Domlur flyover, Domur, Bengalore","avgRating":3.25,"imgName":null,"comment":[{"text":"hello","name":"prasanna","id":"0a3fea2e-2f2e-4408-9db8-cef5dec67e7e","commenterPic":"download.jpeg"},{"text":"hi","name":"prasanna","id":"874484e6-a563-49c3-9661-73a689519027","commenterPic":"download.jpeg"},{"text":"ko","name":"prasanna","id":"85d075e4-bf32-4ffe-8795-237f84cedb71","commenterPic":"download.jpeg"},{"text":"1","name":"prasanna","id":"66109855-44b0-4da6-b8e0-5b655cefa229","commenterPic":"download.jpeg"},{"text":"2","name":"prasanna","id":"631137aa-ec86-43af-bbfb-093f1224f212","commenterPic":"download.jpeg"},{"text":"3","name":"prasanna","id":"284bcaaf-2c0d-45da-a6b3-6adbda2ed0fc","commenterPic":"download.jpeg"},{"text":"k","name":"prasanna","id":"b1d81ab7-de52-4dbc-ad03-6b39aee91abb","commenterPic":"download.jpeg"},{"text":"l","name":"prasanna","id":"e5cf9def-0fbc-4bda-a88f-593dc9ed97e9","commenterPic":"download.jpeg"},{"text":"ll","name":"prasanna","id":"8b1fb6fc-c5d2-44c5-a338-8dc9aa600592","commenterPic":"download.jpeg"},{"text":"hii","name":"prasanna","id":"21d6e765-39b3-4ac4-8260-484beeef75c1","commenterPic":"download.jpeg"},{"text":"hello","name":"prasanna","id":"bf74b437-1f25-4eda-8f67-82078106d79c","commenterPic":"download.jpeg"},{"text":"hii","name":"prasanna","id":"f507b0e6-8e27-4d89-b794-3e8e5a4d4a86","commenterPic":"download.jpeg"},{"text":"lo","name":"prasanna","id":"bd508e6c-b846-4c50-929c-a80e091147d6","commenterPic":"download.jpeg"}],"conversation":[]}]
          this.locationsList = this.locationsList.concat(data);
        }
        this.disticName = this._mapService.adress;
        this.dataService
          .getNotifications(this.disticName)
          .subscribe((response) => {
            this.notifCount = response && response["length"];
          });

        if (this.locationsList[0] == undefined) {
          this.show = true;
        } else {
          this.show = false;
        }
        this.cd.detectChanges();
      }
    });
    this._menuService.selectedMenu$.subscribe((menu: string) => {
      if (menu) {
        this.activeMenu = menu;
        this.selectedMenu = newMenuList.find((item) => item.key === menu);
      }
    });
    this._menuService.menuList$.subscribe((menuList: Array<Menu>) => {
      if (menuList) {
        this.menuList = menuList;
      }
    });
    this._router = router;
  }
  addressToCoordinates(address) {
    this._mapService.geocodeAddress(address).subscribe((location) => {
      this._mapService.currentLat = location.lat;
      this._mapService.currentLng = location.lng;
      this.getMapLocations();
    });
  }

  gotobanglore() {
    this.isGpsNotAvailable = false;
    this.searchElementRef.nativeElement.value = "";
    this.addressToCoordinates("Bangalore");
  }

  dismissNoGpsPopup() {
    this.isGpsNotAvailable = false;
    window.location.reload();
  }

  form_data: any;
  global_menu_val = "";
  @ViewChild("search") public searchElementRef: ElementRef;
getSniscore() {
  const usrID =window.sessionStorage.getItem("personId");
  this.dataService.getSniScore(usrID).subscribe((val: any) => {
    if (val) {
      this.persona = val.persona;
     
    }
  }, err => {
    this.persona =''
  })
}
public getImage(type) {
  let img = 'assets/img/CampaignChameleon.png'
  if (type === "rhino") {
    img = "assets/img/ReportingRhino.png";
  }
  if (type === "chemeloen") {
    img = 'assets/img/CampaignChameleon.png';

  }
  if (type === "hippo") {
    img = 'assets/img/HandsonHippo.png';

  }
  if (type === "tiger") {
    img = 'assets/img/TechnoTiger.png';

  }
  if (type === "ant") {
    img = 'assets/img/ActionAnt.png';

  }
  
  return img;
}
  async ngOnInit() {
    if (await this.keyCloakService.isLoggedIn()) {
      const userDetails = await this.keyCloakService.loadUserProfile();
      window.sessionStorage.removeItem("uname");
      window.sessionStorage.setItem("uname", userDetails.username);
      window.sessionStorage.setItem("userName", userDetails.firstName);
      window.sessionStorage.setItem("lastName", userDetails.lastName);
      this.dataService.signin(userDetails.username).subscribe((response) => {
        if (response == "404") {
          this.router.navigate(["./registration"]);
        } else {
          window.sessionStorage.setItem("personId", response.personId);
          window.sessionStorage.setItem("orgId", response.orgIds);
          window.sessionStorage.setItem("lang", response.lang);
          window.sessionStorage.setItem("seclang", response.langsecondary);        }
      });
    }
if (window.sessionStorage.getItem("personId")){
  this.getSniscore()
}
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      this.registerLocationSearch();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        let path =
          event.state.root.firstChild &&
          event.state.root.firstChild.routeConfig.path;
        if (
          path === "addforms/:type/:index/:id" ||
          path === "locationcardDetail/:type/:id"
        ) {
          setTimeout(() => {
            this.userForms = true;
            this.UsersId = event.state.root.firstChild.params.id;
          }, 1000);
        } else {
          this.userForms = false;
          this.UsersId = "";
        }
      }
      if (event["url"] == "/")
        setTimeout(() => {
          this.mapsAPILoader.load().then(() => {
            this.geoCoder = new google.maps.Geocoder();
            this.registerLocationSearch();
          });
        }, 1000);

      if (event["url"] == "/formlist") {
        this.showHeader = true;
        this.showSidebar = true;
      } else if (event["url"] == "/formtypelist") {
        this.showSidebar = true;
        this.showHeader = true;
      } else {
        this.showSidebar = false;
        this.showHeader = false;
      }
    });
    this.form_data = this.incoming_data["default"];
    this.getCategory();
  }
  getCategory() {
    this.dataService.getCategoryList().subscribe(
      (data) => {
        this.categorylist = data;
        // console.log(this.categorylist, "this.categorylist");
        this.categorylist.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
      },
      (err) => {
        this.categorylist = [];
      }
    );
  }
  registerLocationSearch = () => {
    if (this.searchElementRef != undefined) {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this._mapService.currentLat = place.geometry.location.lat();
          this._mapService.currentLng = place.geometry.location.lng();
         
          if (this.map_show){
            this._mapService.pageNo = undefined;
          } else {
            this._mapService.pageNo = 1;
          }
          this.dataService
            .getNotifications(this.disticName)
            .subscribe((response) => {
              this.notifCount = response && response["length"];
            });
          this.loadLocationData();
        });
      });
    }
  };

  getMapLocations = () => {
    if (
      this.menuList &&
      this.menuList.length > 0 &&
      this.menuList[0].endPoint
    ) {
      this._mapService.getMapLocations$.next({
        key: this.menuList[0].key,
        endPoint: this.menuList[0].endPoint,
      });
    }
  };

  public global_data: any;
  externallink: boolean;

  setActiveMenuItem = (prop: any) => {
    this._mapService.pageNo = 1;
    this.pageNo =1;
    const { menuItem, show_subment } = prop;
    if (menuItem.key === "externallinks") {
      this._menuService.setSelectedMenu$.next(menuItem.key);
      this.show = false;
      this.show_subment = !this.show_subment;
      // this.list_view = false;
      this.externallink = true;
    } else {
      this.externallink = false;
      const _point: Menu = this.menuList.find(
        (item) => item.key === menuItem.key
      );
      this._menuService.setSelectedMenu$.next(menuItem.key);
      if (_point && _point.endPoint) {
        this.spinner_show = true;
      this.spinner.show();
        this._mapService.getMapLocations$.next({
          key: _point.key,
          endPoint: _point.endPoint,
        });
      }

      this.global_data = menuItem;
      this.global_data.state = false;
      this.list_view = true;
      this.ifram_show = false;
      this.map_show = false;
       this.hideMap= true;
      if (menuItem.key === "pins") {
        this.global_menu_val = "pins";
        this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
        this.show_subment = false;
        this.capsuletext = "Reports";
        this.mob_view = true;
        this.hideMap= true;
      } else if (menuItem.key === "list") {
        this.global_menu_val = "list";
        this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
        this.show_subment = false;
        this.capsuletext = "Ideas";
        this.mob_view = true;
        this.hideMap= true;
      } else if (menuItem.key === "casestudy") {
        this.global_menu_val = "casestudy";
        this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
        this.show_subment = false;
        this.capsuletext = "Case Study";
        this.mob_view = true;
        this.hideMap= true;
      }else if (menuItem.key === "actofsolution") {
        this.global_menu_val = "actofsolution";
        this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
        this.show_subment = false;
        this.capsuletext = "Solution";
        this.mob_view = true;
        this.hideMap= false;
      }
    }

    if (!this.externallink) {
      setTimeout(() => {
        this.mapsAPILoader.load().then(() => {
          this.geoCoder = new google.maps.Geocoder();
          this.registerLocationSearch();
        });
      }, 200);
    }
  };

  open_list() {
    let temp_globa = {
      endPoint: "reports",
      img: "../../assets/Icons/menuicons/reports-pins.png",
      img_active: "../../assets/Icons/menuicons/reports-pins.png",
      key: "pins",
      name: "reports",
      state: false,
    };
    if (this.global_data === undefined) {
      this.global_data = temp_globa;
    }
    this.global_data.state = !this.global_data.state;
    if (this.global_data.key === "pins" && this.global_data.state !== true) {
      this.map_show = false;
      this.list_view = true;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
    } else if (
      this.global_data.key === "pins" &&
      this.global_data.state === true
    ) {
      this.map_show = true;
      this.list_view = false;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-list.png";
    }
    if (this.global_data.key === "list" && this.global_data.state !== true) {
      this.map_show = false;
      this.list_view = true;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
    } else if (
      this.global_data.key === "list" &&
      this.global_data.state === true
    ) {
      this.map_show = true;
      this.list_view = false;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-list.png";
    }
    if (
      this.global_data.key === "casestudy" &&
      this.global_data.state !== true
    ) {
      this.map_show = false;
      this.list_view = true;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
    } else if (
      this.global_data.key === "casestudy" &&
      this.global_data.state === true
    ) {
      this.map_show = true;
      this.list_view = false;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-list.png";
    }
  }
  onUp( ){
    console.log('scrolled!!');

  }

pageNo=1
  onScrollDown (ev) {
    // console.log('scrolled down!!', ev);
this.pageNo+=1;
this._mapService.pageNo = this.pageNo;
// this.getMapLocations();   
this.loadLocationData() 
  } 
    
  open_form() {
    this.router.navigate(["./addfunction"]);
  }

  post_comment(comments: any, card_details: any) {
    if (navigator.geolocation) {
      let payload = {
        id: card_details.id,
        formid: card_details.typeId,
        comment: comments,
        userId: window.sessionStorage.getItem("personId"),
      };
      this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
        this.toasterService.pop(
          "success",
          "Success",
          "Comments added successfully"
        );
      });
    }
  }
  public send_supporter = [];
  Post_Supporters(supporters: any, card_details: any) {
    if (navigator.geolocation) {
      let payload = {
        id: card_details.id,
        formid: card_details.typeId,
        supportes: supporters,
      };
      this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
        this.toasterService.pop(
          "success",
          "Success",
          "Ratings added successfully"
        );
        this.modalService.dismissAll();
      });
    }
  }

  remove_id: any;
  remove_item(id: any, remove_item: any) {
    this.remove_id = remove_item;
    this.modalService.open(this.deletemodal_typeRef, {
      ariaLabelledBy: "modal-basic-title",
      windowClass: "modal_customize_service",
    });
  }

  delete_item() {
    this.locationsList.splice(this.remove_id, 1);
    this.toasterService.pop(
      "success",
      "Success",
      "Issue/Asset removed successfully"
    );
    this.modalService.dismissAll();
  }

  post_rating(ratings: any, card_details: any) {
    if (navigator.geolocation) {
      let payload = {
        id: card_details.id,
        formid: card_details.typeId,
        rating: ratings,
      };
      this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
        this.toasterService.pop(
          "success",
          "Success",
          "Ratings added successfully"
        );
        this.modalService.dismissAll();
      });
    }
  }

  userDetailsToggle() {
    this.router.navigate(["./userdetails"]);
  }

  userDetailsClose(evt) {
    this.userDetails = evt;
  }

  toggleFilterPage = (flag: boolean) => {
    this.isFilterPageVisible = flag;
  };

  async doLogout() {
    window.sessionStorage.removeItem("personId");
    await this.keyCloakService.logout();
  }

  notifToggle() {
    this.notification = !this.notification;
  }

  notifClose(evt) {
    this.notification = evt;
  }

  open_external_link() {
    this.ifram_show = true;
    this.map_show = false;
    this.show_subment = false;
    this.mob_view = false;
    this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(
      "https://neighbourhood.solveninja.org/"
    );
  }

  open_external_link1() {
    this.ifram_show = true;
    this.map_show = false;
    this.mob_view = false;
    this.show_subment = false;
    this.map_show = false;
    this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(
      "https://forum.solveninja.org/"
    );
  }

  openExternalLink(URL) {
    this.ifram_show = true;
    this.map_show = false;
    this.mob_view = false;
    this.list_view = false;
    this.show = false;
    this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(URL);
  }

  dostuf() {
    this.searchElementRef.nativeElement.value = "";
    this.addressToCoordinates("Bangalore");
  }

  loadLocationData() {
    let menu = newMenuList.find((m) => m.key == this.activeMenu);
    if (menu) {
      this._mapService.getMapLocations$.next({
        key: menu.key,
        endPoint: menu.endPoint,
      });
    }
  }

  searchClose() {
    this.searchText = "";
  }
}
