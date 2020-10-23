import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { environment } from "./../../../environments/environment.prod";
import { DataService } from "../../services/data.service";
import { ToasterService } from "angular2-toaster";
import { MapService } from "src/app/services/map.service";
import { newMenuList, MenuService } from "src/app/services/menu.service";

@Component({
  selector: "app-infowindow-content",
  templateUrl: "./infowindow.component.html",
  styleUrls: ["./infowindow.component.css"],
})
export class InfowindowComponent implements OnInit, OnChanges {
  @Input() selectedInfo;
  defaultImage = "";
  image = "";
  initial_stars = "0";
  image_show: boolean = false;
  supporters = 0;
  comments = "";
  comment_post = "";
  commentslist = [];
  postRating = 0;
  selected_values = "";
  selectedMenu;
  public global_userId = "1";
  issueFields: boolean = false;
  assetFields: boolean = false;
  disabled:boolean=false;
  selectedValue = "";
  statuslist = [
    {
      id: 1,
      name: "Open"
    },
    {
      id: 2,
      name: "Closed"
    },
  ]
  memers_name = [];
  members_show: boolean = false;
  members_list: any;
  index_global="";
  userId= window.sessionStorage.getItem('personId');

  @Output() closeitem = new EventEmitter<any>();
  constructor(
    private dataService: DataService,
    public toasterService: ToasterService,
    private _mapService: MapService,
    private _menuService: MenuService
  ) {
    this._menuService.selectedMenu$.subscribe((data) => {
      this.selectedMenu = newMenuList.find((item) => item.key === data);
    });
  }

  ngOnInit() {
    // this.initial_stars=this.selectedInfo.avgRating;
    // console.log(this.selectedInfo,"incoming iinfo")
  }

  close_modal() {
    this.closeitem.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    // this contains  all the data
    this.selected_values = changes.selectedInfo.currentValue;
    this.index_global=changes.selectedInfo.currentValue.index;
    console.log(this.selected_values, "this.selected_values ")

    if (changes.selectedInfo.currentValue.formType != 52) {
      this.issueFields = true;
      this.assetFields=false;
    } else {
      console.log("else block")
      this.assetFields=true;
      this.issueFields = false;
      
    }

    if (
      changes.selectedInfo.currentValue.avgRating != " " ||
      changes.selectedInfo.currentValue.avgRating != null
    ) {
      this.initial_stars = changes.selectedInfo.currentValue.avgRating;
    }

    if (changes.selectedInfo.currentValue.supportes != null) {
      this.supporters = changes.selectedInfo.currentValue.supportes.length;
    }

    if (changes.selectedInfo.currentValue.comment != null) {
      this.comments = changes.selectedInfo.currentValue.comment.length;
    }

    this.commentslist = changes.selectedInfo.currentValue.comment;
    // this.selectedValue = changes.selectedInfo.currentValue.status;
    this.image =
      environment.baseURL +
      "large/image/" +
      changes.selectedInfo.currentValue.imgName;
    if (this.image != null) {
      this.image_show = true;
    } else {
      this.image_show = false;
    }

    console.log(changes.selectedInfo.currentValue.members, "members");
    if (changes.selectedInfo.currentValue.members != undefined) {
      this.members_list = changes.selectedInfo.currentValue.members;
      this.members_show = true;

      changes.selectedInfo.currentValue.members.forEach(element => {
        console.log(element.name)
        this.memers_name.push(`${element.name}`);
      });
    } else {
      this.members_show = false;
    }

    if (changes.selectedInfo.currentValue.status == "Open") {
      this.selectedValue = "1";
      this.disabled = false;
    } else {
      this.selectedValue = "2";
      this.disabled = true;
    }

  }

  getRequest = () => {
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
    return _req;
  };

  setUpdatedValue = () => {
    const _locationsList = this._mapService.locationsData$.getValue();
    if (_locationsList && _locationsList.length > 0) {
      const _updatedValue = _locationsList.find(
        (item) => item.id === this.selectedInfo.id
      );
      if (_updatedValue) {
        this.selectedInfo = _updatedValue;
        this.commentslist = _updatedValue.comment;
        this.comments = _updatedValue.comment.length;
        this.supporters = _updatedValue.supportes.length;
        this.initial_stars = _updatedValue.avgRating;
      }
    }
  };
  onRatingSet(ratings: any, card_details: any) {
    let myCurrentLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        myCurrentLocation =
          "" + pos.coords.latitude + ", " + pos.coords.longitude;

        let payload = {
          id: this.selected_values["id"],
          formid: this.selected_values["typeId"],
          rating: ratings,
          location: myCurrentLocation,
        };
        // console.log(payload, "rating information");
        // return true;
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          let _req = this.getRequest();
          this._mapService.getLocations(_req).subscribe(() => {
            this.setUpdatedValue();
            this.toasterService.pop(
              "success",
              "Success",
              "Ratings added successfully"
            );
          });
        });
      });
    }
  }

  post_supporters(supporters: any) {
    this.selected_values["supportes"] = this.global_userId;
    let temp_array = [];
    temp_array.push(this.selected_values["supportes"]);
    let myCurrentLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        myCurrentLocation =
          "" + pos.coords.latitude + ", " + pos.coords.longitude;

        let payload = {
          id: this.selected_values["id"],
          formid: this.selected_values["typeId"],
          supportes: temp_array,
          location: myCurrentLocation,
          userId:  window.sessionStorage.getItem("personId"),
        };
        // console.log(payload, "support information");
        // return true;
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          let _req = this.getRequest();
          this._mapService.getLocations(_req).subscribe(() => {
            this.setUpdatedValue();
            this.toasterService.pop(
              "success",
              "Success",
              "Supporters added successfully"
            );
          });
        });
      });
    }
  }

  post_comments() {
    let myCurrentLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        myCurrentLocation =
          "" + pos.coords.latitude + ", " + pos.coords.longitude;

        let payload = {
          id: this.selected_values["id"],
          formid: this.selected_values["typeId"],
          comment: this.comment_post,
          location: myCurrentLocation,
          userId:  window.sessionStorage.getItem("personId"),
        };
        // console.log(payload, "Comments information");
        // return true;
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          let _req = this.getRequest();
          this._mapService.getLocations(_req).subscribe(() => {
            this.setUpdatedValue();
            this.toasterService.pop(
              "success",
              "Success",
              "Comments added successfully"
            );
          });
        });
      });
    }
  }


  getSelectedvalue(selectedValue) {
    let payload = {
      userId:  window.sessionStorage.getItem("personId"),
      index: this.index_global
    };

    this.members_list.forEach(element => {
      if (element.index == this.userId) {
        this.dataService.update_status(payload).subscribe((formtypelist) => {
          this.toasterService.pop(
            "success",
            "Success",
            "Status updated successfully"
          );
        });
      } 
    });
  }
}
