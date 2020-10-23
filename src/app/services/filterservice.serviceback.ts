import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterserviceService {
  public searchedItem = new BehaviorSubject(null);
  public filtersList$ = new BehaviorSubject(null);
  public searchFilterList = new BehaviorSubject([]);
  public appliedFilterList = new BehaviorSubject([]);
  constructor(protected _http: HttpClient) { 
  }

  setSeachedItem = (item) => {
    this.searchedItem.next(item);
  };

  setAppliedFilterList = (list) => {
    return new Promise(async (resolve, reject) => {
      this.appliedFilterList.next(list);
      resolve({});
    });
    
  }

  setSearchFilterList = (list) => {
    return new Promise(async (resolve, reject) => {
      this.searchFilterList.next(list);
      resolve({});
    });
  }

  getFiltersList$ = () => {
    const endPoint = 'issueAssetForm';
    return this._http.post(`${environment.baseURL}${endPoint}`,{
      district:"Uttara Kannada"

    }).pipe(
      filter(Boolean),
       map((res: any) => {
        this.filtersList$.next(res);
       })
    );
  }
}
