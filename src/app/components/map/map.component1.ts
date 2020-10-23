import { Component, OnInit, Input, ContentChildren, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { AgmInfoWindow } from '@agm/core';
import { MenuService } from 'src/app/services/menu.service';
import { async } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public zoom: number = 10;
  public lat: number = 0;
  public lng: number = 0;

  locationsList = [];
  selectedInfo;
  activeMenu: string;
  @ViewChild("content") private infomodal_typeRef: TemplateRef<Object>;
  @ContentChildren(AgmInfoWindow) infoWindow: QueryList<AgmInfoWindow> = new QueryList<AgmInfoWindow>();

  constructor(private _mapService: MapService, private _menuService: MenuService, private modalService: NgbModal,) {
    this._mapService.locationsData$.subscribe((data) => {
      if (data) {
        this.locationsList = data;
        if (this.locationsList.length > 0) {
          this.lat = this.locationsList[0].lat;
          this.lng = this.locationsList[0].long;
        }
      }
      this._mapService.selectedMarker$.subscribe((selectedMarker) => {
        // if (selectedMarker) {
        this.selectedInfo = selectedMarker;
        // }
      });
    });

    this._menuService.selectedMenu$.subscribe((menu: string) => {
      if (menu) {
        this.activeMenu = menu;
      }
    })
  }


  ngOnInit() {

  }

  mapClicked = (event) => {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  centerChange = (event) => {
  }

  zoomChange = (event) => {
    this.zoom = event;
  }
  
  private modalRef: NgbModalRef;
  markerClick = (id) => {
    if (this.locationsList.some((item) => item.id === id)) {
      const item = this.locationsList.find((item) => item.id === id);
      this.lat = item.lat;
      this.lng = item.long;
      this._mapService.setSelectedMarker$.next(item);
      this.modalRef = this.modalService.open(this.infomodal_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' });
      this.modalRef.result.then((result) => {

      }, (reason) => {

      });

    }
  }
  setLat = (position) => {
    this.lat = position.coords.latitude;
  }

  setLng = (position) => {
    this.lng = position.coords.longitude;
  }
  getLat = () => {
    if (this.lat === 0) {
      navigator.geolocation.getCurrentPosition(this.setLat)
    }
    return this.lat;
  }

  getLng = () => {
    if (this.lng === 0) {
      navigator.geolocation.getCurrentPosition(this.setLng)
    }
    return this.lng;
  }

  close_modal() {
    console.log("close modal")
    // this.modalService.dismissAll();
    this.modalRef.close();
  }
}
