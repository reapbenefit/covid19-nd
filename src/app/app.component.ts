import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from './services/common.service';
import { ward } from './services/wards';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { GoogleAnalyticsService } from './services/google-analytics.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // @ViewChild('Governance') Governance: ElementRef;

  configMenu = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  MenuItems: TreeviewItem[];
  title = 'Neighbourhood';
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
  public categories = [{
    "id": 1,
    "value": 'Air',
    "ImgSrc": "./assets/Icons/Air.png",
    "checked": false
  }, {
    "id": 6,
    "value": 'Waste',
    "ImgSrc": "./assets/Icons/Waste.png",
    "checked": false
  }, {
    "id": 9,
    "value": 'Potholes',
    "ImgSrc": "./assets/Icons/Pothole.png",
    "checked": false
  }, {
    "id": 7,
    "value": 'Water',
    "ImgSrc": "./assets/Icons/Water.png",
    "checked": false
  }, {
    "id": 2,
    "value": 'Energy',
    "ImgSrc": "./assets/Icons/Energy.png",
    "checked": false
  }, {
    "id": 4,
    "value": 'Sanitation',
    "ImgSrc": "./assets/Icons/Sanitation.png",
    "checked": false
  }, {
    "id": 5,
    "value": 'Traffic',
    "ImgSrc": "./assets/Icons/Traffic.png",
    "checked": false
  }
    , {
    "id": 3,
    "value": 'Other',
    "ImgSrc": "./assets/Icons/Others.png",
    "checked": false
  }
  ];
  private AQMS = ['GOVT', 'RB'];
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

  constructor(private dataService: DataService,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private commonService: CommonService,
    private googleAnalyticsService: GoogleAnalyticsService) {
    this.subscription = this.commonService.getZoom().subscribe(message => {
      // this.getDashboardData(this.dataService.catType);
      this.NewObj.level = this.dataService.zoom;
      this.CollectionsData(this.NewObj);
    });
    this.subscriptionWithCord = this.commonService.getCord().subscribe(cordnates => {
      this.NewObj.latitude = cordnates.data.lat;
      this.NewObj.longitude = cordnates.data.lng;
      this.CollectionsData(this.NewObj);
    });
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
      "cityId": this.SelectedCity,
      "type": type,//{1:Campaign,2:Reports,5:Agencies,6:Governance,,7:DWCC,8:Toilet,9:AQM}
      "level": this.dataService.zoom,
      "category": catArr,
      "lat": this.dataService.centerLat,
      "lng": this.dataService.centerLng,
      "dashboardData": true
    }
    this.dataService.getCorrLocDetails(obj).subscribe(data => {
      console.log(data);
      let res: any = data;
      this.mapData = res.data;
    });
  }

  open(content, type) {
    let size
    if (type == 'cityData') {
      size = "sm";
    } else {
      size = "lg";
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
    this.formButtonClickEvent('Menu', 'Links', type, 'Link');
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
    (<HTMLInputElement>document.getElementById('DWCC')).checked = false;
    (<HTMLInputElement>document.getElementById('Toilet')).checked = false;
    (<HTMLInputElement>document.getElementById('Campaigns')).checked = false;
    (<HTMLInputElement>document.getElementById('AQMcheck')).checked = false;
    (<HTMLInputElement>document.getElementById('ICatagory')).checked = true;
    (<HTMLInputElement>document.getElementById('Governance')).checked = false;
    (<HTMLInputElement>document.getElementById('Agencies')).checked = false;
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
      "cityId": this.SelectedCity,
      "wardId": this.wardID,
      "category": catArr
    }
    this.dataService.SelIssCat = catArr;
    this.Type = 'Issues Categories';
    this.dataService.getReports(issObj).subscribe(data => {
      console.log(data);
      this.issueMapData = data;
      this.mapData = this.issueMapData.mapData;
      this.issGraph = data;
      this.mapData.forEach(element => {
        if (element.category == "Waste") {
          element.icon = './assets/Icons/Waste.png'
        } else if (element.category == "Pothole") {
          element.icon = './assets/Icons/Pothole.png'
        } else if (element.category == "Water") {
          element.icon = './assets/Icons/Water.png'
        } else if (element.category == "Energy") {
          element.icon = './assets/Icons/Energy.png'
        } else if (element.category == "Traffic") {
          element.icon = './assets/Icons/Traffic.png'
        } else if (element.category == "Sanitation") {
          element.icon = './assets/Icons/Sanitization.png'
        }
      });
      // this.IssueData = this.issGraph.graph;
      this.IssueData = undefined;
      if (this.showgraphs == true || this.showGovernance == true || this.showAgencies == true || this.showIssues == true) {
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
    this.searchElementRef.nativeElement.value = '';
    this.MenuItems = this.getMenuJSON(this.MenuData);
    if (event.value != undefined) {
      // Tracking event
      this.formButtonClickEvent('City Selection', '/', event, 'Select');

      this.showMenuItems = true;
      this.ShowForum = false;
      this.mapData = [];
      // this.showgraphs = false;      
      this.SelectedCity = event.value.id;
      this.dataService.SelectCityID = Number(this.SelectedCity);
      this.dataService.SelectedCity = event.value.id;
      var obj = {
        'lat': Number(event.value.lat),
        'lng': Number(event.value.lng),
      }
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
      this.dataService.wardDetails({ "cityId": this.SelectedCity }).subscribe(data => {
        var tempWardData: any = data;
        this.Wards = tempWardData.data;
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
    this.NewObj.level = this.dataService.zoom;
    this.NewObj.latitude = Number(this.dataService.SelectedCityLat);
    this.NewObj.longitude = Number(this.dataService.SelectedCityLng);
    this.CollectionsData(this.NewObj);
    this.formButtonClickEvent('Menu', 'City_Menu', 'City_Select', 'Select');
  }

  private dwcGraph;
  private AQMData;
  public AQM = false;
  public WardDetails;
  public wardAgencyList;
  public showGovernance = false;
  public showAgencies = false;
  public Type = '';
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
      "cityId": Number(this.SelectedCity),
      "wardId": this.wardID
    }
    if (type == 'Agencies') {
      this.dataService.catType = 5;
      this.compare = true;
      if (true) {
        this.dataService.getAgencies(obj).subscribe(data => {
          this.agencyData = data;
          this.mapData = this.agencyData.agencies;
          this.mapData.forEach(element => {
            if (element.name == "Mini Bangalore One Centre" || element.name == "Bangalore One Centre" || element.name == "Kiosk") {
              element.icon = './assets/Icons/BOne.png'
            } else if (element.name == "BBMP Revenue Office") {
              element.icon = './assets/Icons/BB.png'
            } else if (element.name == "Zonal Office") {
              element.icon = './assets/Icons/BWSSB.png'
            } else if (element.name == "BESCOM office" || element.name == "ELCITA Office") {
              element.icon = './assets/Icons/BESCOM.png'
            } else if (element.name == "Police Station") {
              element.icon = './assets/Icons/Police.png'
            }
          });
          this.wardAgencyList = this.agencyData.wardAgencyList;
          if (this.showgraphs == true || this.showGovernance == true || this.showAgencies == true || this.showIssues == true) {
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
        }, error => {
          console.log(error);
        })
      }
    } else if (type == 'Issues Categories') {
      this.Type = type;
      this.dataService.catType = 2;
      this.compare = true;
      this.showComp = true;
    } else if (type == 'DWCC') {
      this.dataService.catType = 7;
      this.compare = true;
      if (true) {
        this.dataService.getDWCC(obj).subscribe(data => {
          this.DWCCData = data;
          this.mapData = this.DWCCData.data;
          this.dwcGraph = data;
          this.mapData.forEach(element => {
            if (element.facility_type == "Bio Methanation Unit (BMU)") {
              element.icon = './assets/Icons/BioMethanation.png'
            } else if (element.facility_type == "Dry Waste Collection Center (DWCC)") {
              element.icon = './assets/Icons/DryWaste.png'
            } else if (element.facility_type == "Centralized Processing Facility") {
              element.icon = './assets/Icons/ProcessFacility.png'
            } else if (element.facility_type == "Leaf Litter Processing Units (LLPU)") {
              element.icon = './assets/Icons/Leaf.png'
            } else if (element.facility_type == "Organic Waste Converter (OWC)") {
              element.icon = './assets/Icons/OrgWaste.png'
            } else if (element.facility_type == "Landfills") {
              element.icon = './assets/Icons/LandFills.png'
            }
          });
          for (let ig = 0; ig < this.dwcGraph.total_count.length; ig++) {
            var obj = {
              "name": this.dwcGraph.total_count[ig].name,
              "value": this.dwcGraph.total_count[ig].count
            }
            this.graphData.push(obj);
            if (this.showgraphs == true || this.showGovernance == true || this.showAgencies == true || this.showIssues == true) {
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
        }, error => {
          console.log(error);
        })
      }
    } else if (type == "Governance") {
      this.dataService.catType = 6;
      this.compare = true;
      if (true) {
        this.dataService.getGovernance(obj).subscribe(data => {
          this.Governance = data;
          this.mapData = this.Governance.Corporator;
          this.mapData.forEach(element => {
            element.icon = './assets/Icons/Corporator.png'
          });
          this.mapData = this.mapData.concat(this.Governance.MLA)
          this.mapData.forEach(element => {
            if (element.icon == undefined) {
              element.icon = './assets/Icons/MLA.png'
            }
          });
          // this.WardDetails = this.Governance;
          this.WardDetails = undefined;
          if (this.showgraphs == true || this.showGovernance == true || this.showAgencies == true || this.showIssues == true) {
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
        }, error => {
          console.log(error);
        })
      }
    } else if (type == 'Toilets') {
      this.dataService.catType = 8;
      this.compare = true;
      if (true) {
        this.dataService.getToilets(obj).subscribe(data => {
          this.toiletsData = data;
          this.mapData = this.toiletsData.data;
          this.mapData.forEach(element => {
            element.icon = './assets/Icons/Toilet.png'
          });
          for (let to = 0; to < this.toiletsData.info.length; to++) {
            var obj = {
              "name": this.toiletsData.info[to].name,
              "value": this.toiletsData.info[to].count
            }
            this.graphData.push(obj);
          }
          if (this.showgraphs == true || this.showGovernance == true || this.showAgencies == true || this.showIssues == true) {
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
        }, error => {
          console.log(error);
        })
      }
    } else if (type == 'Campaigns') {
      this.dataService.catType = 1;
      this.compare = false;
      if (true) {
        this.dataService.getCampaigns(obj).subscribe(data => {
          this.campaignsData = data;
          this.mapData = this.campaignsData.mapData;
          this.mapData.forEach(element => {
            element.icon = './assets/Icons/Camp.png'
          });
          for (let cm = 0; cm < this.campaignsData.graph.category.length; cm++) {
            var obj = {
              "name": this.campaignsData.graph.category[cm].value,
              "value": this.campaignsData.graph.category[cm].count
            }
            this.graphData.push(obj);
          }
          for (let cm1 = 0; cm1 < this.campaignsData.graph.status.length; cm1++) {
            var obj = {
              "name": this.campaignsData.graph.status[cm1].value,
              "value": this.campaignsData.graph.status[cm1].count
            }
            this.graphDataStatus.push(obj);
          }
          if (this.showgraphs == true || this.showGovernance == true || this.showAgencies == true || this.showIssues == true) {
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
        }, error => {
          console.log(error);
        })
      }
    } else if (type == 'AQM') {
      this.dataService.catType = 9;
      this.compare = false;
      this.AQM = true;
      if (true) {
        this.dataService.AQMdata(obj).subscribe(data => {
          this.AQMData = data;
          this.mapData = this.AQMData.data;
          this.mapData.forEach(element => {
            if (element.source == 1) {
              element.icon = './assets/Icons/AQMGovt.png'
            } else {
              element.icon = './assets/Icons/AQMPvt.png'
            }
          });
          this.AQMGraphLoc = this.AQMData.graph;
          this.dataService.AQMDataList = this.AQMData.data;
          if (this.showgraphs == true || this.showGovernance == true || this.showAgencies == true || this.showIssues == true) {
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
          error => {
            console.log(error);
          });
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
    } else if (this.Type == 'Issues Categories') {
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
      } else if (this.Type == 'Issues Categories') {
        this.showIssues = false;
      } else {
        this.showgraphs = false;
      }
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
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
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 500, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No Data', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'submenu', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  configWard = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select Ward', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 500, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No Data', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Ward', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  configCity = {
    displayKey: "cityName", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select City', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 500, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No Data', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search City', // label thats displayed in search input,
    searchOnKey: 'cityName', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: true
  }

  public CityData = [];
  public CitySelected;
  public WardSelected = [];

  getMenuJSON(data): TreeviewItem[] {
    let childrenCategoryTemp = [];
    let childerenCatMain = [];
    var childrenCategory;
    data.forEach(element => {
      childrenCategory = new TreeviewItem({
        text: element.name, value: element.menuId, collapsed: false, checked: false, children: [
          { text: 'a', value: 0 },
        ]
      });
      for (let mi = 0; mi < element.subMenus.length; mi++) {
        var tempObj = {
          text: element.subMenus[mi].submenu,
          value: element.subMenus[mi].submenuId,
          checked: false
        }
        childrenCategory.children.push(new TreeviewItem(tempObj));
        childrenCategory.internalChecked = false;
      }
      childrenCategory.children.splice(0, 1);
      childrenCategoryTemp = [];
      childrenCategoryTemp.push(childrenCategory);
      childerenCatMain.push(childrenCategoryTemp);
    });
    return childerenCatMain;
  }

  private CitiesList;
  ngOnInit() {
    // this.Wards = ward;
    this.Wards.sort(this.dynamicSort("name"));
    let obj = {
      "cityId": this.SelectedCity
    }
    this.dataService.cityDetails().subscribe(data => {
      var tempCityData: any = data;
      this.cities = tempCityData.data;
      this.CitiesList = JSON.stringify(tempCityData.data);
      this.CitySelected = this.cities[0];
      this.dataService.SelectedCity = this.cities[0].id;
      this.dataService.SelectCityID = this.cities[0].id;
      this.dataService.SelectedCityLat = this.cities[0].lat;
      this.dataService.SelectedCityLng = this.cities[0].lng;
      this.showMenuItems = true;
      this.Wards = [];
      if (this.CitySelected != undefined) {
        this.dataService.wardDetails({ "cityId": this.CitySelected.id }).subscribe(data => {
          var tempWardData: any = data;
          this.Wards = tempWardData.data;
        });
      }
    });
    this.dataService.getMenuList(obj).subscribe(data => {
      // console.log(JSON.stringify(data));
      var TempMenuData: any = data;
      this.MenuData = TempMenuData.data;
      this.MenuItems = this.getMenuJSON(this.MenuData);
    });
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
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.formButtonClickEvent('Menu', 'Search', 'Place_Search', 'Input');
          //set latitude, longitude and zoom
          this.dataService.SelectedCityLat = place.geometry.location.lat();
          this.dataService.SelectedCityLng = place.geometry.location.lng();
          var warNmObj = {
            "lat": place.geometry.location.lat(),
            "lng": place.geometry.location.lng()
          }
          this.dataService.getCorrLocWard(warNmObj).subscribe(data => {
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
              this.dataService.wardDetails({ "cityId": this.CitySelected.id }).subscribe(data => {
                var tempWardData: any = data;
                this.Wards = tempWardData.data;
                for (let wd = 0; wd < this.Wards.length; wd++) {
                  if (this.currentWard.details[0].id == this.Wards[wd].wardId) {
                    this.WardSelected = this.Wards[wd];
                    this.wardSelected = Number(this.Wards[wd].wardId);
                    this.dataService.wardSelectedID = this.wardSelected;
                    break;
                  }
                }
                this.NewObj.cityId = this.dataService.SelectCityID;
                this.NewObj.wardId = this.currentWard.details[0].id;
                this.NewObj.level = this.dataService.zoom;
                this.NewObj.latitude = Number(this.dataService.SelectedCityLat);
                this.NewObj.longitude = Number(this.dataService.SelectedCityLng);
                this.CollectionsData(this.NewObj);
                this.ShowWardSelect = false;
                this.ShowCitySelect = false;
                setTimeout(() => {
                  this.ShowWardSelect = true;
                  this.ShowCitySelect = true;
                }, 100);
              });
            }
          })
        });
      });
    });
  }

  public ShowCitySelect = true;
  public ShowWardSelect = true;
  TreeMenuItemsSelect(event, menu) {
    if (event.length > 0) {
      let menuIncludes = false;
      let menuIndex;
      if (this.NewObj.menuData.length == 0) {
        let tempMenu = {
          "menuId": menu[0].value,
          "submenus": event.join(',')
        }
        this.NewObj.menuData.push(tempMenu);
      } else {
        for (let menuSel1 = 0; menuSel1 < this.NewObj.menuData.length; menuSel1++) {
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
            "menuId": menu[0].value,
            "submenus": event.join(',')
          }
          this.NewObj.menuData.push(tempMenu);
        } else {
          this.NewObj.menuData[menuIndex].submenus = event.join(',');
        }
      }
      this.NewObj.cityId = this.dataService.SelectCityID;
      this.NewObj.wardId = this.wardSelected == undefined ? 0 : this.wardSelected;
      this.NewObj.level = this.dataService.zoom;
      this.NewObj.latitude = Number(this.dataService.SelectedCityLat);
      this.NewObj.longitude = Number(this.dataService.SelectedCityLng);
      this.CollectionsData(this.NewObj);
    } else {
      for (let menuSel2 = 0; menuSel2 < this.NewObj.menuData.length; menuSel2++) {
        if (this.NewObj.menuData[menuSel2].menuId == menu[0].value) {
          this.NewObj.menuData.splice(menuSel2, 1);
        }
      }
      this.CollectionsData(this.NewObj);
    }
    this.formButtonClickEvent('Menu', 'Marker_Category', menu[0].text, 'CheckBox');
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
    navigator.geolocation.getCurrentPosition(pos => {
      // this.dataService.getCorrLocWard(pos.coords.latitude, pos.coords.longitude).subscribe(data => {
      //   this.wardDetails = data;
      var currLoc = {
        'lat': pos.coords.latitude,
        'lng': pos.coords.longitude,
        'icon': './assets/Icons/myLocation.png'
        // 'wardName':this.wardDetails[0].ward_name
      }
      var obj = []
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
      (<HTMLInputElement>document.getElementById('DWCC')).checked = false;
      (<HTMLInputElement>document.getElementById('Toilet')).checked = false;
      (<HTMLInputElement>document.getElementById('Campaigns')).checked = false;
      (<HTMLInputElement>document.getElementById('AQMcheck')).checked = false;
      (<HTMLInputElement>document.getElementById('ICatagory')).checked = false;
      (<HTMLInputElement>document.getElementById('Governance')).checked = false;
      (<HTMLInputElement>document.getElementById('Agencies')).checked = false;
    }, error => {
      console.log(error);
      // });
    });
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
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
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
    this.searchControl.setValue('');
    this.showClear = false;
  }

  public ShowForum = false;
  public ForumURL;
  NeighbourhoodForum() {
    // this.ShowForum = true;
    var temForumURL = this.wardSelectedNameForForum == undefined ? 'https://discourse.solveninja.org/tags/' : 'https://discourse.solveninja.org/tags/' + this.wardSelectedNameForForum;
    this.ForumURL = temForumURL;
    // setTimeout(() => {
    //   (<HTMLIFrameElement>document.getElementById('ForumSrc')).src = this.ForumURL;
    // }, 100);
    // window.open(this.ForumURL);
    this.formButtonClickEvent('Menu', 'Links_Button', 'NeighbourhoodForum', 'Links_Button');
    window.open('https://covid.apollo247.com/');
  }
  public ShowAnalytics = false;
  NeighbourhoodAnalytics() {
    // this.ShowAnalytics = true;
    var tempParm = this.wardSelectedName == undefined ? '' : '?ward_title=' + this.wardSelectedName;
    // window.open('http://internaldashboard.solveninja.org:4000/public/dashboard/07b9f145-5be8-4206-942e-7251e15791d9' + tempParm);
    this.formButtonClickEvent('Menu', 'Links_Button', 'NeighbourhoodAnalytics', 'Links_Button');
    window.open('https://ee.kobotoolbox.org/x/#Rpxexbz7');
  }

  closeForum(type) {
    if (type == 'Forum') {
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
      if (event.value.name.includes(' ')) {
        this.wardSelectedNameForForum = event.value.name;
        this.wardSelectedNameForForum = this.wardSelectedNameForForum.replace(/ /g, '-');
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
    this.wardSelected == undefined ? 0 : this.wardSelected
    this.NewObj.wardId = Number(this.wardSelected);
    this.dataService.wardSelectedID = this.wardSelected;
    this.NewObj.latitude = Number(this.dataService.SelectedCityLat);
    this.NewObj.longitude = Number(this.dataService.SelectedCityLng);
    this.CollectionsData(this.NewObj);
    var obj = {
      'lat': Number(event.value.lat),
      'lng': Number(event.value.lng),
    }
    var arr = [];
    arr.push(obj);
    this.mapData = [];
    this.mapData = arr;
    this.dataService.SelectedCityLat = Number(event.value.lat);
    this.dataService.SelectedCityLng = Number(event.value.lng);
    this.formButtonClickEvent('Ward_Select', 'Menu', 'Ward_Menu', 'City_Select')
  }
  public NewObj = {
    'level': this.dataService.zoom,
    'cityId': this.SelectedCity,
    'wardId': 0,
    'menuData': [],
    'latitude': 0,
    'longitude': 0
  }
  MenuMultiSelect(event, MenuID) {
    this.NewObj.level = this.dataService.zoom;
    this.NewObj.cityId = this.SelectedCity;
    this.wardSelected == undefined ? 0 : this.wardSelected;
    this.NewObj.wardId = this.wardSelected;
    var includes = false;
    var MenuIndex = 0;
    for (var tempMenSer = 0; tempMenSer < this.NewObj.menuData.length; tempMenSer++) {
      if (MenuID == this.NewObj.menuData[tempMenSer].menuId) {
        includes = true;
        MenuIndex = tempMenSer;
        break;
      } else {
        includes = false;
      }
    }
    if (includes == false) {
      var TempSubMenuId = ''
      for (let subMen = 0; subMen < event.value.length; subMen++) {
        if (TempSubMenuId == '') {
          TempSubMenuId = event.value[subMen].submenuId;
          TempSubMenuId = TempSubMenuId.toString();
        } else {
          TempSubMenuId = TempSubMenuId + ',' + event.value[subMen].submenuId
        }
      }
      var menuSelected = {
        'menuId': MenuID,
        'submenus': TempSubMenuId
      }
      this.NewObj.menuData.push(menuSelected);
    } else {
      var TempSubMenuId = ''
      for (let subMen = 0; subMen < event.value.length; subMen++) {
        if (TempSubMenuId == '') {
          TempSubMenuId = event.value[subMen].submenuId;
          TempSubMenuId = TempSubMenuId.toString();
        } else {
          TempSubMenuId = TempSubMenuId + ',' + event.value[subMen].submenuId
        }
      }
      this.NewObj.menuData[MenuIndex].submenus = TempSubMenuId;
    }
    this.CollectionsData(this.NewObj);
  }

  public ServiceRequest = null;
  CollectionsData(obj) {
    this.ServiceRequest ? this.ServiceRequest.unsubscribe() : null
    this.ServiceRequest = this.dataService.CollectionsData(obj).subscribe(data => {
      // console.log(data);
      let resMap: any = data;
      this.mapData = resMap.data;
    });
  }

  SingleSelectMenuDropDown(event, MenuID) {
    var includes = false;
    var MenuIndex = 0;
    for (var tempMenSer = 0; tempMenSer < this.NewObj.menuData.length; tempMenSer++) {
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
        'menuId': MenuID,
        'submenus': event.target.value
      }
      this.NewObj.menuData.push(menuSelected);
    } else {
      this.NewObj.menuData[MenuIndex].submenus = event.target.value;
    }
  }

  MenuRadioSelect(event, MenuName, MenuID) {
    var includes = false;
    var MenuIndex = 0;
    for (var tempMenSer = 0; tempMenSer < this.NewObj.menuData.length; tempMenSer++) {
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
        'menuId': MenuID,
        'submenus': event.target.value
      }
      this.NewObj.menuData.push(menuSelected);
    } else {
      this.NewObj.menuData[MenuIndex].submenus = event.target.value;
    }
  }

  SubscribeToInsights() {
    window.open('http://discourse.solveninja.org:5000/view/#!/forms/5e624910d3afc996a4edffc1');
    this.formButtonClickEvent('SubscribeToInsights_Click', 'Links', 'Menu', 'button_click');
  }
  NeighbourhoodData() {
    // window.open('../assets/html/NDData.html');
    this.formButtonClickEvent('NeighbourhoodData_Click', 'Links_Button', 'Menu', 'button_click');
    window.open('https://ee.kobotoolbox.org/x/#4v5Ilf7D');
  }
  FeedBack() {
    this.formButtonClickEvent('FeedBack_Click', 'Links', 'Menu', 'button_click');
    window.open('https://forms.gle/bSJpGUsm4sFGE3EW6');
  }

  toVolunteer() {
    this.formButtonClickEvent('Volunteer_Click', 'Links', 'Menu', 'button_click');
    window.open('https://forms.gle/vwYaFt7SFS8fMAT48');
  }

  formButtonClickEvent(eventName, eventCategory, eventLabel, eventAction) {
    this.googleAnalyticsService.eventEmitter(
      eventName, eventCategory, eventLabel, eventAction
    );
  }

  markerListClick(markerList) {
    this.dataService.SelectedCityLat = Number(markerList.lat);
    this.dataService.SelectedCityLng = Number(markerList.lng);
  }
}
