import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { DataService } from '../services/data.service';
import { CommonService } from '../services/common.service';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

@Component({
  selector: 'app-maps-component',
  templateUrl: './maps-component.component.html',
  styleUrls: ['./maps-component.component.css']
})
export class MapsComponentComponent implements OnInit {

  @ViewChild('infoWindow') infoWindow: ElementRef

  @Input() MapData;
  @Output() wardDetails = new EventEmitter();
  public zoom: number = 10;
  // initial center position for the map    
  public lat: any = 13.04501680979963;
  public lng: any = 77.60573693017929;

  public infoWindowOpened = null
  public previous_info_window = null
  public markers = [];

  constructor(private dataService: DataService,
    private commonService: CommonService,
    private googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit() {
    this.locationDetails = {
      "id": '',
      "ward_id": '',
      "wardName": '',
      "name": '',
      "type": '',
      "streetName": '',
      "address": "",
      "contactNum": "",
      "manager_name": "",
      "facility_type": '',
      "category": '',
      "status": '',
      "provider_website": '',
      "gents": '',
      "ladies": '',
      "zone": '',
      "source": '',
      "constituency": '',
      "party": '',
      "cityName": '',
      "email": '',
      "wards": '',
      "description": '',
      "campaignEnd": '',
      "url": '',
      "DateOfCompliant": '',
      "userId": '',
      "complaintNumber": '',
      "NoOfLikes": ''
    }
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
    if (this.previous_info_window == null)
      this.previous_info_window = data;
    else {
      this.infoWindowOpened = data;
      this.previous_info_window.close();
    }
    this.previous_info_window = data;
  }

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
    this.previous_info_window = null;
    this.locationDetails = {
      "id": '',
      "ward_id": '',
      "wardName": '',
      "name": '',
      "type": '',
      "streetName": '',
      "address": "",
      "contactNum": "",
      "manager_name": "",
      "facility_type": '',
      "category": '',
      "status": '',
      "provider_website": '',
      "gents": '',
      "ladies": '',
      "zone": '',
      "source": '',
      "constituency": '',
      "party": '',
      "cityName": '',
      "email": '',
      "wards": '',
      "description": '',
      "campaignEnd": '',
      "url": '',
      "DateOfCompliant": '',
      "userId": '',
      "complaintNumber": '',
      "NoOfLikes": ''
    }
  }

  public locationDetails;
  public responceData;
  clickedMarker(marker, index: number, data) {
    let obj;
    obj = {
      "type": Number(marker.type),
      "id": Number(marker.id),
      "subType": [],
      "wardId": Number(this.dataService.wardSelectedID),
      "city": Number(this.dataService.SelectCityID)
    }
    this.dataService.getCorrLocDetails(obj).subscribe(data => {
      console.log(data);
      this.responceData = data;
      if (this.responceData != null) {
        this.locationDetails = this.responceData.data;
      }
      // this.select_marker(data);
    });
  }

  mapClicked(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    let obj = {
      "type": 5,
      "id": 2
    }
    this.dataService.getCorrLocDetails(obj).subscribe(data => {
      console.log(data);
    });
    this.googleAnalyticsService.eventEmitter('Maps', 'Map_Click', 'Marker_Modification', "/")
  }

  markerDragEnd(m, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  public currentWard;
  centerChange(event: any) {
    // console.log(event);
    var warNmObj = {
      "lat": event.lat,
      "lng": event.lng
    }
    this.dataService.centerLat = event.lat;
    this.dataService.centerLng = event.lng;
    this.commonService.sendCord(warNmObj);
    this.dataService.getCorrLocWard(warNmObj).subscribe(data => {
      this.currentWard = data;
      this.wardDetails.emit(this.currentWard.details[0]);
    })
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

}
