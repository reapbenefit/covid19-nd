import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  SimpleChanges,
  HostListener,
  Pipe,
  ApplicationRef,
} from "@angular/core";
import { DataService } from "./services/data.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { } from 'googlemaps';
import { MapsAPILoader, LatLngBounds } from "@agm/core";
import { FormControl } from "@angular/forms";
import { Subscription, forkJoin } from "rxjs";
import { CommonService } from "./services/common.service";
import { ward } from "./services/wards";
import { TreeviewItem, TreeviewConfig } from "ngx-treeview";
import { GoogleAnalyticsService } from "./services/google-analytics.service";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
declare const google: any;
import { DeviceDetectorService } from "ngx-device-detector";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  openpopups = false;
  searchLocation = false;
  filterSearch = false;
  isMobile = false;
  menupopup = false;
  collapseGooglesearch = false;
  defaultpage = "Home";
  detail_legends_collapse = true; // true means Collapse
  legends_details = "legends"; // false --> Details
  filterdetailsvalue = "";
  loaderAction = false;

  // @ViewChild('Governance') Governance: ElementRef;

  configMenu = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400,
  });

  MenuItems: TreeviewItem[];
  title = "Neighbourhood";
  private showMenu = true;
  public cities = [
    // {
    //   "id": 1,
    //   "name": "Bangalore",
    //   "lat": 12.9796,
    //   "lng": 77.5906
    // }, {
    //   "id": 2,
    //   "name": "Mumbai",
    //   "lat": 18.9690,
    //   "lng": 72.8205
    // }, {
    //   "id": 4,
    //   "name": "Delhi",
    //   "lat": 28.6643,
    //   "lng": 77.2167
    // }, {
    //   "id": 36,
    //   "name": "Chennai",
    //   "lat": 13.0822,
    //   "lng": 80.2755
    // }
    //   , {
    //   "id": 6,
    //   "name": "Tumkur",
    //   "lat": 13.3392,
    //   "lng": 77.1140
    // }
  ];
  public Wards = [];
  // public Wards = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'];
  public categories = [
    {
      id: 1,
      value: "Air",
      ImgSrc: "./assets/Icons/Air.png",
      checked: false,
    },
    {
      id: 6,
      value: "Waste",
      ImgSrc: "./assets/Icons/Waste.png",
      checked: false,
    },
    {
      id: 9,
      value: "Potholes",
      ImgSrc: "./assets/Icons/Pothole.png",
      checked: false,
    },
    {
      id: 7,
      value: "Water",
      ImgSrc: "./assets/Icons/Water.png",
      checked: false,
    },
    {
      id: 2,
      value: "Energy",
      ImgSrc: "./assets/Icons/Energy.png",
      checked: false,
    },
    {
      id: 4,
      value: "Sanitation",
      ImgSrc: "./assets/Icons/Sanitation.png",
      checked: false,
    },
    {
      id: 5,
      value: "Traffic",
      ImgSrc: "./assets/Icons/Traffic.png",
      checked: false,
    },
    {
      id: 3,
      value: "Other",
      ImgSrc: "./assets/Icons/Others.png",
      checked: false,
    },
  ];
  private AQMS = ["GOVT", "RB"];
  public close = false;
  private agencyData;
  private DWCCData;
  private toiletsData;
  private campaignsData;
  public mapData = [];
  public graphData = [];
  public compare = true;
  public mapType;
  public showComp = false;
  subscription: Subscription;
  subscriptionWithCord: Subscription;

  constructor(
    private router: Router,
    private location: Location,
    private deviceService: DeviceDetectorService,
    private dataService: DataService,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private commonService: CommonService,
    private KeycloakService: KeycloakService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    // Get Creaters OrgsList
    this.getOrgList();
    // Calling Before NgInt to set Url
    this.getUrlParameters();
  }

  /**
   * Checking Tab, Mobile , Desktab view
   */
  epicFunction() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    this.isMobile = isMobile;
    if (!this.isMobile) {
      this.detail_legends_collapse = false;
    }

    console.log(isMobile); // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet); // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  SelectedCategory(event) {
    console.log(event);
    for (let ic = 0; ic < this.categories.length; ic++) {
      if (this.categories[ic].value == event) {
        this.categories[ic].checked = !this.categories[ic].checked;
      }
    }
    this.IssueSer();
    // this.getDashboardData(2);
  }

  getDashboardData(type) {
    let catArr = [];
    if (type == 2) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].checked == true) {
          catArr.push(this.categories[i].id);
        }
      }
    } else {
      catArr = undefined;
    }
    var obj = {
      cityId: this.SelectedCity,
      type: type, //{1:Campaign,2:Reports,5:Agencies,6:Governance,,7:DWCC,8:Toilet,9:AQM}
      level: this.dataService.zoom,
      category: catArr,
      lat: this.dataService.centerLat,
      lng: this.dataService.centerLng,
      dashboardData: true,
    };
    this.dataService.getCorrLocDetails(obj).subscribe((data) => {
      console.log(data);
      let res: any = data;
      this.mapData = res.data;
    });
  }

  open(content, type) {
    let size;
    if (type == "cityData") {
      size = "sm";
    } else {
      size = "lg";
    }
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: size })
      .result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
      });
    this.formButtonClickEvent("Menu", "Links", type, "Link");
  }

  private issGraph;
  public graphDataStatus = [];
  public selIssCat;
  public issueMapData;
  private Governance;
  public IssueData;
  public showIssues = false;

  IssueSer() {
    this.ShowForum = false;
    this.showComp = true;
    this.graphDataStatus = [];
    this.AQM = false;
    (<HTMLInputElement>document.getElementById("DWCC")).checked = false;
    (<HTMLInputElement>document.getElementById("Toilet")).checked = false;
    (<HTMLInputElement>document.getElementById("Campaigns")).checked = false;
    (<HTMLInputElement>document.getElementById("AQMcheck")).checked = false;
    (<HTMLInputElement>document.getElementById("ICatagory")).checked = true;
    (<HTMLInputElement>document.getElementById("Governance")).checked = false;
    (<HTMLInputElement>document.getElementById("Agencies")).checked = false;
    this.mapData = [];
    let catArr = [];
    this.graphData = [];
    let issObj;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].checked == true) {
        catArr.push(this.categories[i].id);
      }
    }
    this.dataService.catType = 2;
    issObj = {
      cityId: this.SelectedCity,
      wardId: this.wardID,
      category: catArr,
    };
    this.dataService.SelIssCat = catArr;
    this.Type = "Issues Categories";
    this.dataService.getReports(issObj).subscribe((data) => {
      console.log(data);
      this.issueMapData = data;
      this.mapData = this.issueMapData.mapData;
      this.issGraph = data;
      this.mapData.forEach((element) => {
        if (element.category == "Waste") {
          element.icon = "./assets/Icons/Waste.png";
        } else if (element.category == "Pothole") {
          element.icon = "./assets/Icons/Pothole.png";
        } else if (element.category == "Water") {
          element.icon = "./assets/Icons/Water.png";
        } else if (element.category == "Energy") {
          element.icon = "./assets/Icons/Energy.png";
        } else if (element.category == "Traffic") {
          element.icon = "./assets/Icons/Traffic.png";
        } else if (element.category == "Sanitation") {
          element.icon = "./assets/Icons/Sanitization.png";
        }
      });
      // this.IssueData = this.issGraph.graph;
      this.IssueData = undefined;
      if (
        this.showgraphs == true ||
        this.showGovernance == true ||
        this.showAgencies == true ||
        this.showIssues == true
      ) {
        this.showIssues = true;
        this.showgraphs = false;
        this.showGovernance = false;
        this.showAgencies = false;
        this.AQM = false;
      } else {
        this.showIssues = false;
        this.showgraphs = false;
        this.showGovernance = false;
        this.showAgencies = false;
        this.AQM = false;
      }
      // this.showIssues = true;
    });
  }

  SelectedAQM(event) {
    console.log(event);
  }

  SelectWard(event) {
    console.log(event);
  }

  public SelectedCity;
  public showMenuItems = false;
  SelectCity(event) {
    console.log(event);
    this.searchLocation = false;
    this.searchElementRef.nativeElement.value = "";
    this.MenuItems = this.getMenuJSON(this.MenuData);
    if (event.value != undefined) {
      // Tracking event
      this.formButtonClickEvent("City Selection", "/", event, "Select");

      this.showMenuItems = true;
      this.ShowForum = false;
      this.mapData = [];
      // this.showgraphs = false;
      this.SelectedCity = event.value.id;
      this.dataService.SelectCityID = Number(this.SelectedCity);
      this.dataService.SelectedCity = event.value.id;
      var obj = {
        lat: Number(event.value.lat),
        lng: Number(event.value.lng),
      };
      var arr = [];
      arr.push(obj);
      this.mapData = arr;
      this.dataService.SelectedCityLat = Number(event.value.lat);
      this.dataService.SelectedCityLng = Number(event.value.lng);
      for (let clr = 0; clr < this.categories.length; clr++) {
        this.categories[clr].checked = false;
      }
      this.dataService.AQMDataList = undefined;
      this.AQM = false;
      this.dataService.catType = 0;
      // (<HTMLInputElement>document.getElementById('DWCC')).checked = false;
      // (<HTMLInputElement>document.getElementById('Toilet')).checked = false;
      // (<HTMLInputElement>document.getElementById('Campaigns')).checked = false;
      // (<HTMLInputElement>document.getElementById('AQMcheck')).checked = false;
      // (<HTMLInputElement>document.getElementById('ICatagory')).checked = false;
      // (<HTMLInputElement>document.getElementById('Governance')).checked = false;
      // (<HTMLInputElement>document.getElementById('Agencies')).checked = false;
      this.Wards = [];
      this.WardSelected = undefined;
      this.dataService
        .wardDetails({ cityId: this.SelectedCity })
        .subscribe((data) => {
          var tempWardData: any = data;
          this.Wards = tempWardData ? tempWardData["data"] : [];
          this.ShowWardSelect = false;
          setTimeout(() => {
            this.ShowWardSelect = true;
          }, 10);
        });
    } else {
      this.dataService.zoom = 10;
      this.mapData = [];
      this.showMenuItems = false;
      this.SelectedCity = undefined;
      this.wardSelected = undefined;
      this.dataService.SelectCityID = undefined;
      this.dataService.SelectedCity = undefined;
      this.dataService.AQMDataList = undefined;
      this.AQM = false;
      this.dataService.catType = 0;
      for (let clr = 0; clr < this.categories.length; clr++) {
        this.categories[clr].checked = false;
      }
    }
    this.NewObj.cityId = this.SelectedCity == undefined ? 0 : this.SelectedCity;
    this.NewObj.wardId = this.wardSelected == undefined ? 0 : this.wardSelected;
    this.NewObj.menuData = [];
    // this.NewObj.level = this.dataService.zoom;
    this.NewObj.level = event.value["zoom"]
      ? event.value["zoom"]
      : this.dataService.zoom;
    this.NewObj.latitude = Number(this.dataService.SelectedCityLat);
    this.NewObj.longitude = Number(this.dataService.SelectedCityLng);
    this.CollectionsData(this.NewObj);
    this.formButtonClickEvent("Menu", "City_Menu", "City_Select", "Select");
    this.defaultSelectTrigger();
    // get New count based on city changed
    this.getCountBased_On_Location(this.NewObj);
  }

  private dwcGraph;
  private AQMData;
  public AQM = false;
  public WardDetails;
  public wardAgencyList;
  public showGovernance = false;
  public showAgencies = false;
  public Type = "";
  radioType(event, type) {
    this.ShowForum = false;
    this.showComp = false;
    this.AQM = false;
    this.IssueData = undefined;
    this.graphDataStatus = [];
    for (let n = 0; n < this.categories.length; n++) {
      this.categories[n].checked = false;
    }
    this.mapData = [];
    this.graphData = [];
    this.Type = type;
    let obj = {
      cityId: Number(this.SelectedCity),
      wardId: this.wardID,
    };
    if (type == "Agencies") {
      this.dataService.catType = 5;
      this.compare = true;
      if (true) {
        this.dataService.getAgencies(obj).subscribe(
          (data) => {
            this.agencyData = data;
            this.mapData = this.agencyData.agencies;
            this.mapData.forEach((element) => {
              if (
                element.name == "Mini Bangalore One Centre" ||
                element.name == "Bangalore One Centre" ||
                element.name == "Kiosk"
              ) {
                element.icon = "./assets/Icons/BOne.png";
              } else if (element.name == "BBMP Revenue Office") {
                element.icon = "./assets/Icons/BB.png";
              } else if (element.name == "Zonal Office") {
                element.icon = "./assets/Icons/BWSSB.png";
              } else if (
                element.name == "BESCOM office" ||
                element.name == "ELCITA Office"
              ) {
                element.icon = "./assets/Icons/BESCOM.png";
              } else if (element.name == "Police Station") {
                element.icon = "./assets/Icons/Police.png";
              }
            });
            this.wardAgencyList = this.agencyData.wardAgencyList;
            if (
              this.showgraphs == true ||
              this.showGovernance == true ||
              this.showAgencies == true ||
              this.showIssues == true
            ) {
              this.showIssues = false;
              this.showgraphs = false;
              this.showGovernance = false;
              this.showAgencies = true;
              this.AQM = false;
            } else {
              this.showIssues = false;
              this.showgraphs = false;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else if (type == "Issues Categories") {
      this.Type = type;
      this.dataService.catType = 2;
      this.compare = true;
      this.showComp = true;
    } else if (type == "DWCC") {
      this.dataService.catType = 7;
      this.compare = true;
      if (true) {
        this.dataService.getDWCC(obj).subscribe(
          (data) => {
            this.DWCCData = data;
            this.mapData = this.DWCCData.data;
            this.dwcGraph = data;
            this.mapData.forEach((element) => {
              if (element.facility_type == "Bio Methanation Unit (BMU)") {
                element.icon = "./assets/Icons/BioMethanation.png";
              } else if (
                element.facility_type == "Dry Waste Collection Center (DWCC)"
              ) {
                element.icon = "./assets/Icons/DryWaste.png";
              } else if (
                element.facility_type == "Centralized Processing Facility"
              ) {
                element.icon = "./assets/Icons/ProcessFacility.png";
              } else if (
                element.facility_type == "Leaf Litter Processing Units (LLPU)"
              ) {
                element.icon = "./assets/Icons/Leaf.png";
              } else if (
                element.facility_type == "Organic Waste Converter (OWC)"
              ) {
                element.icon = "./assets/Icons/OrgWaste.png";
              } else if (element.facility_type == "Landfills") {
                element.icon = "./assets/Icons/LandFills.png";
              }
            });
            for (let ig = 0; ig < this.dwcGraph.total_count.length; ig++) {
              var obj = {
                name: this.dwcGraph.total_count[ig].name,
                value: this.dwcGraph.total_count[ig].count,
              };
              this.graphData.push(obj);
              if (
                this.showgraphs == true ||
                this.showGovernance == true ||
                this.showAgencies == true ||
                this.showIssues == true
              ) {
                this.showIssues = false;
                this.showgraphs = true;
                this.showGovernance = false;
                this.showAgencies = false;
                this.AQM = false;
              } else {
                this.showIssues = false;
                this.showgraphs = false;
                this.showGovernance = false;
                this.showAgencies = false;
                this.AQM = false;
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else if (type == "Governance") {
      this.dataService.catType = 6;
      this.compare = true;
      if (true) {
        this.dataService.getGovernance(obj).subscribe(
          (data) => {
            this.Governance = data;
            this.mapData = this.Governance.Corporator;
            this.mapData.forEach((element) => {
              element.icon = "./assets/Icons/Corporator.png";
            });
            this.mapData = this.mapData.concat(this.Governance.MLA);
            this.mapData.forEach((element) => {
              if (element.icon == undefined) {
                element.icon = "./assets/Icons/MLA.png";
              }
            });
            // this.WardDetails = this.Governance;
            this.WardDetails = undefined;
            if (
              this.showgraphs == true ||
              this.showGovernance == true ||
              this.showAgencies == true ||
              this.showIssues == true
            ) {
              this.showIssues = false;
              this.showgraphs = false;
              this.showGovernance = true;
              this.showAgencies = false;
              this.AQM = false;
            } else {
              this.showIssues = false;
              this.showgraphs = false;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else if (type == "Toilets") {
      this.dataService.catType = 8;
      this.compare = true;
      if (true) {
        this.dataService.getToilets(obj).subscribe(
          (data) => {
            this.toiletsData = data;
            this.mapData = this.toiletsData.data;
            this.mapData.forEach((element) => {
              element.icon = "./assets/Icons/Toilet.png";
            });
            for (let to = 0; to < this.toiletsData.info.length; to++) {
              var obj = {
                name: this.toiletsData.info[to].name,
                value: this.toiletsData.info[to].count,
              };
              this.graphData.push(obj);
            }
            if (
              this.showgraphs == true ||
              this.showGovernance == true ||
              this.showAgencies == true ||
              this.showIssues == true
            ) {
              this.showIssues = false;
              this.showgraphs = true;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = false;
            } else {
              this.showIssues = false;
              this.showgraphs = false;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else if (type == "Campaigns") {
      this.dataService.catType = 1;
      this.compare = false;
      if (true) {
        this.dataService.getCampaigns(obj).subscribe(
          (data) => {
            this.campaignsData = data;
            this.mapData = this.campaignsData.mapData;
            this.mapData.forEach((element) => {
              element.icon = "./assets/Icons/Camp.png";
            });
            for (
              let cm = 0;
              cm < this.campaignsData.graph.category.length;
              cm++
            ) {
              var obj = {
                name: this.campaignsData.graph.category[cm].value,
                value: this.campaignsData.graph.category[cm].count,
              };
              this.graphData.push(obj);
            }
            for (
              let cm1 = 0;
              cm1 < this.campaignsData.graph.status.length;
              cm1++
            ) {
              var obj = {
                name: this.campaignsData.graph.status[cm1].value,
                value: this.campaignsData.graph.status[cm1].count,
              };
              this.graphDataStatus.push(obj);
            }
            if (
              this.showgraphs == true ||
              this.showGovernance == true ||
              this.showAgencies == true ||
              this.showIssues == true
            ) {
              this.showIssues = false;
              this.showgraphs = true;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = false;
            } else {
              this.showIssues = false;
              this.showgraphs = false;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else if (type == "AQM") {
      this.dataService.catType = 9;
      this.compare = false;
      this.AQM = true;
      if (true) {
        this.dataService.AQMdata(obj).subscribe(
          (data) => {
            this.AQMData = data;
            this.mapData = this.AQMData.data;
            this.mapData.forEach((element) => {
              if (element.source == 1) {
                element.icon = "./assets/Icons/AQMGovt.png";
              } else {
                element.icon = "./assets/Icons/AQMPvt.png";
              }
            });
            this.AQMGraphLoc = this.AQMData.graph;
            this.dataService.AQMDataList = this.AQMData.data;
            if (
              this.showgraphs == true ||
              this.showGovernance == true ||
              this.showAgencies == true ||
              this.showIssues == true
            ) {
              this.showIssues = false;
              this.showgraphs = true;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = true;
            } else {
              this.showIssues = false;
              this.showgraphs = false;
              this.showGovernance = false;
              this.showAgencies = false;
              this.AQM = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    // this.getDashboardData(this.dataService.catType);
  }

  public AQMGraphLoc;
  public status = false;
  public showgraphs = false;
  closeSideNav() {
    this.status = !this.status;
  }
  showGraphs() {
    if (this.Type == "Governance") {
      this.showGovernance = !this.showGovernance;
      this.showgraphs = false;
    } else if (this.Type == "Agencies") {
      this.showAgencies = !this.showAgencies;
      this.showgraphs = false;
    } else if (this.Type == "Issues Categories") {
      this.showIssues = !this.showIssues;
      this.showgraphs = false;
    } else {
      this.showgraphs = !this.showgraphs;
    }
  }
  hideGraphs(event) {
    if (event == false) {
      if (this.Type == "Governance") {
        this.showGovernance = false;
      } else if (this.Type == "Agencies") {
        this.showAgencies = false;
      } else if (this.Type == "Issues Categories") {
        this.showIssues = false;
      } else {
        this.showgraphs = false;
      }
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.dataService.SelectedCityLat = position.coords.latitude;
        this.dataService.SelectedCityLng = position.coords.longitude;
      });
    }
  }

  public searchControl: FormControl;

  @ViewChild("search") searchElementRef: ElementRef;
  public AQMDataLoad;
  public URL;
  public MenuData;

  config = {
    displayKey: "submenu", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: "250px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 500, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No Data", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: "submenu", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  configWard = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: "250px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Select Ward", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 500, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No Data", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Ward", // label thats displayed in search input,
    searchOnKey: "name", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  configCity = {
    displayKey: "cityName", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: "250px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Select City", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 500, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No Data", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search City", // label thats displayed in search input,
    searchOnKey: "cityName", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: true,
  };

  public CityData = [];
  public CitySelected;
  public WardSelected = [];

  getMenuJSON(data): TreeviewItem[] {
    var icons = [];
    let childrenCategoryTemp = [];
    let childerenCatMain = [];
    var childrenCategory;
    data &&
      data.forEach((element) => {
        childrenCategory = new TreeviewItem({
          text: element.name,
          value: element.menuId,
          collapsed: false,
          checked: false,
          children: [{ text: "a", value: 0 }],
        });
        for (let mi = 0; mi < element.subMenus.length; mi++) {
          var tempObj = {
            text: element.subMenus[mi].submenu,
            value: element.subMenus[mi].submenuId,
            checked: false,
            name: "ramesh",
          };
          icons.push({
            submenu: element.subMenus[mi].submenu,
            icon: element.subMenus[mi].icon,
            submenuId: element.subMenus[mi].submenuId,
          });
          childrenCategory.children.push(new TreeviewItem(tempObj));
          childrenCategory.internalChecked = false;
        }
        childrenCategory.children.splice(0, 1);
        childrenCategoryTemp = [];
        childrenCategoryTemp.push(childrenCategory);
        childerenCatMain.push(childrenCategoryTemp);
      });
    childerenCatMain.forEach((val) => {
      val[0] &&
        val[0]["internalChildren"].length &&
        val[0]["internalChildren"].forEach((element) => {
          icons.forEach((val) => {
            if (element.value == val.submenuId) {
              element["icon"] = val.icon;
              return false;
            }
          });
        });
    });

    return childerenCatMain;
  }

  private CitiesList;

  dragchanges = [];

  ngOnInit() {
    // Login User
    this.LoginUserInfo();

    // Find Device
    this.epicFunction();

    /**
     * Get New coord's
     */
    this.call_CollectionsDataService();

    /**
     * 1.) Get Cities service call
     * 2.) Get getMenuList call
     */
    this.Wards.sort(this.dynamicSort("name"));
    let obj = {
      cityId: this.SelectedCity,
    };
    forkJoin([
      this.dataService.cityDetails(),
      this.dataService.getMenuList(obj),
    ]).subscribe(
      (res) => {
        if (res[0] && res[0]["data"]) {
          var tempCityData: any = res[0];
          this.cities = tempCityData.data;
          this.CitiesList = JSON.stringify(tempCityData.data);
        }
        if (res[1] && res[1]["data"]) {
          var TempMenuData: any = res[1];
          var temp: any = TempMenuData.data.filter((val) => {
            if (val.menuId != 100) {
              return val;
            }
          });
          this.MenuData = temp;
          this.MenuItems = this.getMenuJSON(this.MenuData);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.yourCurrentLocation();
      }
    );

    // this.dataService.AQMdata(obj).subscribe(data => {
    //   this.AQMDataLoad = data;
    //   this.AQMDataLoad.data.sort(this.dynamicSort("name"));
    //   this.dataService.AQMDataList = this.AQMDataLoad.data;
    // },
    //   error => {
    //     console.log(error);
    //   });

    //create search FormControl
    this.searchControl = new FormControl();

    this.setCurrentPosition();
    //load Places Autocomplete
    var options = {
      // types: ['(cities)'],
      componentRestrictions: { country: "in" },
    };
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        options
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.formButtonClickEvent("Menu", "Search", "Place_Search", "Input");
          //set latitude, longitude and zoom
          this.dataService.SelectedCityLat = place.geometry.location.lat();
          this.dataService.SelectedCityLng = place.geometry.location.lng();
          var warNmObj = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          this.dataService.getCorrLocWard(warNmObj).subscribe((data) => {
            this.dataService.zoom = 17;
            this.currentWard = data;
            this.CitySelected = undefined;
            this.cities = [];
            this.cities = JSON.parse(this.CitiesList);
            for (var ct = 0; ct < this.cities.length; ct++) {
              if (this.currentWard.details[0].cityId == this.cities[ct].id) {
                this.CitySelected = this.cities[ct];
                this.dataService.SelectedCity = this.cities[ct].id;
                this.dataService.SelectedCityLat = this.cities[ct].lat;
                this.dataService.SelectedCityLng = this.cities[ct].lng;
                this.showMenuItems = true;
                break;
              }
            }
            this.Wards = [];
            this.WardSelected = undefined;
            if (this.CitySelected != undefined) {
              this.dataService
                .wardDetails({ cityId: this.CitySelected.id })
                .subscribe((data) => {
                  var tempWardData: any = data;
                  this.Wards = tempWardData.data;
                  for (let wd = 0; wd < this.Wards.length; wd++) {
                    if (
                      this.currentWard.details[0].id == this.Wards[wd].wardId
                    ) {
                      this.WardSelected = this.Wards[wd];
                      this.wardSelected = Number(this.Wards[wd].wardId);
                      this.dataService.wardSelectedID = this.wardSelected;
                      break;
                    }
                  }
                  this.NewObj.cityId = this.dataService.SelectCityID;
                  this.NewObj.wardId = this.currentWard.details[0].id;
                  this.NewObj.level = this.dataService.zoom;
                  this.NewObj.latitude = Number(
                    this.dataService.SelectedCityLat
                  );
                  this.NewObj.longitude = Number(
                    this.dataService.SelectedCityLng
                  );
                  this.CollectionsData(this.NewObj);
                  this.ShowWardSelect = false;
                  this.ShowCitySelect = false;
                  setTimeout(() => {
                    this.ShowWardSelect = true;
                    this.ShowCitySelect = true;
                  }, 100);
                });
            }
          });
        });
      });
    });
  }

  public ShowCitySelect = true;
  public ShowWardSelect = true;
  TreeMenuItemsSelect(event, menu) {
    // console.log({ event, menu });
    if (event.length > 0) {
      let menuIncludes = false;
      let menuIndex;
      if (this.NewObj.menuData.length == 0) {
        let tempMenu = {
          menuId: menu[0].value,
          submenus: event.join(","),
        };
        this.NewObj.menuData.push(tempMenu);
      } else {
        for (
          let menuSel1 = 0;
          menuSel1 < this.NewObj.menuData.length;
          menuSel1++
        ) {
          if (menu[0].value == this.NewObj.menuData[menuSel1].menuId) {
            menuIncludes = true;
            menuIndex = menuSel1;
            break;
          } else {
            menuIncludes = false;
          }
        }
        if (menuIncludes == false) {
          let tempMenu = {
            menuId: menu[0].value,
            submenus: event.join(","),
          };
          this.NewObj.menuData.push(tempMenu);
        } else {
          this.NewObj.menuData[menuIndex].submenus = event.join(",");
        }
      }
      // this.NewObj.cityId = this.dataService.SelectCityID;
      // this.NewObj.wardId = this.wardSelected == undefined ? 0 : this.wardSelected;
      this.NewObj.level = this.dataService.zoom;
      this.NewObj.latitude = Number(this.NewObj.latitude);
      this.NewObj.longitude = Number(this.NewObj.longitude);
      // console.log(this.NewObj);
      this.CollectionsData(this.NewObj);
    } else {
      for (
        let menuSel2 = 0;
        menuSel2 < this.NewObj.menuData.length;
        menuSel2++
      ) {
        if (this.NewObj.menuData[menuSel2].menuId == menu[0].value) {
          this.NewObj.menuData.splice(menuSel2, 1);
        }
      }
      this.CollectionsData(this.NewObj);
    }
    this.formButtonClickEvent(
      "Menu",
      "Marker_Category",
      menu[0].text,
      "CheckBox"
    );
  }
  public wardName;
  public wardID;
  public corporatorName;
  public corporatorPhone;
  public currentWard;
  public wardDetails;

  WardData(event) {
    this.wardName = event.name;
    this.wardID = event.id;
    this.corporatorName = event.corporatorName;
    this.corporatorPhone = event.contactNum;
  }

  getlocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // this.dataService.getCorrLocWard(pos.coords.latitude, pos.coords.longitude).subscribe(data => {
        //   this.wardDetails = data;
        var currLoc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          icon: "./assets/Icons/myLocation.png",
          // 'wardName':this.wardDetails[0].ward_name
        };
        var obj = [];
        obj.push(currLoc);
        this.mapData = obj;
        this.dataService.SelectedCityLat = 0;
        this.dataService.SelectedCityLng = 0;
        setTimeout(() => {
          this.dataService.SelectedCityLat = pos.coords.latitude;
          this.dataService.SelectedCityLng = pos.coords.longitude;
        }, 100);
        // this.showgraphs = false;
        for (let clr2 = 0; clr2 < this.categories.length; clr2++) {
          this.categories[clr2].checked = false;
        }
        (<HTMLInputElement>document.getElementById("DWCC")).checked = false;
        (<HTMLInputElement>document.getElementById("Toilet")).checked = false;
        (<HTMLInputElement>(
          document.getElementById("Campaigns")
        )).checked = false;
        (<HTMLInputElement>document.getElementById("AQMcheck")).checked = false;
        (<HTMLInputElement>(
          document.getElementById("ICatagory")
        )).checked = false;
        (<HTMLInputElement>(
          document.getElementById("Governance")
        )).checked = false;
        (<HTMLInputElement>document.getElementById("Agencies")).checked = false;
      },
      (error) => {
        console.log(error);
        // });
      }
    );
  }

  cordDetails(event) {
    console.log(event);
  }
  closemenu(event) {
    if (event == true) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  public showClear = false;
  searchText(event) {
    this.searchControl.value;
    if (this.searchControl.value.length > 0) {
      this.showClear = true;
    } else {
      this.showClear = false;
    }
  }
  ClearSearch() {
    this.searchControl.setValue("");
    this.showClear = false;
  }

  public ShowForum = false;
  public ForumURL;
  NeighbourhoodForum() {
    // this.ShowForum = true;
    var temForumURL =
      this.wardSelectedNameForForum == undefined
        ? "https://discourse.solveninja.org/tags/"
        : "https://discourse.solveninja.org/tags/" +
          this.wardSelectedNameForForum;
    this.ForumURL = temForumURL;
    // setTimeout(() => {
    //   (<HTMLIFrameElement>document.getElementById('ForumSrc')).src = this.ForumURL;
    // }, 100);
    // window.open(this.ForumURL);
    this.formButtonClickEvent(
      "Menu",
      "Links_Button",
      "NeighbourhoodForum",
      "Links_Button"
    );
    window.open("https://covid.apollo247.com/");
  }
  public ShowAnalytics = false;
  NeighbourhoodAnalytics() {
    // this.ShowAnalytics = true;
    var tempParm =
      this.wardSelectedName == undefined
        ? ""
        : "?ward_title=" + this.wardSelectedName;
    // window.open('http://internaldashboard.solveninja.org:4000/public/dashboard/07b9f145-5be8-4206-942e-7251e15791d9' + tempParm);
    this.formButtonClickEvent(
      "Menu",
      "Links_Button",
      "NeighbourhoodAnalytics",
      "Links_Button"
    );
    window.open("https://ee.kobotoolbox.org/x/MABCXQRa");
  }

  closeForum(type) {
    if (type == "Forum") {
      this.ShowForum = false;
    } else {
      this.ShowAnalytics = false;
    }
  }

  public wardSelected;
  public wardSelectedName;
  public wardSelectedNameForForum;
  WardSelectedEvent(event) {
    if (event.value != undefined) {
      this.dataService.zoom = 17;
      this.wardSelected = event.value.wardId;
      this.wardSelectedName = event.value.name;
      if (event.value.name.includes(" ")) {
        this.wardSelectedNameForForum = event.value.name;
        this.wardSelectedNameForForum = this.wardSelectedNameForForum.replace(
          / /g,
          "-"
        );
      } else {
        this.wardSelectedNameForForum = event.value.name;
      }
    } else {
      this.dataService.zoom = 10;
      this.wardSelected = undefined;
      this.wardSelectedName = undefined;
      this.wardSelectedNameForForum = undefined;
    }
    this.NewObj.cityId = this.dataService.SelectCityID;
    this.wardSelected == undefined ? 0 : this.wardSelected;
    this.NewObj.wardId = Number(this.wardSelected);
    this.dataService.wardSelectedID = this.wardSelected;
    this.NewObj.latitude = Number(this.dataService.SelectedCityLat);
    this.NewObj.longitude = Number(this.dataService.SelectedCityLng);
    this.CollectionsData(this.NewObj);
    var obj = {
      lat: Number(event.value.lat),
      lng: Number(event.value.lng),
    };
    var arr = [];
    arr.push(obj);
    this.mapData = [];
    this.mapData = arr;
    this.dataService.SelectedCityLat = Number(event.value.lat);
    this.dataService.SelectedCityLng = Number(event.value.lng);
    this.formButtonClickEvent(
      "Ward_Select",
      "Menu",
      "Ward_Menu",
      "City_Select"
    );
  }
  public NewObj = {
    level: this.dataService.zoom,
    cityId: this.SelectedCity,
    wardId: 0,
    menuData: [],
    latitude: 0,
    longitude: 0,
  };
  MenuMultiSelect(event, MenuID) {
    this.NewObj.level = this.dataService.zoom;
    this.NewObj.cityId = this.SelectedCity;
    this.wardSelected == undefined ? 0 : this.wardSelected;
    this.NewObj.wardId = this.wardSelected;
    var includes = false;
    var MenuIndex = 0;
    for (
      var tempMenSer = 0;
      tempMenSer < this.NewObj.menuData.length;
      tempMenSer++
    ) {
      if (MenuID == this.NewObj.menuData[tempMenSer].menuId) {
        includes = true;
        MenuIndex = tempMenSer;
        break;
      } else {
        includes = false;
      }
    }
    if (includes == false) {
      var TempSubMenuId = "";
      for (let subMen = 0; subMen < event.value.length; subMen++) {
        if (TempSubMenuId == "") {
          TempSubMenuId = event.value[subMen].submenuId;
          TempSubMenuId = TempSubMenuId.toString();
        } else {
          TempSubMenuId = TempSubMenuId + "," + event.value[subMen].submenuId;
        }
      }
      var menuSelected = {
        menuId: MenuID,
        submenus: TempSubMenuId,
      };
      this.NewObj.menuData.push(menuSelected);
    } else {
      var TempSubMenuId = "";
      for (let subMen = 0; subMen < event.value.length; subMen++) {
        if (TempSubMenuId == "") {
          TempSubMenuId = event.value[subMen].submenuId;
          TempSubMenuId = TempSubMenuId.toString();
        } else {
          TempSubMenuId = TempSubMenuId + "," + event.value[subMen].submenuId;
        }
      }
      this.NewObj.menuData[MenuIndex].submenus = TempSubMenuId;
    }
    this.CollectionsData(this.NewObj);
  }

  // It will change for Each drag on map
  public ServiceRequest = null;
  googleData = [];
  CollectionsData(obj) {
    console.log(this.dataService.topLeft);
    if (
      this.dataService.topLeft.lat != this.dataService.bottomRight.lat &&
      this.dataService.topLeft.lng != this.dataService.bottomRight.lng
    ) {
      this.ServiceRequest ? this.ServiceRequest.unsubscribe() : null;
      this.ServiceRequest = this.dataService
        .CollectionsDataES(obj)
        .subscribe((data) => {
          let resMap: any = data;
          let newData = resMap.data.map((val) => {
            val["number"] = val.data;
            delete val["data"];
            return val;
          });
          // this.mapData = resMap.data;
          this.mapData = newData;
          // console.log(this.mapData);
          this.getCountBased_On_Location(obj);
        });
    }
  }

  call_CollectionsDataService() {
    this.subscriptionWithCord = this.commonService.getCord().subscribe(
      (cordnates) => {
        this.NewObj.level = this.dataService.zoom;
        this.NewObj.latitude = cordnates.data.lat;
        this.NewObj.longitude = cordnates.data.lng;

        this.dragchanges.push(this.NewObj);
        setTimeout(() => {
          // console.log("start");
          // console.log(this.dragchanges[this.dragchanges.length - 1]);
          this.CollectionsData(this.NewObj);
        }, 5000);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  SingleSelectMenuDropDown(event, MenuID) {
    var includes = false;
    var MenuIndex = 0;
    for (
      var tempMenSer = 0;
      tempMenSer < this.NewObj.menuData.length;
      tempMenSer++
    ) {
      if (MenuID == this.NewObj.menuData[tempMenSer].menuId) {
        includes = true;
        MenuIndex = tempMenSer;
        break;
      } else {
        includes = false;
      }
    }
    if (includes == false) {
      var menuSelected = {
        menuId: MenuID,
        submenus: event.target.value,
      };
      this.NewObj.menuData.push(menuSelected);
    } else {
      this.NewObj.menuData[MenuIndex].submenus = event.target.value;
    }
  }

  MenuRadioSelect(event, MenuName, MenuID) {
    var includes = false;
    var MenuIndex = 0;
    for (
      var tempMenSer = 0;
      tempMenSer < this.NewObj.menuData.length;
      tempMenSer++
    ) {
      if (MenuID == this.NewObj.menuData[tempMenSer].menuId) {
        includes = true;
        MenuIndex = tempMenSer;
        break;
      } else {
        includes = false;
      }
    }
    if (includes == false) {
      var menuSelected = {
        menuId: MenuID,
        submenus: event.target.value,
      };
      this.NewObj.menuData.push(menuSelected);
    } else {
      this.NewObj.menuData[MenuIndex].submenus = event.target.value;
    }
  }

  SubscribeToInsights() {
    window.open(
      "http://discourse.solveninja.org:5000/view/#!/forms/5e624910d3afc996a4edffc1"
    );
    this.formButtonClickEvent(
      "SubscribeToInsights_Click",
      "Links",
      "Menu",
      "button_click"
    );
  }
  NeighbourhoodData() {
    // window.open('../assets/html/NDData.html');
    this.formButtonClickEvent(
      "NeighbourhoodData_Click",
      "Links_Button",
      "Menu",
      "button_click"
    );
    window.open("https://ee.kobotoolbox.org/x/#4v5Ilf7D");
  }
  FeedBack() {
    this.formButtonClickEvent(
      "FeedBack_Click",
      "Links",
      "Menu",
      "button_click"
    );
    window.open("https://forms.gle/bSJpGUsm4sFGE3EW6");
  }

  toVolunteer() {
    this.formButtonClickEvent(
      "Volunteer_Click",
      "Links",
      "Menu",
      "button_click"
    );
    window.open("https://forms.gle/vwYaFt7SFS8fMAT48");
  }

  formButtonClickEvent(eventName, eventCategory, eventLabel, eventAction) {
    this.googleAnalyticsService.eventEmitter(
      eventName,
      eventCategory,
      eventLabel,
      eventAction
    );
  }

  NeighbourhoodMultilingulSelfAssessment() {
    this.formButtonClickEvent(
      "Menu",
      "Links_Button",
      "NeighbourhoodForum",
      "Links_Button"
    );
    window.open("https://covidselfcheck.app/");
  }

  markerListClick(markerList) {
    this.dataService.SelectedCityLat = Number(markerList.lat);
    this.dataService.SelectedCityLng = Number(markerList.lng);
  }

  // Ra Custom Code
  // Default Categories Seletion Value
  // defaultCategoriesSelect = 92;
  defaultCategoriesSelect = [93, 117, 125];
  // Do Some Preselect If OrName is there
  defaultSelect_for_orgname = [
    146,
    143,
    145,
    144,
    118,
    123,
    135,
    142,
    141,
    140,
    119,
    134,
    136,
    132,
    139,
    122,
  ];
  defaultSelectTrigger() {
    this.resetAllSelection();
    let temp =
      this.orgListModel != ""
        ? this.defaultSelect_for_orgname
        : this.defaultCategoriesSelect;
    // setTimeout(() => {
    this.MenuItems &&
      this.MenuItems.forEach((items) => {
        items[0]["internalChildren"].forEach((child) => {
          if (temp.indexOf(child.value) != -1) {
            this.singleselect(child, items);
          }
        });
      });
    // }, 2000);
  }

  yourCurrentLocation() {
    // // setDefault select

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.dataService.SelectedCityLat = position.coords.latitude;
        this.dataService.SelectedCityLng = position.coords.longitude;
        this.SelectCity({
          value: {
            zoom: 13,
            cityName: "Your Location Location",
            lat: this.dataService.SelectedCityLat,
            lng: this.dataService.SelectedCityLng,
          },
        });
        console.log(this.dataService.SelectedCityLat);
        console.log(this.dataService.SelectedCityLng);
      });
    }

    // this.SelectCity({
    //   "value": {
    //     "id": "1",
    //     "cityName": "Bangalore Urban",
    //     "lat": "12.9796734",
    //     "lng": "77.5890556"
    //   }
    // });
    setTimeout(() => {
      console.log(this.cities);
      // this.CitySelected = this.cities[0];
    }, 10);
  }
  singleselect(child, items) {
    child.internalChecked = !child.internalChecked;
    let temp = [];
    items[0]["internalChildren"].forEach((element) => {
      if (element.internalChecked == true) {
        temp.push(element.value);
      }
    });
    this.TreeMenuItemsSelect(temp, items);
  }
  selectAll(items) {
    let temp = [];
    items[0]["internalChildren"].forEach((element) => {
      element.internalChecked = true;
      temp.push(element.value);
    });
    this.TreeMenuItemsSelect(temp, items);
  }
  deselectAll(items) {
    items[0]["internalChildren"].forEach((element) => {
      element.internalChecked = false;
    });
    this.TreeMenuItemsSelect([], items);
  }

  /**
   * Get count of subcategories count
   * @param items
   */
  getcounterCount(items) {
    let temp = 0;
    items &&
      items[0] &&
      items[0]["internalChildren"].forEach((element) => {
        element.internalChecked ? (temp = temp + 1) : temp;
      });
    return temp;
  }

  /**
   * Reset All Selected Options from Tree
   */
  resetAllSelection() {
    this.MenuItems &&
      this.MenuItems.forEach((ele) => {
        ele[0]["internalChildren"].forEach((element) => {
          element.internalChecked = false;
        });
      });
    this.NewObj["menuData"] = [];
  }

  /**
   * On Click "Want Medical Help?"
   */
  homepageButton1() {
    this.resetAllSelection();
    var value = 92;
    this.MenuItems.forEach((ele) => {
      let temp = [];
      if (ele[0]["value"] == value) {
        ele[0] &&
          ele[0]["internalChildren"].forEach((child) => {
            child.internalChecked = true;
            temp.push(child.value);
          });
        setTimeout(() => {
          this.TreeMenuItemsSelect(temp, ele);
          this.defaultpage = "LocalData";
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
          }, 1);
          this.searchLocation = false;
        }, 50);
      } else {
        ele[0] &&
          ele[0]["internalChildren"].forEach((child) => {
            child.internalChecked = false;
          });
      }
    });
  }
  /**
   * On Click "Want to help needy?"
   */
  homepageButton2() {
    this.resetAllSelection();
    var value = 101; // People Needy Help
    var value1 = 130; // settlement
    this.MenuItems.forEach((ele) => {
      let temp = [];
      if (ele[0]["value"] == value) {
        ele[0] &&
          ele[0]["internalChildren"].forEach((child) => {
            child.internalChecked = true;
            temp.push(child.value);
          });
        setTimeout(() => {
          this.TreeMenuItemsSelect(temp, ele);
        }, 50);
      } else {
        if (ele[0]["value"] == value1) {
          ele[0] &&
            ele[0]["internalChildren"].forEach((child) => {
              child.internalChecked = true;
              temp.push(child.value);
            });
          setTimeout(() => {
            this.TreeMenuItemsSelect(temp, ele);
          });
        } else {
          ele[0] &&
            ele[0]["internalChildren"].forEach((child) => {
              child.internalChecked = false;
            });
        }
      }

      this.defaultpage = "LocalData";
      this.searchLocation = false;
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 1);
    });
  }

  /**
   * On clikc "Want to know where you can get help?"
   */
  homepageButton3() {
    this.resetAllSelection();
    var value = 121; // Volunteers near me
    var value1 = 112; // Shops near me
    var value2 = 97; // Shops near me

    this.MenuItems.forEach((ele) => {
      let temp = [];
      if (ele[0]["value"] == value) {
        ele[0] &&
          ele[0]["internalChildren"].forEach((child) => {
            child.internalChecked = true;
            temp.push(child.value);
          });
        setTimeout(() => {
          this.TreeMenuItemsSelect(temp, ele);
        });
      } else {
        if (ele[0]["value"] == value1) {
          ele[0] &&
            ele[0]["internalChildren"].forEach((child) => {
              child.internalChecked = true;
              temp.push(child.value);
            });
          setTimeout(() => {
            this.TreeMenuItemsSelect(temp, ele);
          });
        } else {
          if (ele[0]["value"] == value2) {
            ele[0] &&
              ele[0]["internalChildren"].forEach((child) => {
                child.internalChecked = true;
                temp.push(child.value);
              });
            setTimeout(() => {
              this.TreeMenuItemsSelect(temp, ele);
            });
          } else {
            ele[0] &&
              ele[0]["internalChildren"].forEach((child) => {
                child.internalChecked = false;
              });
          }
        }
      }

      this.defaultpage = "LocalData";
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 1);
      this.searchLocation = false;
    });
  }

  /**
   * On Lick Categories on Mobile view -- Home Page
   * @param value
   */
  homeDirect(value) {
    this.resetAllSelection();
    console.log(value);
    this.MenuItems.forEach((ele) => {
      let temp = [];
      if (ele[0]["value"] == value) {
        ele[0] &&
          ele[0]["internalChildren"].forEach((child) => {
            child.internalChecked = true;
            temp.push(child.value);
          });
        this.TreeMenuItemsSelect(temp, ele);
        this.defaultpage = "LocalData";
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 1);
        this.searchLocation = false;
      } else {
        ele[0] &&
          ele[0]["internalChildren"].forEach((child) => {
            child.internalChecked = false;
          });
      }
    });
  }

  /**
   * On Click LocalData Menu on Mobile View
   */
  pageLocaLData() {
    this.resetAllSelection();
    this.defaultSelectTrigger();
    this.defaultpage = "LocalData";
    this.searchLocation = true;
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1);
  }

  /**
   * On click Legends
   */
  legentsCLick(menuID) {
    if (menuID) {
      this.resetAllSelection();
      this.MenuItems.forEach((ele) => {
        ele[0] &&
          ele[0]["internalChildren"].forEach((child) => {
            if (child.value == menuID) {
              child.internalChecked = true;
              this.TreeMenuItemsSelect([child.value], ele);
              this.detail_legends_collapse = true;
            }
          });
      });
    }
  }

  tempListData = [
    {
      wardName: "Jaya Nagar",
      total: 1,
      lng: 77.588648,
      cityName: "bengaluru",
      icon: "./assets/Icons/coronavirus-testingcentre.png",
      menuId: 93,
      id: 7616,
      type: "12",
      lat: 12.937328,

      name: "Neuberg Anand Reference Laboratory",
      address:
        "Aanand Tower, 54, Bowring Hospital Rd, Shivajinagar`, Bengaluru, Karnataka 560001",
      category: "Important Medical Services",
      phoneNum: "1800 425 1974",
      isFlagged: "0",
    },
  ];

  /**
   * Zoom To selected Ocation place
   */

  @ViewChild("mapref") mapref;
  zoomToPlace(item, i) {
    // if (this.mapref && this.mapref.mapcomref) {
    //   this.mapref.mapcomref.select_marker(item);
    // }
  }

  /**
   * get Overall Counts
   * With 4  Lat and lng
   * topLeftLat --- topLeftLon --- bottomRightLat --- bottomRightLon --- latitude --- longitude
   */
  overAll_Rec_serviceReqcount = 0;
  getoverrallrectangleCounts_unsubscribe = null;
  getoverrallrectangleCountData = [];

  right_Resources_Array = [126, 98, 99, 138];
  right_Resources_Count = 0;

  right_Volunteers_Array = [126, 98, 99, 138];
  right_Volunteers_Count = 0;

  right_Peopleneedingsupport_Array = [136, 140, 132, 118, 123, 143, 101];
  right_Peopleneedingsupport_Count = 0;

  right_Peoplesupported_Array = [134, 135, 141, 142, 145, 146];
  right_Peoplesupported_Count = 0;

  getoverrallrectangleCounts() {
    let tempData = [];
    this.MenuItems &&
      this.MenuItems.map((items) => {
        // if (items[0].value == '120' || items[0].value == '101') {
        items[0] &&
          items[0]["internalChildren"].forEach((element) => {
            tempData.push(element.value);
          });
        // }
      });
    let tempObj = {
      menuData: [
        {
          submenus: tempData.join(),
        },
      ],
      topLeftLat: this.dataService.topLeft.lat,
      topLeftLon: this.dataService.topLeft.lng,
      bottomRightLat: this.dataService.bottomRight.lat,
      bottomRightLon: this.dataService.bottomRight.lng,
      latitude: this.dataService.bottomRight.lat,
      longitude: this.dataService.bottomRight.lng,
    };
    // console.log(tempObj);
    this.getoverrallrectangleCounts_unsubscribe
      ? this.getoverrallrectangleCounts_unsubscribe.unsubscribe()
      : null;
    this.getoverrallrectangleCounts_unsubscribe = this.dataService
      .getCategoryImpactsDataES(tempObj, true)
      .subscribe(
        (res) => {
          console.log(res["data"]);
          this.overAll_Rec_serviceReqcount = 0;

          if (res && res["data"].length) {
            var responseData = res["data"];
            this.MenuItems.forEach((menu) => {
              let overall_rec_count_total = 0;
              menu[0]["internalChildren"].forEach((element) => {
                let overall_rec_count = responseData.filter((val) => {
                  if (val.menuData.toString() == element.value.toString()) {
                    return val;
                  }
                });
                if (overall_rec_count[0]) {
                  element["overall_rec_count"] = overall_rec_count[0]["impact"];
                  overall_rec_count_total =
                    overall_rec_count_total +
                    parseInt(overall_rec_count[0]["impact"]);
                }
              });
              menu[0]["overall_rec_count_total"] = overall_rec_count_total;
            });
            console.log("With Bounding impats: overall_rec_count_total");
            console.log(this.MenuItems);

            /**
             * Setting Counts for Right Side Section
             */
            this.right_Resources_Count = 0;
            this.right_Volunteers_Count = 0;
            this.right_Peopleneedingsupport_Count = 0;
            this.right_Peoplesupported_Count = 0;

            this.MenuItems.forEach((menu) => {
              menu[0]["internalChildren"].forEach((val) => {
                if (this.right_Resources_Array.indexOf(val.value) !== -1) {
                  this.right_Resources_Count =
                    this.right_Resources_Count + val.overall_rec_count;
                }
                if (this.right_Volunteers_Array.indexOf(val.value) !== -1) {
                  this.right_Volunteers_Count =
                    this.right_Volunteers_Count + val.overall_rec_count;
                }
                if (
                  this.right_Peopleneedingsupport_Array.indexOf(val.value) !==
                  -1
                ) {
                  this.right_Peopleneedingsupport_Count =
                    this.right_Peopleneedingsupport_Count +
                    val.overall_rec_count;
                }
                if (
                  this.right_Peoplesupported_Array.indexOf(val.value) !== -1
                ) {
                  this.right_Peoplesupported_Count =
                    this.right_Peoplesupported_Count + val.overall_rec_count;
                }
              });
            });
            console.log(
              "right_Resources_Count : " + this.right_Resources_Count
            );
            console.log(
              "right_Volunteers_Count : " + this.right_Volunteers_Count
            );
            console.log(
              "right_Peopleneedingsupport_Count : " +
                this.right_Peopleneedingsupport_Count
            );
            console.log(
              "right_Peoplesupported_Count : " +
                this.right_Peoplesupported_Count
            );

            this.getoverrallrectangleCountData = responseData;
          }
        },
        (err) => {
          if (this.overAll_Rec_serviceReqcount < 2) {
            this.overAll_Rec_serviceReqcount =
              this.overAll_Rec_serviceReqcount + 1;
            this.getoverrallrectangleCounts();
          }
          console.log(err);
        },
        () => {
          console.log("Completed");
        }
      );
  }

  overAll_Rec_serviceReqcount_without = 0;
  getoverrallrectangleCounts_unsubscribe_without = null;
  getoverrallrectangleCountData_with = [];

  People_needing_support_Array = [136, 140, 132, 118, 123, 143, 101];
  People_needing_support = 0;

  People_supported_Array = [134, 135, 141, 142, 145, 146];
  People_supported = 0;
  getoverrallrectangleCounts_without() {
    let tempData = [];
    this.MenuItems &&
      this.MenuItems.map((items) => {
        // if (items[0].value == '120' || items[0].value == '101') {
        items[0] &&
          items[0]["internalChildren"].forEach((element) => {
            tempData.push(element.value);
          });
        // }
      });
    let tempObj = {
      menuData: [
        {
          submenus: tempData.join(),
        },
      ],
      topLeftLat: this.dataService.topLeft.lat,
      topLeftLon: this.dataService.topLeft.lng,
      bottomRightLat: this.dataService.bottomRight.lat,
      bottomRightLon: this.dataService.bottomRight.lng,
      latitude: this.dataService.bottomRight.lat,
      longitude: this.dataService.bottomRight.lng,
    };
    // console.log(tempObj);
    this.getoverrallrectangleCounts_unsubscribe_without
      ? this.getoverrallrectangleCounts_unsubscribe_without.unsubscribe()
      : null;
    this.getoverrallrectangleCounts_unsubscribe_without = this.dataService
      .getCategoryImpactsDataES(tempObj, false)
      .subscribe(
        (res) => {
          console.log(res["data"]);
          this.overAll_Rec_serviceReqcount_without = 0;
          if (res && res["data"].length) {
            var responseData = res["data"];
            this.MenuItems.forEach((menu) => {
              let overall_rec_count_without_total = 0;
              menu[0]["internalChildren"].forEach((element) => {
                let overall_rec_count_without = responseData.filter((val) => {
                  if (val.menuData.toString() == element.value.toString()) {
                    return val;
                  }
                });
                if (overall_rec_count_without[0]) {
                  element["overall_rec_count_without"] =
                    overall_rec_count_without[0]["impact"];
                  overall_rec_count_without_total =
                    overall_rec_count_without_total +
                    parseInt(overall_rec_count_without[0]["impact"]);
                }
              });
              menu[0][
                "overall_rec_count_without_total"
              ] = overall_rec_count_without_total;
            });

            console.log(
              "With Bounding impats: overall_rec_count_without_total"
            );
            console.log(this.MenuItems);
            console.log(this.MenuItems[1][0]["internalChildren"]);

            /**
             * Setting count Without bounding boxes
             * People_needing_support
             */
            this.People_needing_support = 0;
            this.People_supported = 0;
            this.MenuItems[1][0]["internalChildren"].forEach((val) => {
              if (this.People_needing_support_Array.indexOf(val.value) !== -1) {
                this.People_needing_support =
                  this.People_needing_support + val.overall_rec_count_without;
              }
              if (this.People_supported_Array.indexOf(val.value) !== -1) {
                this.People_supported =
                  this.People_supported + val.overall_rec_count_without;
              }
            });
            console.log(
              "People_needing_support: " + this.People_needing_support
            );
            console.log("People_supported:" + this.People_supported);

            this.getoverrallrectangleCountData_with = responseData;
          }
        },
        (err) => {
          if (this.overAll_Rec_serviceReqcount_without < 2) {
            this.overAll_Rec_serviceReqcount_without =
              this.overAll_Rec_serviceReqcount_without + 1;
            this.getoverrallrectangleCounts_without();
          }
          console.log(err);
        },
        () => {
          console.log("Completed");
        }
      );
  }

  /**
   * get Overall Counts
   * No Lat and lng
   */
  overAll_serviceReqcount = 0;
  getoverrallCounts_unsubscribe = null;
  getoverrallCounts() {
    let tempData = [];
    this.MenuItems &&
      this.MenuItems.map((items) => {
        items[0] &&
          items[0]["internalChildren"].forEach((element) => {
            tempData.push(element.value);
          });
      });
    let tempObj = {
      menuData: [
        {
          submenus: tempData.join(),
        },
      ],
    };
    this.getoverrallCounts_unsubscribe
      ? this.getoverrallCounts_unsubscribe.unsubscribe()
      : null;
    this.getoverrallCounts_unsubscribe = this.dataService
      .getCountAllDataES(tempObj)
      .subscribe(
        (res) => {
          console.log(res["data"]);
          this.overAll_serviceReqcount = 0;
          if (res && res["data"].length) {
            var responseData = res["data"];
            this.MenuItems.forEach((menu) => {
              let overallcount_total = 0;
              menu[0]["internalChildren"].forEach((element) => {
                let overallcount = responseData.filter((val) => {
                  if (val.menuData.toString() == element.value.toString()) {
                    return val;
                  }
                });
                element["overallcount"] = overallcount[0]["count"];
                overallcount_total =
                  overallcount_total + parseInt(overallcount[0]["count"]);
              });
              menu[0]["overallcount_total"] = overallcount_total;
            });
            console.log(this.MenuItems);
          }
        },
        (err) => {
          if (this.overAll_serviceReqcount < 2) {
            this.overAll_serviceReqcount = this.overAll_serviceReqcount + 1;
            this.getoverrallCounts();
          }
          console.log(err);
        },
        () => {
          console.log("Completed");
        }
      );
  }

  /**
   * get Counts Based On Location
   * with Current "Lat and Lng"
   * call getoverrallCounts()
   * call getoverrallrectangleCounts()
   */
  CountsListArray = [];
  serviceCallAlCount = null;
  lat_ln_serviceReqcount = 0;
  getCountBased_On_Location_unsubscribe = null;
  getoverrallCountser_call = 0;
  detail_list_number = 100;
  getCountBased_On_Location(obj?: any) {
    // console.log(obj);
    if (obj && obj["latitude"] && obj["longitude"]) {
      this.NewObj.latitude = obj["latitude"];
      this.NewObj.longitude = obj["longitude"];
    } else {
      this.subscriptionWithCord = this.commonService
        .getCord()
        .subscribe((cordnates) => {
          this.NewObj.level = this.dataService.zoom;
          this.NewObj.latitude = cordnates.data.lat;
          this.NewObj.longitude = cordnates.data.lng;
        });
    }

    if (this.getoverrallCountser_call == 0) {
      this.getoverrallCounts();
      this.getoverrallCountser_call = 1;
    }
    setTimeout(() => {
      // Time to get Boundiries , dut to map loading slow
      this.getoverrallrectangleCounts();
      this.getoverrallrectangleCounts_without(); // with Bounding
    }, 500);

    let tempData = [];
    this.MenuItems &&
      this.MenuItems.map((items) => {
        items[0] &&
          items[0]["internalChildren"].forEach((element) => {
            tempData.push(element.value);
          });
      });

    if (tempData.length) {
      let tempObj = {
        menuData: [
          {
            submenus: tempData.join(),
          },
        ],
        latitude: this.NewObj.latitude,
        longitude: this.NewObj.longitude,
      };
      // console.log(tempObj);
      this.getCountBased_On_Location_unsubscribe
        ? this.getCountBased_On_Location_unsubscribe.unsubscribe()
        : null;
      this.getCountBased_On_Location_unsubscribe = this.dataService
        .getCountDataES(tempObj)
        .subscribe(
          (res) => {
            this.lat_ln_serviceReqcount = 0;
            this.detail_list_number = 100;
            // console.log(res);
            if (res && res["data"].length) {
              this.CountsListArray = res["data"];
              this.MenuItems.forEach((menu) => {
                menu[0]["internalChildren"].forEach((element) => {
                  let count = this.CountsListArray.filter((val) => {
                    if (val.menuData.toString() == element.value.toString()) {
                      return val;
                    }
                  });
                  element["count"] = count[0]["count"];
                });
              });
            }
          },
          (err) => {
            if (this.lat_ln_serviceReqcount < 2) {
              this.lat_ln_serviceReqcount = this.lat_ln_serviceReqcount + 1;
              this.getCountBased_On_Location();
            }
            console.log(err);
          },
          () => {
            // console.log("Completed");
          }
        );
    }
  }

  /**
   * Get Org List
   * Creaters List
   */
  orgsListArray = [];
  orgListModel = "";
  getOrgList() {
    this.dataService.getOrgsList().subscribe(
      (res) => {
        if (res["success"] == true) {
          this.orgsListArray = res["data"] || [];
          console.log(this.orgsListArray);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("Completed");
      }
    );
  }
  changeOrgList(event) {
    // window.open("/map/" + this.orgListModel, "_self");
    history.pushState({}, null, "/map/" + this.orgListModel.replace(/ /g, "-"));
    this.getUrlParameters();

    if (this.defaultpage != "LocalData") {
      this.pageLocaLData();
    }
  }

  /**
   * Get URL Parameters to find current URL we are in
   */
  getUrlParameters() {
    if (window.location.pathname.indexOf("/map/") == 0) {
      var orgname = window.location.pathname
        .split("/")
        .filter((val) => (val != "" ? true : false));
      // setting OrgName in service
      this.commonService.setorgname(
        orgname[1]
          ? orgname[1].replace(/(%20)/g, " ").replace(/(-)/g, " ").trim()
          : ""
      );
      this.orgListModel = orgname[1]
        ? orgname[1].replace(/(%20)/g, " ").replace(/(-)/g, " ").trim()
        : "";
      console.log(this.orgListModel);
    } else {
      this.commonService.setorgname("");
    }
    console.log(this.orgListModel);
  }

  /**
   * Get Logged In Usre Info
   * userName:string and Roles[]
   */
  userName = "";
  userRole = [];
  activeRole = [];
  userData = {};
  LoginUserInfo() {
    this.dataService.getUserInfo().subscribe(
      (res) => {
        console.log(res);
        if (res["data"] && res["data"]) {
          console.log(res["data"]);
          this.userData = res["data"];
          this.userName = res["data"]["username"];
          this.userRole =
            (res["data"]["userrole"] && res["data"]["userrole"]["roles"]) || [];
          if (window.localStorage.getItem("page")) {
            window.localStorage.setItem("page", this.defaultpage);
          }
          if (this.userRole.length) {
            this.activeRole = this.userRole;
          }

          this.commonService.setusername(this.userName);
          this.commonService.setUserrole(this.userRole);
          this.commonService.setUserData(this.userData);

          console.log({
            userName: this.userName,
            userRole: this.userRole,
          });

          setTimeout(() => {
            if (this.userName || this.orgListModel) {
              // Shoing Map Page
              this.pageLocaLData();
            }
          }, 500);

          // Get All givenList
          this.getUserAssignedList();
        }
      },
      (err) => {
        // If not Logged In Keylok send error So
        setTimeout(() => {
          if (this.userName || this.orgListModel) {
            // Shoing Map Page
            this.pageLocaLData();
          }
        }, 500);
      },
      () => {
        console.log("User Info!");
      }
    );
  }
  userLogin() {
    window.localStorage.setItem("page", this.defaultpage);
    window.location.replace("/home");
  }
  LogoutMe() {
    window.location.replace("/logout");
    this.userName = "";
    this.userRole = [];
    this.activeRole = [];
    this.commonService.setusername("");
    this.commonService.setUserrole([]);
  }

  /**
   * Get Given List
   */
  user_given_list = [];
  user_given_listArray = [];
  getUserAssignedList() {
    this.GettotalClosedAsignment();
    this.getAllassignedList();

    var obj = {
      username: this.userName,
    };
    this.dataService.getUserAssignedList(obj).subscribe(
      (res) => {
        console.log(res);
        if (res && res["status"] == "success") {
          this.user_given_list = res["data"];
          this.user_given_listArray = this.user_given_list.map((val) => {
            return val["place_org_id"];
          });
          console.log(this.user_given_listArray);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("getGiven completed");
      }
    );
  }

  /**
   * Save user Info for
   * start asigning User
   */
  validateMobileNumber(number, item) {
    if (parseInt(number) != NaN && number.toString().length < 13) {
      this.startAssignMe(this.user_Assign_Type, this.user_Assign_data, number);
      item["numberPopup"] = false;
    } else {
      alert("Enter valied Number");
    }
  }

  food_ration_asked = [118, 136]; //Assign Me
  food_ration_assigned = [123, 132]; //Assign Me

  user_Assign_Type;
  user_Assign_data;

  assignme(type, data) {
    data["numberPopup"] = true;
    this.user_Assign_Type = type;
    this.user_Assign_data = data;
  }

  startAssignMe(type, data, number) {
    this.loaderAction = true;
    console.log({
      type: type,
      data: data,
      username: this.userName,
      userrole: this.userRole,
      userdata: this.userData,
      number: number,
    });
    let obj = {
      type: type,
      data: data,
      username: this.userName,
      userrole: this.userRole,
      userdata: this.userData,
      number: number,
    };
    this.dataService.assignme(obj).subscribe(
      (res) => {
        console.log(res);
        if (res && res["assigned"] == true) {
          alert("Sorry Already action taken by someone.");
        } else if (res && res["status"] == "success") {
          // Get All givenList
          alert("Assigned successfully");
          // updte ES DB
          this.dataService.updateESRecord(
            {
              place_org_id: res["data"]["place_org_id"],
              closed_by: this.userName,
              place_org_subcategory: res["data"]["place_org_subcategory"],
            },
            "assigned"
          );

          this.getUserAssignedList();
        } else {
          alert(res["message"]);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.loaderAction = false;
        console.log("Service completed");
      }
    );
  }

  /**
   * Close Action
   * @param type
   * @param data
   */
  givenbyme(type, data) {
    this.loaderAction = true;
    console.log({
      type: type,
      data: data,
      username: this.userName,
      userrole: this.userRole,
      userdata: this.userData,
    });
    let obj = {
      type: type,
      data: data,
      username: this.userName,
      userrole: this.userRole,
      userdata: this.userData,
    };
    this.dataService.givenbyme(obj).subscribe(
      (res) => {
        console.log(res);
        if (res && res["status"] == "success") {
          alert("Data saved successfuly");

          // updte ES DB
          this.dataService.updateESRecord({
            place_org_id: res["data"]["place_org_id"],
            closed_by: this.userName,
            place_org_subcategory: res["data"]["place_org_subcategory"],
          });

          this.getUserAssignedList();
        } else {
          alert(res["message"]);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.loaderAction = false;
        console.log("Service completed");
      }
    );
  }

  /**
   * Get All Assigned User
   */
  allAssignedList = [];
  getAllassignedList() {
    this.loaderAction = true;
    console.log({
      username: this.userName,
      userrole: this.userRole,
    });
    let obj = {
      username: this.userName,
      userrole: this.userRole,
    };
    this.dataService.getAllassignedList(obj).subscribe(
      (res) => {
        console.log(res);
        if (res && res["status"] == "success") {
          this.allAssignedList = res["data"].map((val) => {
            return val["place_org_id"];
          });
          console.log(this.allAssignedList);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.loaderAction = false;
        console.log("Service completed");
      }
    );
  }

  /**
   * Get total Closed Asignment based on User
   */
  total_cosed_Asss = 0;
  GettotalClosedAsignment() {
    console.log({
      username: this.userName,
      userrole: this.userRole,
    });
    let obj = {
      username: this.userName,
      userrole: this.userRole,
    };
    this.dataService.GettotalClosedAsignmentUser(obj).subscribe(
      (res) => {
        console.log(res);
        if (res && res["status"] == "success") {
          this.total_cosed_Asss = res["data"].length;
          console.log(this.allAssignedList);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.loaderAction = false;
        console.log("Service completed");
      }
    );
  }
}

@Pipe({
  name: "filterUnique",
  pure: false,
})
export class FilterPipe {
  transform(value: any, args?: any): any {
    var finalData = [];
    var finalKeys = [];
    value.forEach((val) => {
      if (finalKeys.indexOf(val.menuId) == -1) {
        finalKeys.push(val.menuId);
        finalData.push({
          menuId: val["menuId"],
          icon: val["icon"] || "",
          category: val["category"] || "",
          subcategory: val["subcategory"] || "",
          count: 0,
        });
      } else {
        // finalData.forEach(v=>{
        //   if (v.menuId == val.menuId){
        //     v['count'] = v['count'] + 1;
        //     v['category'] = v['category'] || '';
        //     v['subcategory'] = v['subcategory'] || '';
        //   }
        // })
      }
    });
    return finalData;
  }
}
@Pipe({
  name: "inputsearch",
  pure: false,
})
export class InputsearchPipe {
  transform(value: any, args?: any): any {
    var finalData = [];
    if (args != "") {
      finalData = value.filter((val, index) => {
        if (
          (val["name"] != undefined ? val["name"].toLowerCase() : "").indexOf(
            args.toLowerCase()
          ) != -1 ||
          (val["address"] != undefined
            ? val["address"].toLowerCase()
            : ""
          ).indexOf(args.toLowerCase()) != -1 ||
          (val["category"] != undefined
            ? val["category"].toLowerCase()
            : ""
          ).indexOf(args.toLowerCase()) != -1 ||
          (val["subcategory"] != undefined
            ? val["subcategory"].toLowerCase()
            : ""
          ).indexOf(args.toLowerCase()) != -1 ||
          (val["cityName"] != undefined
            ? val["cityName"].toLowerCase()
            : ""
          ).indexOf(args.toLowerCase()) != -1 ||
          (val["wardName"] != undefined
            ? val["wardName"].toLowerCase()
            : ""
          ).indexOf(args.toLowerCase()) != -1
        ) {
          val["index"] = index;
          return true;
        } else {
          val["index"] = index;
          return false;
        }
      });
    } else {
      finalData = value;
    }
    return finalData;
  }
}
@Pipe({
  name: "ratotalcounts",
  pure: false,
})
export class RaTotalCounts {
  transform(data: any, args?: any): any {
    // console.log(data);
    // console.log(args);

    if (args == "NGOTeam" && data && data.length) {
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i][0].value == 101) {
          data[i][0].internalChildren.forEach((val) => {
            if ([118, 136, 123, 132].indexOf(val.value) != -1) {
              count = count + val.overall_rec_count;
            }
          });
          break;
        }
      }
      return count ? `(${count.toString()})` : "";
    } else if (args == "NGOAdmin" && data && data.length) {
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i][0].value == 101) {
          // console.log(data[i][0]);
          data[i][0].internalChildren.forEach((val) => {
            if ([135, 134].indexOf(val.value) != -1) {
              count = count + val.overall_rec_count;
            }
          });
          break;
        }
      }
      return count ? `(${count.toString()})` : "";
    } else {
      return "";
    }
  }
}
