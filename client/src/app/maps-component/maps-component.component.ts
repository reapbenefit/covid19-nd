import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  MouseEvent,
  LatLngBounds,
  AgmDataLayer,
  AgmMap,
  DataMouseEvent,
} from "@agm/core";
import { DataService } from "../services/data.service";
import { CommonService } from "../services/common.service";
import { GoogleAnalyticsService } from "../services/google-analytics.service";
import geoJson from "../../assets/SampleGeoJson.json";
import { Subscription, forkJoin } from "rxjs";

import { MapMouseEvent, Map } from "mapbox-gl";

@Component({
  selector: "app-maps-component",
  templateUrl: "./maps-component.component.html",
  styleUrls: ["./maps-component.component.css"],
})
export class MapsComponentComponent implements OnInit {
  @ViewChild("infoWindow") infoWindow: ElementRef;
  @ViewChild("gm") gmmm: ElementRef;
  @ViewChild("clusterme") clusterme: ElementRef;
  map: Map;

  @Input() MapData;
  @Output() wardDetails = new EventEmitter();
  public zoom: number = 11;
  // initial center position for the map
  public lat;
  public lng;

  public infoWindowOpened = null;
  public previous_info_window = null;
  public markers = [];
  geoJson = geoJson;
  popupdetails = {};
  showcorordDetailsCnt = false;
  zoomCus = 10;

  displayCorrdsDetails(marker, index: number, data) {
    this.popupdetails = marker;

    this.showcorordDetailsCnt = false;
    setTimeout(() => {
      this.showcorordDetailsCnt = true;
    }, 50);

    let obj;
    obj = {
      type: Number(marker.type),
      id: Number(marker.id),
      subType: [],
      wardId: Number(this.dataService.wardSelectedID),
      city: Number(this.dataService.SelectCityID),
    };

    this.dataService.getCorrLocDetailsNewOne(obj).subscribe((data) => {
      console.log(data);
      this.responceData = data;
      if (this.responceData != null) {
        this.responceData.data["menuId"] = marker["menuId"]
          ? marker["menuId"]
          : 0;
        this.responceData.data["id"] = marker["id"] ? marker["id"] : 0;
        if (marker["subcategory"]) {
          this.responceData.data["subcategory"] = marker["subcategory"];
        }
        this.locationDetails = this.responceData.data;
      }
    });
  }

  zoomcluster(feature) {
    console.log(feature);
    console.log(this.map);
    let self = this.map;
    console.log(feature._geometry.coordinates);
    this.map
      .getSource(feature.source)
      ["getClusterExpansionZoom"](feature.properties.cluster_id, function (
        err,
        zoom
      ) {
        self.easeTo({
          center: feature._geometry.coordinates,
          zoom: zoom,
        });
      });
  }
  styleFunc(feature: any): any {
    return {
      clickable: true,
      fillColor: feature.getProperty("color"),
      strokeWeight: 1,
    };
  }

  onClick(clickEvent: DataMouseEvent): void {
    console.log("Click Event Detected");
    console.log(clickEvent.latLng.toString());
  }

  constructor(
    private dataService: DataService,
    private commonService: CommonService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.geoJson = JSON.parse(JSON.stringify(this.geoJson));
  }

  ngOnInit() {
    /**
     * UserName and Role Subscribe based on
     * App.compoenent.ts file
     */
    this.subscriptionWithUserName = this.commonService
      .getusername()
      .subscribe((res) => {
        console.log(res);
        this.userName = res.data;
        // Get All givenList
        this.getUserAssignedList();
      });
    this.subscriptionWithUserRole = this.commonService
      .getUserrole()
      .subscribe((res) => {
        console.log(res);
        this.userRole = res.data;
      });
    this.subscriptionWithUserData = this.commonService
      .getUserData()
      .subscribe((res) => {
        console.log(res);
        this.userData = res.data;
      });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.dataService.SelectedCityLat = position.coords.latitude;
        this.dataService.SelectedCityLng = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }

