import { Router } from '@angular/router';
import { MapService } from '../../services/map.service';
import { DataService } from '../../services/data.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MenuService, Menu } from '../../services/menu.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notif:any = [];
  menuList: Array<Menu>;
  locationsList = [];
  notify: boolean = true;
  @Output() notifEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private service: DataService, 
    private router: Router, 
    private _menuService: MenuService,
    private _mapService: MapService) {
  }

  ngOnInit() {
    this.service.getNotifications(this._mapService.adress).subscribe(data => {
      this.notif = data;
    });
    this._menuService.menuList$.subscribe((menuList: Array<Menu>) => this.menuList = menuList);
    this._mapService.locationsData$.subscribe((data) => {
      if (data) {
        this.locationsList = data;
      }
    });
  }
 
  getMenuKey = (type: string) => {
    switch(type) {
      
      case "5": return 'pins';
      case "6": return 'list';
      default: return 'home';
    }
  }
  navigate = (item) => {
    // console.log(item);
    
    // const id =  item.id; 
    // const key = this.getMenuKey(item.type);
    // if(this.menuList && this.menuList.length > 0  && this.menuList.some((item) => item.key === key)) {
    //   const endPointObj = this.menuList.some((item) => item.key === key) && this.menuList.find((item) => item.key === key);
    //   const endPoint = endPointObj && endPointObj.endPoint;
    //   if(endPoint) {
    //     this._mapService.navigateSet(endPoint, id, key).subscribe(() => {
    //       if(this.locationsList.some((item) => item.id === id)) {
    //         const _marker = this.locationsList.find((item) => item.id === id);
    //         this._menuService.setSelectedMenu$.next(key);
    //         if(_marker) {
    //           this._mapService.setSelectedMarker$.next(_marker);
    //         }
    //       }
    //       // this.router.navigate(['/app']);
    //     });
    //   }
    // }
  }
  remove(){
    this.service.getNotifications(this._mapService.adress).subscribe(data => {
      this.notif = data;
      console.log("in remove");
    });
  }

  notifClose(){
    this.notify = !this.notify;
    this.notifEvent.emit(this.notify);
  }
}
