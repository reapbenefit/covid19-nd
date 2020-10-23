import { Router } from '@angular/router';
import { MapService } from '../../services/map.service';
import { DataService } from '../../services/data.service';
import { Component, OnInit, EventEmitter, Output, Input, ViewChild, TemplateRef } from '@angular/core';
import { MenuService, Menu } from '../../services/menu.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notif: any = [];
  selectedInfo;
  menuList: Array<Menu>;
  locationsList = [];
  notify: boolean = true;

  @ViewChild("content") private infomodal_typeRef: TemplateRef<Object>;
  @Output() notifEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private service: DataService,
    private modalService: NgbModal,
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
    switch (type) {
      case "49": return 'pins';
      case "52": return 'pins';
      case "50": return 'list';
      case "51": return 'list';
      case "53": return 'casestudy';
      default: return 'home';
    }
  }

  private modalRef: NgbModalRef;
  navigate = (item) => {
    const id = item.id;
    const key = this.getMenuKey(item.type);
    if (this.menuList && this.menuList.length > 0 && this.menuList.some((item) => item.key === key)) {
      const endPointObj = this.menuList.some((item) => item.key === key) && this.menuList.find((item) => item.key === key);
      const endPoint = endPointObj && endPointObj.endPoint;
      if (endPoint) {
        this._mapService.navigateSet(endPoint, id, key).subscribe(() => {
          if (this.locationsList.some((item) => item.sub_id === id)) {
            const _marker = this.locationsList.find((item) => item.sub_id === id);
            this._menuService.setSelectedMenu$.next(key);
            if (_marker) {
              this._mapService.setSelectedMarker$.next(_marker);
              this.selectedInfo = _marker;
              this.modalRef = this.modalService.open(this.infomodal_typeRef, {
                ariaLabelledBy: "modal-basic-title",
                windowClass: "modal_customize_service",
              });
              this.modalRef.result.then(
                (result) => { },
                (reason) => { }
              );
            }
          }
          this.router.navigate(['./']);
        });
      }
    }
  }
  // remove(){
  //   this.service.getNotifications().subscribe(data => {
  //     this.notif = data;
  //     console.log("in remove");
  //   });
  // }

  notifClose() {
    this.notify = !this.notify;
    this.notifEvent.emit(this.notify);
  }
  close_modal() {
    this.modalRef.close();
  }
}
