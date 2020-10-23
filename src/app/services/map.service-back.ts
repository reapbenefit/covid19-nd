import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { filter, map, tap, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { MenuService } from "./menu.service";
import { FilterserviceService } from "./filterservice.service";
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { from } from 'rxjs';

export interface Location {
  lat: number; 
  lng: number;
}

@Injectable({
  providedIn: "root",
})
export class MapService {
  private geocoder: any;
  public getMapLocations$ = new Subject();
  public locationsData$ = new BehaviorSubject(null);
  public setSelectedMarker$ = new Subject();
  public selectedMarker$ = new BehaviorSubject(null);
  public unFilteredLocationsData$ = new BehaviorSubject(null);
  opacity: number = 1;
  markerIcon = {
    url: "../../assets/Icons/gps-pins.png",
    scaledSize: { height: 20, width: 20 },
  };
  markerSelectedIcon = {
    url: "../../assets/Icons/gps-pins-selected.png",
    scaledSize: { height: 20, width: 20 },
  };
  appliedFilterList = [];
  searchKeyword = "";
  constructor(
    protected _http: HttpClient,
    private _menuService: MenuService,
    private _filterService: FilterserviceService,
    private mapLoader: MapsAPILoader
  ) {
  
    this.getMapLocations$.subscribe((point: any) => {
      this._http
        .get(`${environment.baseURL}${point.endPoint}`)
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
            .includes(this.searchKeyword.toLowerCase()) ||
          location.description
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase())
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
    console.log("_locationsData", _locationsData.length);
    return _locationsData;
  };
  getLocations = (point: any) => {
    return this._http.get(`${environment.baseURL}${point.endPoint}`).pipe(
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
    );
  };

  navigateSet = (endPoint, id, key) => {
    return this._http.get(`${environment.baseURL}${endPoint}`).pipe(
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

  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if(!this.geocoder) {
      return from(this.mapLoader.load())
      .pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<Location> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({'address': location}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              observer.next({
                lat: results[0].geometry.location.lat(), 
                lng: results[0].geometry.location.lng()
              });
            } else {
                console.log('Error - ', results, ' & Status - ', status);
                // observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        })        
      })
    )
  }
}
