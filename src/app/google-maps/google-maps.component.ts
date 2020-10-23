import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  title: string = 'Select Location';
  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  private geoCoder;
  searchText = '';
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @Input() fromParent;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);

        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        if (this.fromParent.lat !=undefined) {
          this.latitude = this.fromParent.lat
        }
        if (this.fromParent.long !=undefined) {
          this.longitude = this.fromParent.long
        }
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  mapClick($event){
    // console.log($event,"$event: any")
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  private getAddressParts(object): Object {
    let address = {};
    const address_components = object.address_components;
    address_components.forEach(element => {
      address[element.types[0]] = element.short_name;
    });
    return address;
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        const address = {
          formatted_address: results[0].formatted_address,
          address_parts: this.getAddressParts(results[0])
        };
        if (results[0]) {
          this.zoom = 20;
          this.address = address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  saveLocation() {
    const data = {
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude
    }
    this.activeModal.close(data);
  }

  searchClose() {
    this.searchText = '';
  }
}
