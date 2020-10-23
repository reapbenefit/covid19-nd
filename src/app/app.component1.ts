import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  TemplateRef,
} from "@angular/core";
import { DataService } from "./services/data.service";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
// import { } from 'googlemaps';
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
import { MenuService, Menu } from "./services/menu.service";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { ToasterService } from "angular2-toaster";
import { KeycloakService } from "keycloak-angular";
import { FilterserviceService } from "./services/filterservice.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";

declare const google: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  notification: boolean = false;
  notifCount: number = 0;
  public incoming_data = data;
  showHeader = false;
  showSidebar = false;
  showFooter = false;
  private geoCoder;
  public orgUserdata: any;
  public organisations: any;
  add_img = "../../../assets/Icons/add.png";
  toggle_img = "../../../assets/Icons/menuicons/toggle-list.png";
  toggle_text = "Map View";
  url: SafeResourceUrl;
  public categorylist: any;
  public assigneelist: any;
  public checkedcategoryRows: Array<any> = [];
  public checkedassigneeRows: Array<any> = [];
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
  @ViewChild("preview_form_details")
  private preview_form_details_needyRef: TemplateRef<Object>;
  @ViewChild("Userlist") private UserlistRef: TemplateRef<Object>;
  @ViewChild("Orglist") private OrglistRef: TemplateRef<Object>;
  @ViewChild("categorymodal") private categoryRef: TemplateRef<Object>;
  @ViewChild("assignemodal") private assigneeRef: TemplateRef<Object>;
  subMenuList = ["http://nd.solveninja.org/", "https://forum.solveninja.org/"];

  //submit form parameters
  form_type_list: any;
  formtypelistdata: any;
  districtNme:string="";
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

  key: string = "type"; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  itemsperpage = "5";

  userDetails: boolean = false;
  list_view: boolean = false;
  map_show: boolean = true;
  ifram_show: boolean = false;

  public checkedRows: Array<any> = [];
  public checkedorgRows: Array<any> = [];

  @ViewChild("modal_customize_tree") private deletemodal_typeRef: ElementRef;

  activeMenu: string;
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
    this._filterService.getFiltersList$().subscribe();
    this._mapService.locationsData$.subscribe((data) => {
      if (data) {
        this.locationsList = data;
        console.log(this.locationsList);
        
        
        
      }
    });
    this._menuService.selectedMenu$.subscribe((menu: string) => {
      if (menu) {
        this.activeMenu = menu;
      }
    });
    this._menuService.menuList$.subscribe((menuList: Array<Menu>) => {
      if (menuList) {
        this.menuList = menuList;
      }
    });
    // const paramId = params.get("menuKey");
    this._router = router;
  }
  global_form_id: string = "";
  form_data: any;
  global_menu_val = "";
  async ngOnInit() {
    if (await this.keyCloakService.isLoggedIn()) {
      const userDetails = await this.keyCloakService.loadUserProfile();
      console.log("Logged In User Info", userDetails.username);
       window.sessionStorage.removeItem("uname");
       window.sessionStorage.setItem("uname", userDetails.username);
      this.dataService.signin(userDetails.username).subscribe((response) => {
        if (response == "404") {
          console.log(response, "response app in");
          this.router.navigate(["./registration"]);
        } else {
           window.sessionStorage.setItem("personId", response.personId);
        }
      });
    }

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });

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

  get_form_type_list() {
    this.dataService.getFormtype().subscribe((formtypedata) => {
      this.form_type_list = formtypedata;
    });
  }

  getSelectedvalue(selectedValue) {
    let payload = {
      type: this.selectedValue,
    };
    this.dataService.getFormlisttype(payload).subscribe((formtypelist) => {
      this.formtypelistdata = formtypelist;
    });
  }

  preview_form_approved(form_arr) {
    this.global_form_id = form_arr.index;
    let payload = {
      components: form_arr.schema,
    };
    this.preview_fields = payload;
    this.modalService
      .open(this.preview_form_details_needyRef, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "modal_customize_service",
      })
      .result.then((result) => {});
  }

  getforminputdata(e) {
    e = e || window.event;
    let temp = e.target.className;
    let temp1 = temp.split(" ");

    console.log(temp1, "temp1temp1temp1");

    if (temp1[3] === "custom_btn_css") {
      const modalRef = this.modalService.open(GoogleMapsComponent, {});
      let data = {
        prop1: "Some Data",
        prop2: "From Parent Component",
        prop3: "This Can be anything",
      };

      modalRef.componentInstance.fromParent = data;
      modalRef.result.then(
        (result) => {
          this.coordinates = result;
        },
        (reason) => {}
      );
    } else if (temp1[3] === "add_user") {
      let payload = {
        orgid:  window.sessionStorage.getItem("orgId") || "0",
      };

      this.modalService
        .open(this.UserlistRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getorguserdata(payload).subscribe((orguserlist) => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.orgUserdata = orguserlist;
        this.orgUserdata.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
        console.log(this.orgUserdata, "this.orgUserdatathis.orgUserdata");
      });
    } else if (temp1[3] === "org_list") {
      console.log("org list blosck");
      this.modalService
        .open(this.OrglistRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getOrgList().subscribe((orglist) => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.organisations = orglist;
        this.organisations.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
        console.log(
          this.organisations,
          "this.organisationsorganisations.orgUserdata"
        );
      });
    } else if (temp1[3] === "category_css") {
      console.log("category list blosck");
      this.modalService
        .open(this.categoryRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getCategoryList().subscribe((categlist) => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.categorylist = categlist;
        this.categorylist.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
        console.log(this.categorylist, "this.categorylist");
      });
    } else if (temp1[3] === "add_assignee") {
      let payload = {
        orgid:  window.sessionStorage.getItem("orgId") || "0",
      };

      this.modalService
        .open(this.assigneeRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getorguserdata(payload).subscribe((orguserlist) => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.assigneelist = orguserlist;
        this.assigneelist.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
        console.log(this.assigneelist, "this.assigneelist.orgUserdata");
      });
    }
  }

  getAddressParts(map_address) {
    let address = {};
    const address_components = map_address.address_components;
    address_components.forEach((element) => {
      address[element.types[0]] = element.short_name;
    });
    return address;
  }

  add_members() {
    document.getElementById("member_close").click();
  }

  changed() {
    this.count = 0;
    // this.orgUserdata.forEach(item => {
    //   if (item['selected'] == true) {
    //     this.count = this.count + 1;
    //     if (this.count > 1) {
    //       this.toggleButton = true;
    //     }
    //     else {
    //       this.toggleButton = false;
    //     }
    //   }
    // })
  }
  setClickedRow(index) {
    this.selectedRow = index;
  }

  clickc(value: any) {
    console.log(value);
  }

  setorgClickedRow(index) {
    this.selectedorgRow = index;
  }

  selected_click(value: any) {
    console.log(value, "org valueee");
  }

  submit_form(form_value) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.current_location =
          pos.coords.latitude + ", " + pos.coords.longitude;
        this.geoCoder.geocode(
          { location: { lat: pos.coords.latitude, lng: pos.coords.longitude } },
          (results, status) => {
            const currentaddress = {
              address: {
                formatted_address: results[0].formatted_address,
                address_parts: this.getAddressParts(results[0]),
              },
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            };

            // console.log(this.orgUserdata,"org data length")

            if (this.orgUserdata !== undefined) {
              this.orgUserdata = this.orgUserdata.filter((row: any) => {
                if (row.selected !== false) {
                  this.checkedRows.push(row.index);
                  console.log(this.checkedRows, "members selected");
                } else {
                  return false;
                }
              });
            }

            if (this.organisations !== undefined) {
              this.organisations = this.organisations.filter((row: any) => {
                if (row.selected !== false) {
                  this.checkedorgRows.push(row.index);
                  console.log(this.checkedorgRows, "orgs selected");
                } else {
                  return false;
                }
              });
            }

            if (this.categorylist !== undefined) {
              this.categorylist = this.categorylist.filter((row: any) => {
                if (row.selected !== false) {
                  this.checkedcategoryRows.push(row.index);
                  console.log(this.checkedcategoryRows, "category selected");
                } else {
                  return false;
                }
              });
            }

            if (this.assigneelist !== undefined) {
              this.assigneelist = this.assigneelist.filter((row: any) => {
                if (row.selected !== false) {
                  this.checkedassigneeRows.push(row.index);
                  console.log(this.checkedassigneeRows, "category selected");
                } else {
                  return false;
                }
              });
            }

            let payload = {
              form_data: form_value["data"],
              selectedAddress: this.coordinates,
              currentAddress: currentaddress,
              submissionTypeId: this.selectedValue,
              members: this.checkedRows,
              form_id: this.global_form_id,
              orgId: this.checkedorgRows,
            };

            console.log(
              payload,
              "posting current location and selected location submit data"
            );
            // return true;
            this.dataService
              .submissionForm(payload)
              .subscribe((formtypelist) => {
                /*this._mapService.getMapLocations$.next({
                  key: "home",
                  endPoint: "locations",
                });*/
                this.toasterService.pop(
                  "success",
                  "Success",
                  "Form submitted successfully"
                );
                this.modalService.dismissAll();
              });
          }
        );
      });
    }
  }
  public global_data: any;
  setActiveMenuItem = (prop: any) => {
    const { menuItem, show_subment } = prop;
    const _point: Menu = this.menuList.find(
      (item) => item.key === menuItem.key
    );
    this._menuService.setSelectedMenu$.next(menuItem.key);

    // this._mapService.setSelectedMarker$.next(null);

    if (_point && _point.endPoint) {
      // console.log(_point,_point.endPoint, "end point pins")
      this._mapService.getMapLocations$.next({
        key: _point.key,
        endPoint: _point.endPoint,
      });
    }
    this.global_data = menuItem;
    this.list_view = false;
    this.ifram_show = false;
    this.map_show = true;

    if (menuItem.key === "pins") {
      this.global_menu_val = "pins";
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
      this.show_subment = false;
    } else if (menuItem.key === "list") {
      this.global_menu_val = "list";
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
      this.show_subment = false;
    } else if (menuItem.key === "casestudy") {
      this.global_menu_val = "casestudy";
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
      this.show_subment = false;
    } else if (menuItem.key === "discourse") {
      this.ifram_show = true;
      this.map_show = false;
      this.show_subment = false;
      /*this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.subMenuList[1]
      );*/
    } else if (menuItem.key === "externallinks") {
      this.ifram_show = false;
      this.show_subment = show_subment;
      this.map_show = true;
      /*this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(
        this.subMenuList[0]
      );*/
    }

    // if (menuItem.key === "add") {
    //   this.get_form_type_list();
    //   this.modalService.open(this.contentmodalRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' });
    // }
  };

  open_list() {
    this.global_data.state = !this.global_data.state;
    console.log(this.global_data, "global menu valu");
    // this.map_show=false;
    // this.ifram_show=false;
    // this.list_view=true;
    if (this.global_data.key === "pins" && this.global_data.state !== true) {
      this.toggle_text = "Map View";
      this.map_show = true;
      this.list_view = false;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
    } else if (
      this.global_data.key === "pins" &&
      this.global_data.state === true
    ) {
      this.toggle_text = "List View";
      this.map_show = false;
      this.list_view = true;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-list.png";
    }

    if (this.global_data.key === "list" && this.global_data.state !== true) {
      console.log("inner loop");
      this.toggle_text = "Map View";
      this.map_show = true;
      this.list_view = false;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
    } else if (
      this.global_data.key === "list" &&
      this.global_data.state === true
    ) {
      this.toggle_text = "List View";
      this.map_show = false;
      this.list_view = true;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-list.png";
    }

    if (
      this.global_data.key === "casestudy" &&
      this.global_data.state !== true
    ) {
      this.toggle_text = "Map View";
      this.map_show = true;
      this.list_view = false;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-pin.png";
    } else if (
      this.global_data.key === "casestudy" &&
      this.global_data.state === true
    ) {
      this.toggle_text = "List View";
      this.map_show = false;
      this.list_view = true;
      this.toggle_img = "../../../assets/Icons/menuicons/toggle-list.png";
    }
  }

  open_form() {
    this.get_form_type_list();
    this.modalService.open(this.contentmodalRef, {
      ariaLabelledBy: "modal-basic-title",
      windowClass: "modal_customize_service",
    });
  }

  post_comment(comments: any, card_details: any) {
    console.log(comments, "posting comments");
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
          userId:  window.sessionStorage.getItem("personId"),
        };
        console.log(payload, "Comments information");
        // return true;
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          // this._mapService.locationsData$.subscribe((data) => {
          //   if (data) {
          //     this.locationsList = data;
          //     console.log(this.locationsList,"after submit location list inncoming")
          //   }
          // });
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
    console.log(supporters, "incoming supporters");

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
        // console.log(payload, "support information");
        // return true;
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
    // console.log(id, remove_item, "deleting item");
    this.remove_id = remove_item;
    // this.locationsList.splice(remove_item,1);
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
        console.log(payload, "rating information");
        // return true;
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

  // userDetailsOpen(evt){
  //   this.userDetails = evt;
  // }

  userDetailsToggle() {
    this.userDetails = !this.userDetails;
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
    console.log("button click");
    this.notification = !this.notification;
  }

  notifClose(evt) {
    this.notification = evt;
  }

  open_external_link() {
    this.ifram_show = true;
    this.map_show = false;
    this.show_subment = false;
    // this.url="";
    this.url = this._domSanitizer.bypassSecurityTrustResourceUrl(
      "http://nd.solveninja.org/"
    );
  }
}
