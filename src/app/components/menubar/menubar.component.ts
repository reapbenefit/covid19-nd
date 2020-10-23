import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  SimpleChange,
} from "@angular/core";
import { Menu } from "src/app/services/menu.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FilterserviceService } from "src/app/services/filterservice.service";

@Component({
  selector: "app-menubar",
  templateUrl: "./menubar.component.html",
  styleUrls: ["./menubar.component.css"],
})
export class MenubarComponent implements OnInit {
  @Input() menuList: Array<Menu>;
  @Input() activeMenu: string;
  @Input() isMobileView: boolean;
  @Input() URL: any;
  @Output() setActiveMenu = new EventEmitter<any>();
  @Output() openExternalLink = new EventEmitter<any>();
  url: SafeResourceUrl;
  menuItems;
  // aditionaldiv:boolean=true;

  imagesList = [];

  subMenuList = [
    "https://neighbourhood.solveninja.org/",
    "https://forum.solveninja.org/",
  ];

  show_subment: boolean;
  ifram_show: boolean;
  map_show: boolean;
  mob_view: boolean;

  constructor(
    private router: Router,
    public sanitizer: DomSanitizer,
    private _filterService: FilterserviceService
  ) { }

  ngOnInit() {
    if (this.isMobileView) {
      this.menuItems =
        this.menuList &&
        this.menuList.length > 0 &&
        this.menuList.filter(
          (o) => o.key !== "discourse" && o.key !== "dashboard"
        );
    } else {
      this.menuItems =
        this.menuList &&
        this.menuList.length > 0 &&
        this.menuList.filter((o) => o.key !== "externallinks");
    }

    this.menuItems.forEach((menu: Menu) => {
      this.imagesList.push({
        key: menu.key,
        active: menu.img_active,
        inActive: menu.img,
        state: false,
      });
    });
  }

  setActiveMenuItem = (menuItem, indes) => {
    this._filterService.getFiltersList$().subscribe(() => {
      const _menuItem = {
        menuItem,
        show_subment: this.isMobileView,
      };
      this.setActiveMenu.emit(_menuItem);
      if (menuItem.key === "dashboard" && !this.isMobileView) {
        this.openExternalLink.emit("https://neighbourhood.solveninja.org/");
      } else if (menuItem.key === "discourse" && !this.isMobileView) {
        this.openExternalLink.emit("https://forum.solveninja.org/");
      }
    });
  };
}
