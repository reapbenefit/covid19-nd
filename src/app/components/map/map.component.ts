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
import { AgmInfoWindow, LatLngBounds } from "@agm/core";
import { MenuService, Menu, newMenuList } from "src/app/services/menu.service";
import { async } from "@angular/core/testing";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MapsAPILoader } from "@agm/core";
import { DataService } from "../../services/data.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

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
  public zoom: number = 16;
  public lat: any;
  public lng: any;
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

    this._mapService.locationsData$.subscribe((data) => {
      if (data) {
        this.locationsList = data;
        this.districtNme = this.locationsList[0] == undefined ? " N.A " : this.locationsList[0].disticName;
        this.lat = this._mapService.currentLat
        this.lng = this._mapService.currentLng
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

  centerChange = (event) => { 
    // console.log(event,"center")
    if (event) {
 
    
    this._mapService.pageNo = undefined;
    if (this._mapService.currentLat !== event.lat){
      this._mapService.currentLat = event.lat;
      this._mapService.currentLng = event.lng;
      this.lat = event.lat;
      this.lng = event.lng;
      this.loadLocationData();
    }
   
    }
  };

  zoomChange = (event) => {
    this.zoom = event;
  };
  updateMarkers(newBounds: LatLngBounds) {
    // console.log(newBounds)
  }

  private modalRef: NgbModalRef;
  markerClick = (id) => {
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
