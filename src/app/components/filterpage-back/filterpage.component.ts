import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FilterserviceService } from "src/app/services/filterservice.service";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { MapService } from "src/app/services/map.service";
import { MenuService, newMenuList } from "src/app/services/menu.service";

@Component({
  selector: "app-filterpage",
  templateUrl: "./filterpage.component.html",
  styleUrls: ["./filterpage.component.css"],
})
export class FilterpageComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  filterList;
  searchFilterList;
  locationsList;

  activeIds: any[] = [];
  control = new FormControl("");
  selectedItem;
  searchKeyword;
  filteredlocationsList;
  selectedMenu;

  constructor(
    private _filterService: FilterserviceService,
    public router: Router,
    private _mapService: MapService,
    private _menuService: MenuService
  ) {
    this._mapService.unFilteredLocationsData$.subscribe((data) => {
      if (data) {
        this.locationsList = data;
      } else {
        this.locationsList = [];
      }
    });

    this._filterService.appliedSearchKeyword.subscribe((data) => {
      this.searchKeyword = data;
    });

    this._menuService.selectedMenu$.subscribe((data) => {
      this.selectedMenu = newMenuList.find((item) => item.key === data);
    });

    this._filterService.searchFilterList.subscribe((data) => {
      if (this.selectedMenu && this.selectedMenu.id) {
        this.searchFilterList = data.filter((item) => {
          return this.selectedMenu.id.some(
            (sItem) => item.FormType_index === sItem
          );
        });
      } else if (this.locationsList && this.locationsList.length > 0) {
        const id = this.locationsList.map((i) => i.formType);
        this.searchFilterList = data.filter((item) => {
          return id.some((sItem) => item.FormType_index === sItem);
        });
      } else {
        this.searchFilterList = data;
      }
    });

    this._filterService.filtersList$.subscribe((list) => {
      if (list && list.length > 0) {
        this.filterList = this.setFilters(list);
      } else {
        this.filterList = [];
      }
      this._filterService.setSearchFilterList(this.filterList);
    });
  }

  ngOnInit() {}
  /* search */
  onSearchKeyChange = (event) => {
    this.searchKeyword = event;
    this.filteredlocationsList =
      this.locationsList &&
      this.locationsList.length > 0 &&
      this.locationsList.filter((location) => {
        return (
          location.name.toLowerCase().includes(event.toLowerCase()) ||
          location.description.toLowerCase().includes(event.toLowerCase())
        );
      });
  };

  onCloseSearch = () => {
    this.onClose.emit(false);
  };

  onSearchGoClick = () => {
    this._filterService.setSeachedItem(this.searchKeyword).then(() => {
      let _req = {
        key: "pins",
        endPoint: "reports",
      };
      if (this.selectedMenu) {
        _req = {
          key: this.selectedMenu.key,
          endPoint: this.selectedMenu.endPoint,
        };
      }
      this._mapService.getLocations(_req).subscribe(() => {
        this.onCloseSearch();
      });
    });
  };

  /* search end /


  /* filter accordion */

  isExistInActiveIds = (formType): boolean => {
    return (
      this.activeIds &&
      this.activeIds.length > 0 &&
      this.activeIds.some((id) => id === formType)
    );
  };

  togglePanel = (panel) => {
    if (
      this.activeIds &&
      this.activeIds.length > 0 &&
      this.activeIds.some((id) => id === panel)
    ) {
      this.activeIds = this.activeIds.filter((id) => id !== panel);
    } else {
      this.activeIds.push(panel);
    }
  };
  /* filter accordion end */

  /* filter */
  onApplyFilterClick = (isFromOtherFunct = false) => {
    this.searchKeyword = "";
    this._filterService.setSeachedItem(this.searchKeyword).then(() => {
      this._filterService
        .setAppliedFilterList(this.searchFilterList)
        .then(() => {
          let _req = {
            key: "pins",
            endPoint: "reports",
          };
          if (this.selectedMenu) {
            _req = {
              key: this.selectedMenu.key,
              endPoint: this.selectedMenu.endPoint,
            };
          }
          this._mapService.getLocations(_req).subscribe(() => {
            if (!isFromOtherFunct) {
              this.onCloseSearch();
            }
          });
        });
    });
  };
  setFilters = (list) => {
    let forms: any = [];
    const appliedFilterList = this._filterService.appliedFilterList.getValue();
    if (appliedFilterList && appliedFilterList.length > 0) {
      appliedFilterList.forEach((item) => {
        const _chekedItems = item.forms.filter((sItem) => sItem.checked);
        forms.push(_chekedItems);
      });
    }
    const _filtersList = forms.flat();
    return list.map((item) => {
      return Object.assign({}, item, {
        checked: this.isSubFormsAllChecked(item, _filtersList),
        forms: item.forms.map((subItem) => {
          return Object.assign({}, subItem, {
            checked:
              (this.locationsList &&
                this.locationsList.length > 0 &&
                this.locationsList.some(
                  (i) => i.key === subItem.Forms_index
                )) ||
              (_filtersList &&
                _filtersList.length > 0 &&
                _filtersList.some(
                  (i) => i.Forms_index === subItem.Forms_index
                )),
          });
        }),
      });
    });
  };
  isSubFormsAllChecked = (item, _filtersList) => {
    const filterBoolList = item.forms.map((subItem) => {
      return (
        (this.locationsList &&
          this.locationsList.length > 0 &&
          this.locationsList.some((i) => i.key === subItem.Forms_index)) ||
        (_filtersList &&
          _filtersList.length > 0 &&
          _filtersList.some((i) => i.Forms_index === subItem.Forms_index))
      );
    });
    return !filterBoolList.some((s) => s === false);
  };

  onFormTypeChange = (item, event) => {
    this.checkOrUncheckByFormType(item.FormType_index, event.checked);
  };

  onFormChange = (parent, selectedItem, event) => {
    const isAllSubItemsChecked = parent.forms.some(
      (formItem) => formItem.checked === false
    );
    if (!isAllSubItemsChecked) {
      this.checkOrUncheckByFormType(parent.FormType_index, true);
    } else {
      this.checkOrUncheckByFormType(parent.FormType_index, false, true);
    }
  };

  checkOrUncheckByFormType = (key, flag, isParent = false) => {
    const list = this.searchFilterList.map((item) => {
      if (key === item.FormType_index) {
        return Object.assign({}, item, {
          checked: flag,
          forms: isParent
            ? item.forms
            : item.forms.map((subItem) => {
                return Object.assign({}, subItem, {
                  checked: flag,
                });
              }),
        });
      } else {
        return item;
      }
    });
    console.log("list", list);
    this._filterService.setSearchFilterList(list).then(() => {
      // this.onApplyFilterClick(true);
    });
  };
  /* filter end */
}
