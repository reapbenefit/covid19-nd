import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FilterserviceService {
  public filtersList$ = new BehaviorSubject(null);
  public searchFilterList = new BehaviorSubject([]);
  public appliedFilterList = new BehaviorSubject([]);
  public appliedSearchKeyword = new BehaviorSubject("");
  constructor(protected _http: HttpClient) { }

  setSeachedItem = (item) => {
    return new Promise((resolve, reject) => {
      this.appliedSearchKeyword.next(item);
      resolve({});
    });
  };

  setAppliedFilterList = (list) => {
    return new Promise(async (resolve, reject) => {
      this.appliedFilterList.next(list);
      resolve({});
    });
  };

  setSearchFilterList = (list) => {
    return new Promise(async (resolve, reject) => {
      this.searchFilterList.next(list);
      resolve({});
    });
  };

  getFiltersList$ = () => {
    const endPoint = "issueAssetForm";
    return this._http.get(`${environment.baseURL}${endPoint}`).pipe(
      filter(Boolean),
      map((list: any) => {
        const res = list.map((item) => {
          return Object.assign({}, item, {
            checked: true,
            forms: item.forms.map((subItem) => {
              return Object.assign({}, subItem, {
                checked: true,
              });
            }),
          });
        });
        this.appliedFilterList.next(res);
        this.filtersList$.next(res);
        this.appliedSearchKeyword.next("");
      })
    );
  };
}
