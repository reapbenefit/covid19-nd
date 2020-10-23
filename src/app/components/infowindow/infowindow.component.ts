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
  imageUrl = '../../../assets/noImage.png';
  commentImage = environment.baseURL + 'large/image/';
  initial_stars = "0";
  image_show: boolean = false;
  supporters = 0;
  comments = "";
  comment_post = "";
  commentslist = [];
  postRating = 0;
  selected_values = "";
  selectedMenu;
  workingHoursClose: string = '';
  workingHoursOpen: string = '';
  contactName: string = '';
  contactNumber: string = '';
  targetdate: string = '';
  fund: string = '';
  mentor: string = '';
  address: string = '';
  enddate: string = '';
  createdBy: string = '';
  url: string = '';
  type: string = '';
  catName: string = '';
  public global_userId = window.sessionStorage.getItem("personId");
  issueFields: boolean = false;
  assetFields: boolean = false;
  campaignFields: boolean = false;
  ideaFields: boolean = false;
  caseFields: boolean = false;
  disabled: boolean = false;
  spinner_show: boolean = false;
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
  isAllowed = false
  members_show: boolean = false;
  members_list: any;
  index_global = "";
  userId = window.sessionStorage.getItem('personId');

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
    this.workingHoursClose = this.selectedInfo['workingHoursClose'];
    this.workingHoursOpen = this.selectedInfo['workingHoursOpen'];
    this.contactName = this.selectedInfo['contactName'];
    this.contactNumber = this.selectedInfo['contactNumber'];
    this.targetdate = this.selectedInfo['targetdate'];
    this.fund = this.selectedInfo['fund'];
    this.mentor = this.selectedInfo['mentor'];
    this.address = this.selectedInfo['address'];
    this.createdBy = this.selectedInfo['createdBy'];
    this.url = this.selectedInfo['url'];
    if (this.url) {
      this.url = this.url.startsWith('http') ? this.url : 'http://' + this.url;
    }
    this.enddate = this.selectedInfo['enddate'];
    this.type = this.selectedInfo['type'];
    this.catName = this.selectedInfo['catName'];
    this.imageUrl = environment.baseURL + 'large/image/' + this.selectedInfo['creatorImg'];

    if (this.members_list) {
      this.isAllowed = this.members_list.find(m => m.index == this.userId) != undefined
    }
    if (!this.isAllowed) {
      this.isAllowed = this.selectedInfo.userId == this.userId
    }
  }

  close_modal() {
    this.closeitem.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected_values = changes.selectedInfo.currentValue;
    this.index_global = changes.selectedInfo.currentValue.index;
    if (changes.selectedInfo.currentValue.formType == 49) {
      //report issue 49
      this.assetFields = false;
      this.campaignFields = false;
      this.ideaFields = false;
      this.caseFields = false;
      this.issueFields = true;
    } else if (changes.selectedInfo.currentValue.formType == 52) {
      //report asset 52
      this.issueFields = false;
      this.campaignFields = false;
      this.ideaFields = false;
      this.caseFields = false;
      this.assetFields = true;
    } else if (changes.selectedInfo.currentValue.formType == 51) {
      //campaign 51
      this.issueFields = false;
      this.assetFields = false;
      this.ideaFields = false;
      this.caseFields = false;
      this.campaignFields = true;
    } else if (changes.selectedInfo.currentValue.formType == 50) {
      //idea 50
      this.issueFields = false;
      this.assetFields = false;
      this.campaignFields = false;
      this.caseFields = false;
      this.ideaFields = true;
    } else if (changes.selectedInfo.currentValue.formType == 53) {
      //case study 53
      this.issueFields = false;
      this.assetFields = false;
      this.campaignFields = false;
      this.ideaFields = false;
      this.caseFields = true;
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
    this.image =
      environment.baseURL +
      "large/image/" +
      this.selectedInfo.imgName;
    if (this.selectedInfo.imgName) {
      this.image_show = true;
    } else {
      this.image_show = false;
    }

    if (changes.selectedInfo.currentValue.members != undefined) {
      this.members_list = changes.selectedInfo.currentValue.members;
      this.members_show = true;
      changes.selectedInfo.currentValue.members.forEach(element => {
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
        this.commentImage = environment.baseURL + 'large/image/';
        this.comments = _updatedValue.comment.length;
        this.supporters = _updatedValue.supportes.length;
        this.initial_stars = _updatedValue.avgRating;
      }
    }
  };

  onRatingSet(ratings: any, card_details: any) {
    this.dataService.checkUser();
    if (navigator.geolocation) {
      let payload = {
        id: this.selected_values["id"],
        formid: this.selected_values["typeId"],
        rating: ratings,
      };
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
    }
  }

  post_supporters(supporters: any) {
    this.dataService.checkUser();
    let myCurrentLocation;
    if (navigator.geolocation) {
      let payload = {
        id: this.selected_values["id"],
        formid: this.selected_values["typeId"],
        supportes: window.sessionStorage.getItem("personId"),
        userId: window.sessionStorage.getItem("personId"),
      };
      this.dataService.post_ratingdata(payload).subscribe((response) => {
        if (response['text'] == 1) {
          //support
          this.supporters++;
          this.toasterService.pop(
            "success", "",
            "Thanks for supporting"
          );
        }
        else if (response['text'] == 0) {
          this.toasterService.pop(
            "success", "",
            "You have supported already"
          );
        }
      });
    }
  }

  post_comments() {
    this.dataService.checkUser().then(isLoggedIn => {
      if (isLoggedIn) {
        if (navigator.geolocation) {
          let payload = {
            id: this.selected_values["id"],
            formid: this.selected_values["typeId"],
            comment: this.comment_post,
            userId: window.sessionStorage.getItem("personId"),
          };
          this.spinner_show = true;
          this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
            let _req = this.getRequest();
            this._mapService.getLocations(_req).subscribe(() => {
              this.comment_post = "";
              this.setUpdatedValue();
              this.spinner_show = false;
              this.toasterService.pop(
                "success",
                "Success",
                "Comments added successfully"
              );
            });
          });
        }
      }
    });
  }

  getSelectedvalue(event) {
    let payload = {
      userId: window.sessionStorage.getItem("personId"),
      index: this.selectedInfo.index
    };
    if (this.isAllowed) {
      this.dataService.update_status(payload).subscribe((formtypelist) => {
        this.toasterService.pop(
          "success",
          "Success",
          "Status updated successfully"
        );
      });
    }
  }

  checkUser() {
    this.dataService.checkUser();
  }

}
