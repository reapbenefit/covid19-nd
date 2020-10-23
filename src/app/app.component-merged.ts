import { Component, NgZone, ViewChild, ElementRef, TemplateRef, } from "@angular/core";
import { DataService } from "./services/data.service";
import { NgbModal, NgbModalRef, NgbModalOptions, } from "@ng-bootstrap/ng-bootstrap";
import { MapsAPILoader } from "@agm/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { CommonService } from "./services/common.service";
import { ward } from "./services/wards";
import { TreeviewItem, TreeviewConfig } from "ngx-treeview";
import { GoogleAnalyticsService } from "./services/google-analytics.service";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
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
import { async } from "@angular/core/testing";

declare const google: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  global_form_id: string = "";
  notification: boolean = false;
  notifCount: number = 0;
  public incoming_data = data;
  showHeader = false;
  showSidebar = false;
  showFooter = true;
  private geoCoder;
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
  @ViewChild("signup_volunteer") private signup_volunteerref: TemplateRef<Object>;
  @ViewChild("inforamation_local") private local_informationref: TemplateRef<Object>;
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
  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
    private _filterService: FilterserviceService
  ) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
    this._filterService.getFiltersList$().subscribe();
    this._mapService.locationsData$.subscribe((data) => {
      this.setLocationData(data);
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

  getLocationByGeo = async (data) => {
    if (navigator) {
      await navigator.geolocation.getCurrentPosition(async (pos) => {
        await this.geoCoder.geocode(
          {
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
          },
          (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                const cityObj = results[0].address_components.find((i) =>
                  i.types.some((si) => si === "administrative_area_level_2")
                );
                if (cityObj) {
                  this.locationsList = data.filter(
                    (i) => i.disticName === cityObj.long_name
                  );
                } else {
                  this.locationsList = data;
                }
              } else {
                this.locationsList = data;
              }
            } else {
              this.locationsList = data;
            }
          }
        );
      });
    }
  };

  setLocationData = async (data) => {
    await this.getLocationByGeo(data);
  };

  form_data: any;
  global_menu_val = "";

  async ngOnInit() {
    if (await this.keyCloakService.isLoggedIn()) {
      const userDetails = await this.keyCloakService.loadUserProfile();
      window.sessionStorage.removeItem("uname");
      window.sessionStorage.setItem("uname", userDetails.username);
      this.dataService.signin(userDetails.username).subscribe((response) => {
        if (response == "404") {
          this.router.navigate(["./registration"]);
        } else {
          window.sessionStorage.setItem("personId", response.personId);
          window.sessionStorage.setItem("orgId", response.orgIds);
        }
      });
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader =
          this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.showSidebar =
          this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
        this.showFooter =
          this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
      }
    });
    this.form_data = this.incoming_data["default"];
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
    this.dataService.getNotifications(this._mapService.adress).subscribe((response) => {
      this.notifCount = response["length"];
    });
  }
  public global_data: any;

  setActiveMenuItem = (prop: any) => {
    const { menuItem, show_subment } = prop;
    const _point: Menu = this.menuList.find(
      (item) => item.key === menuItem.key
    );
    this._menuService.setSelectedMenu$.next(menuItem.key);

    if (_point && _point.endPoint) {
      this._mapService.getMapLocations$.next({
        key: _point.key,
        endPoint: _point.endPoint,
      });
    }
    this.global_data = menuItem;
    this.list_view = true;
    this.ifram_show = false;
    this.map_show = false;
    if (menuItem.key === "pins") {
      this.global_menu_val = "pins";
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
      this.show_subment = false;
      this.capsuletext = "Reports";
    } else if (menuItem.key === "list") {
      this.global_menu_val = "list";
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
      this.show_subment = false;
      this.capsuletext = "Ideas";
    } else if (menuItem.key === "casestudy") {
      this.global_menu_val = "casestudy";
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
      this.show_subment = false;
      this.capsuletext = "Case Study";
    } else if (menuItem.key === "externallinks") {
      this.ifram_show = false;
      this.show_subment = !this.show_subment;
      this.map_show = true;
      this.list_view = false;
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
      this.toggle_text = "Map View";
      this.map_show = false;
      this.list_view = true;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
    } else if (
      this.global_data.key === "pins" &&
      this.global_data.state === true
    ) {
      this.toggle_text = "List View";
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
    let myCurrentLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        myCurrentLocation =
          "" + pos.coords.latitude + ", " + pos.coords.longitude;
        let payload = {
          id: card_details.id,
          formid: card_details.typeId,
          comment: comments,
          location: myCurrentLocation,
          userId: window.sessionStorage.getItem("personId"),
        };
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          this.toasterService.pop(
            "success",
            "Success",
            "Comments added successfully"
          );
        });
      });
    }
  }

  public send_supporter = [];
  Post_Supporters(supporters: any, card_details: any) {
    let myCurrentLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        myCurrentLocation =
          "" + pos.coords.latitude + ", " + pos.coords.longitude;
        let payload = {
          id: card_details.id,
          formid: card_details.typeId,
          supportes: supporters,
          location: myCurrentLocation,
        };
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          this.toasterService.pop(
            "success",
            "Success",
            "Ratings added successfully"
          );
          this.modalService.dismissAll();
        });
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
    let myCurrentLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        myCurrentLocation =
          "" + pos.coords.latitude + ", " + pos.coords.longitude;
        let payload = {
          id: card_details.id,
          formid: card_details.typeId,
          rating: ratings,
          location: myCurrentLocation,
        };
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          this.toasterService.pop(
            "success",
            "Success",
            "Ratings added successfully"
          );
          this.modalService.dismissAll();
        });
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
    this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(
      "https://neighbourhood.solveninja.org/"
    );
  }

  open_external_link1() {
    this.ifram_show = true;
    this.map_show = false;
    this.show_subment = false;
    this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(
      "https://forum.solveninja.org/"
    );
  }
}
