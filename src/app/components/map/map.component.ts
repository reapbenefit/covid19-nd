import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList,
  ViewChild,
  TemplateRef,
  ElementRef,
  NgZone,
  ChangeDetectorRef,
} from "@angular/core";
import { MapService } from "src/app/services/map.service";
import { AgmInfoWindow } from "@agm/core";
import { MenuService, Menu, newMenuList } from "src/app/services/menu.service";
import { async } from "@angular/core/testing";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MapsAPILoader } from "@agm/core";
import { DataService } from "../../services/data.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

import { MapMouseEvent, Map } from "mapbox-gl";

export interface Location {
  lat: any;
  lng: any;
}

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  public zoom: number = 12;
  public lat: any;
  public lng: any;

  // MapBox
  @ViewChild("clusterme") clusterme: ElementRef;
  map: Map;
  showcluster = false;
  clusterData = [];

  locationsList = [];
  selectedInfo;
  activeMenu: String;
  @ViewChild("content") private infomodal_typeRef: TemplateRef<Object>;
  @ContentChildren(AgmInfoWindow) infoWindow: QueryList<AgmInfoWindow> = new QueryList<AgmInfoWindow>();
  private geoCoder;
  global_city = "";
  location: Location;
  Global_latitude: any;
  Global_longitude: any;
  districtNme: any;
  constructor(
    private _mapService: MapService,
    private _menuService: MenuService,
    private modalService: NgbModal,
    private ngZone: NgZone,

    private mapsAPILoader: MapsAPILoader,
    private dataService: DataService,
    public router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
    const _cityURlList = window.location.hash.split("/");
    let _city = "";
    if (
      _cityURlList &&
      _cityURlList.length > 0 &&
      _cityURlList.some((i) => i === "app")
    ) {
      _city = _cityURlList[_cityURlList.length - 1];
    }
    if (this._mapService.currentLat && this._mapService.currentLng) {
      this.lat = this._mapService.currentLat;
      this.lng = this._mapService.currentLng
    } else
      if (navigator && _city === "") {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
        });
      } else if (_city) {
        this.addressToCoordinates(_city);
      }

    this.showcluster = false;
    this._mapService.locationsData$.subscribe((data) => {
      if (data) {
        this.locationsList = data;
        this.districtNme = this.locationsList[0] == undefined ? " N.A " : this.locationsList[0].disticName;
        this.lat = this._mapService.currentLat;
        this.lng = this._mapService.currentLng;

        console.log(this.locationsList);
        this.locationsList.forEach((val) => {
            // console.log(val.menuId);
            if (val.catName) {
              var index = this.clusterData.findIndex((c) => c.catName == val.catName);
              console.log(index);
              if (index != -1) {
                this.clusterData[index].features.push({
                  type: "Feature",
                  properties: {
                    ...val,
                    icon:val.icon.url,
                    width: val.icon.scaledSize.width,
                    height: val.icon.scaledSize.height
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [val.long, val.lat],
                  },
                });
              } else {
                this.clusterData.push({
                  type: "FeatureCollection",
                  name: "solvergin",
                  catName: val.catName,
                  icon: val.icon.url,
                  crs: {
                    type: "name",
                    properties: {
                      name: "urn:ogc:def:crs:OGC:1.3:CRS84",
                    },
                  },
                  features: [
                    {
                      type: "Feature",
                      properties: {
                        ...val,
                        icon:val.icon.url,
                        width: val.icon.scaledSize.width,
                        height: val.icon.scaledSize.height
                      },
                        geometry: {
                          type: "Point",
                          coordinates: [val.long, val.lat],
                        },
                    }
                  ],
                });
              }

            }
          });
          console.log(this.clusterData);
          setTimeout(() => {
            this.showcluster = true;
          }, 2000);
      }
    });

    this._mapService.selectedMarker$.subscribe((selectedMarker) => {
      if (selectedMarker) {
        this.lat = selectedMarker.lat;
        this.lng = selectedMarker.long;
        this._mapService.currentLat = this.lat
        this._mapService.currentLng = this.lng
      }
      this.selectedInfo = selectedMarker;
    });

    this._menuService.selectedMenu$.subscribe((menu: string) => {
      if (menu) {
        this.activeMenu = menu;
      }
    });
  }

  // Map Box
  zoomcluster(feature) {
    console.log(feature);
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
          zoom: zoom + 0.2,
        });
      });
  }

  loadLocationData() {
    let menu = newMenuList.find(m => m.key == this.activeMenu)
    if (menu) {
      this._mapService.getMapLocations$.next({
        key: menu.key,
        endPoint: menu.endPoint,
      });
    }
  }

  addressToCoordinates(address) {
    this._mapService.geocodeAddress(address).subscribe((location: Location) => {
      this.lat = location.lat;
      this.lng = location.lng;
      this._mapService.currentLat = this.lat
      this._mapService.currentLng = this.lng
      this.zoom = 16;
      this.ref.detectChanges();
    });
  }

  ngAfterViewInit() { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  mapClicked = (event) => {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  };

  centerChange = (event) => { };

  zoomChange = (event) => {
    this.zoom = event;
  };

  private modalRef: NgbModalRef;
  markerClick = (id) => {
    console.log(id);
    if (this.locationsList.some((item) => item.id === id)) {
      const item = this.locationsList.find((item) => item.id === id);
      this._mapService.setSelectedMarker$.next(item);
      this.modalRef = this.modalService.open(this.infomodal_typeRef, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "modal_customize_service",
      });
      this.modalRef.result.then(
        (result) => { },
        (reason) => { }
      );
    }
  };

  close_modal() {
    this.modalRef.close();
  }
}