    this.locationDetails = {
      id: "",
      ward_id: "",
      wardName: "",
      name: "",
      type: "",
      streetName: "",
      address: "",
      contactNum: "",
      manager_name: "",
      facility_type: "",
      category: "",
      status: "",
      provider_website: "",
      gents: "",
      ladies: "",
      zone: "",
      source: "",
      constituency: "",
      party: "",
      cityName: "",
      email: "",
      wards: "",
      description: "",
      campaignEnd: "",
      url: "",
      DateOfCompliant: "",
      userId: "",
      complaintNumber: "",
      NoOfLikes: "",
    };
  }

  public InfoOpen = true;
  ngDoCheck() {
    this.lat = this.dataService.SelectedCityLat;
    this.lng = this.dataService.SelectedCityLng;
    this.zoom = this.dataService.zoom;
    if (this.zoom >= 16) {
      this.InfoOpen = false;
    } else {
      this.InfoOpen = true;
    }
  }

  public previous;
  select_marker(data) {
    console.log(this.gmmm);
    if (this.previous_info_window == null) this.previous_info_window = data;
    else {
      this.infoWindowOpened = data;
      this.previous_info_window.close();
    }
    this.previous_info_window = data;
  }

  // testurl = './assets/Icons/cc.png';
  testurl = {
    url: "./assets/Icons/cc.png",
    scaledSize: {
      width: 88,
      height: 70,
    },
  };

  showcluster = false;
  clusterData = [];
  ngOnChanges(changes: SimpleChanges) {
    // this.MapData.forEach(element => {
    //   if (element.total != undefined) {
    //     if (this.zoom >= 16) {
    //       element.label = '';
    //     } else {
    //       element.label = element.total.toString();
    //     }
    //   }
    // });
    this.markers = this.MapData;
    console.log(this.markers);

    this.showcluster = false;
    this.clusterData = [];
    this.markers.forEach((val) => {
      // console.log(val.menuId);
      if (val.menuId) {
        var index = this.clusterData.findIndex((c) => c.menuId == val.menuId);
        console.log(index);
        if (index != -1) {
          this.clusterData[index].features.push({
            type: "Feature",
            properties: {
              ...val,
            },
            geometry: {
              type: "Point",
              coordinates: [val.lng, val.lat],
            },
          });
        } else {
          this.clusterData.push({
            type: "FeatureCollection",
            name: "BBMP Wards",
            menuId: val.menuId,
            icon: val.icon,
            crs: {
              type: "name",
              properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84",
              },
            },
            features: [],
          });
        }
      }
    });
    console.log(this.clusterData);
    setTimeout(() => {
      this.showcluster = true;
    }, 500);

    this.previous_info_window = null;
    this.locationDetails = {
      id: "",
      ward_id: "",
      wardName: "",
      name: "",
      type: "",
      streetName: "",
      address: "",
      contactNum: "",
      manager_name: "",
      facility_type: "",
      category: "",
      status: "",
      provider_website: "",
      gents: "",
      ladies: "",
      zone: "",
      source: "",
      constituency: "",
      party: "",
      cityName: "",
      email: "",
      wards: "",
      description: "",
      campaignEnd: "",
      url: "",
      DateOfCompliant: "",
      userId: "",
      complaintNumber: "",
      NoOfLikes: "",
    };
  }

  public locationDetails;
  public responceData;
  clickedMarker(marker, index: number, data) {
    console.log(marker);
    let obj;
    obj = {
      type: Number(marker.type),
      id: Number(marker.id),
      subType: [],
      wardId: Number(this.dataService.wardSelectedID),
      city: Number(this.dataService.SelectCityID),
    };

    this.dataService.getCorrLocDetailsNewOne(obj).subscribe((data) => {
      console.log(data);
      this.responceData = data;
      if (this.responceData != null) {
        this.responceData.data["menuId"] = marker["menuId"]
          ? marker["menuId"]
          : 0;
        this.responceData.data["id"] = marker["id"] ? marker["id"] : 0;
        if (marker["subcategory"]) {
          this.responceData.data["subcategory"] = marker["subcategory"];
        }
        this.locationDetails = this.responceData.data;
      }
    });
  }

  mapClicked(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    let obj = {
      type: 5,
      id: 2,
    };
    this.dataService.getCorrLocDetails(obj).subscribe((data) => {
      console.log(data);
    });
    this.googleAnalyticsService.eventEmitter(
      "Maps",
      "Map_Click",
      "Marker_Modification",
      "/"
    );
  }

  markerDragEnd(m, $event: MouseEvent) {
    console.log();
    console.log("dragEnd", m, $event);
  }

  public currentWard;
  centerChange(event: any) {
    console.log("Test");
    // console.log(event);
    var warNmObj = {
      lat: event.lat,
      lng: event.lng,
    };
    this.dataService.centerLat = event.lat;
    this.dataService.centerLng = event.lng;
    this.commonService.sendCord(warNmObj);
    this.dataService.getCorrLocWard(warNmObj).subscribe((data) => {
      this.currentWard = data;
      this.wardDetails.emit(this.currentWard.details[0]);
    });
  }

  // New Map Changes...
  dragEnd($event) {
    // console.log($event);
    // let topLeft = {
    //   lat: $event.target.getBounds()._ne.lat,
    //   lng: $event.target.getBounds()._sw.lng,
    // };
    // let bottomRight = {
    //   lat: $event.target.getBounds()._sw.lat,
    //   lng: $event.target.getBounds()._ne.lng,
    // };
    // this.dataService.topLeft = topLeft;
    // this.dataService.bottomRight = bottomRight;
    // var warNmObj = {
    //   lat: $event.target.getCenter().lat,
    //   lng: $event.target.getCenter().lng,
    // };
    // this.dataService.centerLat = $event.target.getCenter().lat;
    // this.dataService.centerLng = $event.target.getCenter().lng;
    // this.commonService.sendCord(warNmObj);
    // this.dataService.getCorrLocWard(warNmObj).subscribe((data) => {
    //   this.currentWard = data;
    //   this.wardDetails.emit(this.currentWard.details[0]);
    // });
  }

  boundsChange(bounds: LatLngBounds) {
    // console.log(this.dataService.topLeft);
    // The Elastic query likes the rectangle to be specified with top-left and
    // bottom-right, hence converting NorthEast/SouthWest to the same.
    let topLeft = {
      lat: bounds.getNorthEast().lat(),
      lng: bounds.getSouthWest().lng(),
    };
    let bottomRight = {
      lat: bounds.getSouthWest().lat(),
      lng: bounds.getNorthEast().lng(),
    };
    this.dataService.topLeft = topLeft;
    this.dataService.bottomRight = bottomRight;
    // console.log(this.dataService.topLeft);
  }

  zoomChange(event) {
    console.log(event);
    this.dataService.zoom = event;
    this.zoom = event;
    this.commonService.sendZoom(event);
    if (this.zoom >= 16) {
      this.InfoOpen = false;
    } else {
      this.InfoOpen = true;
    }
  }

  badData(data) {
    console.log(data);
  }
  openURL(URL) {
    window.open(URL);
  }
  userLogin() {
    window.location.replace("/home");
  }

  /**
   * Save User Info
   * type :'assign' or 'given
   */
  loaderAction = false; //Assign Me
  userName = "";
  userRole = [];
  userData = "";
  subscriptionWithUserRole: Subscription;
  subscriptionWithUserName: Subscription;
  subscriptionWithUserData: Subscription;

  /**
   * Get Given List
   */
  user_given_list = [];
  user_given_listArray = [];
  getUserAssignedList() {
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

  numberPopup = false;
  mobilenumber;
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
          this.getUserAssignedList();
          // updte ES DB
          this.dataService.updateESRecord(
            {
              place_org_id: res["data"]["place_org_id"],
              closed_by: this.userName,
              place_org_subcategory: res["data"]["place_org_subcategory"],
            },
            "assigned"
          );
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
      userdata: this.userData,
    });
    let obj = {
      username: this.userName,
      userrole: this.userRole,
      userdata: this.userData,
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
}
