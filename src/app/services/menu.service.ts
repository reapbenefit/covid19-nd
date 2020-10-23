import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FilterserviceService } from "./filterservice.service";

export interface Menu {
  key: string;
  name: string;
  img: string;
  endPoint?: string;
  img_active: string;
  state: boolean;
  id?: any;
}

export const newMenuList: Array<Menu> = [
  {
    key: "pins",
    name: "reports",
    img: "../../assets/Icons/menuicons/reports-pins.png",
    img_active: "../../assets/Icons/menuicons/reports-pins.png",
    endPoint: "reports",
    state: false,
    id: [49, 52],
  },
  {
    key: "list",
    name: "ideas",
    img: "../../assets/Icons/menuicons/Campaign-pins.png",
    img_active: "../../assets/Icons/menuicons/Campaign-pins.png",
    endPoint: "idea",
    state: false,
    id: [50, 51],
  },
  {
    key: "actofsolution",
    name: "Act of solve",
    img: "../../assets/Icons/menuicons/solve.png",
    img_active: "../../assets/Icons/menuicons/solve.png",
    endPoint: "actofsolve",
    state: false,
    id: [57],
  },
  {
    key: "casestudy",
    name: "case study",
    img: "../../assets/Icons/menuicons/casestudy-pins.png",
    img_active: "../../assets/Icons/menuicons/casestudy-pins.png",
    endPoint: "caseStudy",
    state: false,
    id: [53],
  },
  {
    key: "dashboard",
    name: "city dashboard",
    img: "../../assets/Icons/bottom-bar-icons/dashboard.png",
    img_active: "../../assets/Icons/bottom-bar-icons/dashboard.png",
    state: false,
  },
  {
    key: "discourse",
    name: "civic forum",
    img: "../../assets/Icons/bottom-bar-icons/discourse.png",
    img_active: "../../assets/Icons/bottom-bar-icons/discourse.png",
    state: false,
  },
  {
    key: "externallinks",
    name: "External Links",
    img: "../../assets/Icons/bottom-bar-icons/discourse.png",
    img_active: "../../assets/Icons/bottom-bar-icons/discourse.png",
    state: false,
  },
];

@Injectable({
  providedIn: "root",
})
export class MenuService {
  public menuList$ = new BehaviorSubject(newMenuList);
  public setSelectedMenu$ = new Subject();
  public selectedMenu$ = new BehaviorSubject(newMenuList[0].key);
  constructor(
    protected _http: HttpClient,
    private _filterService: FilterserviceService
  ) {
    this.setSelectedMenu$.subscribe((value: string) => {
      const _preValue = this.selectedMenu$.getValue();
      this.selectedMenu$.next(value);
    });
  }
}
