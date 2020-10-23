import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface Menu {
  key: string;
  name: string;
  img: string;
  endPoint?: string;
  img_active: string;
  state: boolean;
}

export const newMenuList: Array<Menu> = [
  {
    key: "pins",
    name: "reports",
    img: "../../assets/Icons/menuicons/reports-pins.png",
    img_active: "../../assets/Icons/menuicons/reports-pins.png",
    endPoint: "reports",
    state: false,
  },
  {
    key: "list",
    name: "ideas",
    img: "../../assets/Icons/menuicons/Campaign-pins.png",
    img_active: "../../assets/Icons/menuicons/Campaign-pins.png",
    endPoint: "idea",
    state: false,
  },
  {
    key: "casestudy",
    name: "case study",
    img: "../../assets/Icons/menuicons/casestudy-pins.png",
    img_active: "../../assets/Icons/menuicons/casestudy-pins.png",
    endPoint: "caseStudy",
    state: false,
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

// const menuList: Array<Menu> = [
//     {
//       key: 'home',
//       img: '../../assets/Icons/home.png',
//       endPoint: 'locations',
//       img_active:'../../assets/Icons/home-selected.png',
//       state:false
//     },
//     {
//       key: 'issues',
//       img: '../../assets/Icons/issues.png',
//       endPoint: 'issuelocations',
//       img_active:'../../assets/Icons/issues-selected.png',
//       state:false
//     },
//     {
//       key: 'campaign',
//       img: '../../assets/Icons/campaign.png',
//       endPoint: 'diylocations',
//       img_active:'../../assets/Icons/campaign-selected.png',
//       state:false
//     },
//     {
//       key: 'diy',
//       img: '../../assets/Icons/diy.png',
//       endPoint: 'diylocations',
//       img_active:'../../assets/Icons/diy-selected.png',
//       state:false
//     }
//   ];
@Injectable({
  providedIn: "root",
})
export class MenuService {
  public menuList$ = new BehaviorSubject(newMenuList);
  public setSelectedMenu$ = new Subject();
  public selectedMenu$ = new BehaviorSubject(newMenuList[0].key);
  constructor(protected _http: HttpClient) {
    this.setSelectedMenu$.subscribe((value: string) =>
      this.selectedMenu$.next(value)
    );
  }
}
