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
    private ngZone: NgZone
  ) {
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
      if (data) {
        this.locationsList = data;
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
          
         
        }
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
