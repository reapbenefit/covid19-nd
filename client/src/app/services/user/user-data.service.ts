import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import {Routes} from './../../config/routes';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userData = new Subject<any>();
  public $userData = this.userData.asObservable();
  private route = new Routes();

  constructor(private http: HttpClient) {
    this.http.get(this.route.getRouteByKey('getUserDetailsFromKeycloak')).subscribe((userData) => {
      console.log('userData in service ; ', userData);
      this.userData.next(userData);
    });
  }

  // getUserData() {
  //   return {...this.userData};
  // }
}
