import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'ngx-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {

  @Input() displayLocationModal: boolean;
  @Output() closeModal = new EventEmitter();
  constructor() { }

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;


  ngOnInit() {
    this.setCurrentLocation();
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }

  //Marker Drag
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
 //Function to Trigger Close Location Picker Modal Function in PublicFormComponent
  hideModal() {
    let pickerLocation = {
      lat: this.latitude,
      long: this.longitude
    }
    this.closeModal.emit(pickerLocation);

  }

}
