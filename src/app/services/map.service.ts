import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { filter, map, tap, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { MenuService } from "./menu.service";
import { FilterserviceService } from "./filterservice.service";
declare const google: any;

import { MapsAPILoader } from "@agm/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { from } from "rxjs";
import { async } from '@angular/core/testing';
export interface Location {
  lat: any;
  lng: any;
}

@Injectable({
  providedIn: "root",
})
export class MapService {
  private geocoder: any;
  private geoC: any;
  public getMapLocations$ = new Subject();
  public locationsData$ = new BehaviorSubject(null);
  public setSelectedMarker$ = new Subject();
  public selectedMarker$ = new BehaviorSubject(null);
  public unFilteredLocationsData$ = new BehaviorSubject(null);
  opacity: number = 1;
  public adress: string;

  public updateMapCoordinates: Function;
  public currentLat: number;
  public currentLng: number;
  markerIcon = {
    url: "../../assets/Icons/gps-pins.png",
    scaledSize: { height: 20, width: 20 },
  };
  markerSelectedIcon = {
    url: "../../assets/Icons/gps-pins-selected.png",
    scaledSize: { height: 20, width: 20 },
  };
  private mapsAPILoader: MapsAPILoader;

  getAddressParts(map_address) {
    let address = {};
    const address_components = map_address.address_components;
    address_components.forEach((element) => {
      address[element.types[0]] = element.short_name;
    });

    return address["administrative_area_level_2"];
  }

  async gettingAdress(point) {
    await
      this.mapLoader.load().then(async () => {
        this.geocoder = new google.maps.Geocoder();
        await this.geocoder.geocode(
          { location: { lat: this.currentLat, lng: this.currentLng } },
          (results, status) => {
            this.adress = this.getAddressParts(results[0]);
            this._http
              .post(`${environment.baseURL}${point.endPoint}`, {
                lat: this.currentLat, long: this.currentLng,
                district: this.adress
              })
              .pipe(
                filter(Boolean),
                map((res: any) => {
                  const _locationsData = this.searchAndFilter(res);
                  if (_locationsData && _locationsData.length > 0) {
                    _locationsData.forEach((item: any, i: number) => {
                      item.icon = this.markerIcon;
                    });
                  }
                  this.locationsData$.next(_locationsData);
                  this.unFilteredLocationsData$.next(res);
                  this._menuService.setSelectedMenu$.next(point.key);
                })
              )
              .subscribe();
          }
        )
      })
  }


  appliedFilterList = [];
  searchKeyword = "";
  constructor(
    protected _http: HttpClient,
    private _menuService: MenuService,
    private _filterService: FilterserviceService,
    private mapLoader: MapsAPILoader
  ) {
    this.getMapLocations$.subscribe(async (point: any) => {
      await this.gettingAdress(point);
    });
    this.setSelectedMarker$.subscribe((selectedMarker: any) => {
      const _locationsData = this.locationsData$.getValue();
      if (_locationsData && _locationsData.length > 0) {
        _locationsData.forEach((item: any, i: number) => {
          if (item.id === selectedMarker.id) {
            item.icon = this.markerSelectedIcon;
            item.opacity = this.opacity;
          } else {
            item.icon = this.markerIcon;
          }
        });
        this.locationsData$.next(_locationsData);
      }
      this.selectedMarker$.next(selectedMarker);
    });

    this._filterService.appliedFilterList.subscribe((data) => {
      this.appliedFilterList = data;
    });
    this._filterService.appliedSearchKeyword.subscribe((data) => {
      this.searchKeyword = data;
    });
  }

  searchAndFilter = (res): any => {
    let forms: any = [];
    let _locationsData;
    /* filter */
    this.appliedFilterList.forEach((item) => {
      const _chekedItems = item.forms.filter((sItem) => sItem.checked);
      forms.push(_chekedItems);
    });
    const _filtersList = forms.flat();
    /* filter end */

    /* search */
    if (this.searchKeyword && _filtersList && _filtersList.length === 0) {
      _locationsData = res.filter((location) => {
        return (
          location.name
            .toLowerCase()
            .trim()
            .includes(this.searchKeyword.toLowerCase().trim()) ||
          location.description
            .toLowerCase()
            .trim()
            .includes(this.searchKeyword.toLowerCase().trim())
        );
      });
    } else if (_filtersList && _filtersList.length > 0) {
      _locationsData = res.filter((item) =>
        _filtersList.some((f) => f.Forms_index === item.typeId)
      );
    } else {
      _locationsData = res;
    }
    /* search end */
    return _locationsData;
  };
  getLocations = (point: any, isFromAdd = false) => {
    return this._http.post(`${environment.baseURL}${point.endPoint}`, {
      district: this.adress
    }).pipe(
      filter(Boolean),
      map((res: any) => {
        const _locationsData = this.searchAndFilter(res);
        if (_locationsData && _locationsData.length > 0) {
          _locationsData.forEach((item: any, i: number) => {
            item.icon = this.markerIcon;
          });
        }
        this.locationsData$.next(_locationsData);
        this.unFilteredLocationsData$.next(res);
        this._menuService.setSelectedMenu$.next(point.key);
        if (isFromAdd) {
          this.setSelectedMarker$.next(
            _locationsData[_locationsData.length - 1]
          );


        }
      })
    );
  };





  
  navigateSet = (endPoint, id, key) => {
    return this._http.post(`${environment.baseURL}${endPoint}`, {
      district: this.adress

    }).pipe(
      filter(Boolean),
      map((res: any[]) => {
        if (res && res.length > 0) {
          res.forEach((item: any, i: number) => {
            if (item.id === id) {
              item.icon = this.markerSelectedIcon;
              item.opacity = this.opacity;
            } else {
              item.icon = this.markerIcon;
            }
          });

          this.locationsData$.next(res);
        }
      })
    );
  };

  public initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return from(this.mapLoader.load()).pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<Location> {
    return this.waitForMapsToLoad().pipe(
      switchMap(() => {
        return new Observable((observer) => {
          this.geocoder.geocode({ address: location }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
            }
            observer.complete();
          });
        });
      })
    );
  }



}
