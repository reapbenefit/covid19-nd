import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { DataService } from "../../services/data.service";
import { ToasterService } from "angular2-toaster";

@Component({
  selector: 'app-locationcard',
  templateUrl: './locationcard.component.html',
  styleUrls: ['./locationcard.component.css']
})
export class LocationcardComponent implements OnInit {
  public global_userId = "1";
  public incoming_array = ['1', '2', '3']
  @Input() info;
  @Output() setActiveRating = new EventEmitter<any>();
  @Output() setActiveCommenting = new EventEmitter<any>();
  @Output() setActiveSupporters = new EventEmitter<any>();
  @Output() setActiveRemoveitem = new EventEmitter<any>();
  @ViewChild('selectpicker') selectPicker: ElementRef;
  // defaultImage = '../../assets/Icons/loader.gif';
  image = '';
  comments: string = "";
  user_disabled = "";
  initial_stars = "0";
  supporters_count = 0;
  comment_count = 0;
  comment_list: any;
  members_list: any;
  image_show: boolean = true;
  disabled: boolean = false;
  assetFields: boolean = false;
  issueFields: boolean = false;
  selectedValue = "";
  memers_name = [];
  heartIcons = {
    empty: '../assets/Icons/star.png',
    half: '../../assets/Icons/star.png',
    full: '../assets/Icons/star-selected.png',
  }
  userId =  window.sessionStorage.getItem('personId');
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


  constructor(private dataService: DataService,
    public toasterService: ToasterService,) {


  }

  public getColor(balance: string): string {
    return balance == "Open" ? "green" : "red";
  }

  ngOnInit() {

    console.log(this.info,"info coming")

    if (this.info.imgName != null) {
      this.image_show = true;
      this.image = environment.baseURL + 'large/image/' + this.info.imgName;
    } else {
      this.image_show = false;
    }

    if (this.info.formType != 52) {
      this.assetFields = false;
      this.issueFields = true;
    } else {
      this.assetFields = true;
      this.issueFields = false;
    }

    

    this.info['expanded'] = false;
    console.log(this.info, "supporters loop")
    if (this.info.supportes != null) {
      this.initial_stars = this.info.avgRating;
      console.log(this.initial_stars, "this.initial_stars");
      this.supporters_count = this.info.supportes.length;
      this.comment_count = this.info.comment.length;
      this.comment_list = this.info.comment;
      this.members_list = this.info.members;

      if (this.info.status == "Open") {
        this.selectedValue = "1";
        this.disabled = false;
      } else {
        this.selectedValue = "2";
        this.disabled = true;
      }

      this.info.members.forEach(element => {
        this.memers_name.push(`${element.name}`);
      });
      // console.log(this.memers_name,"members list names")

      if (this.info.supportes != 0) {
        this.info.supportes.forEach(element => {
          if (element === this.global_userId) {
            this.user_disabled = element;
          } else {
            this.user_disabled = "";
          }
        });
      }
    }
  }


  getSelectedvalue(selectedValue) {
    let payload = {
      userId:  window.sessionStorage.getItem("personId"),
      index: this.info.index
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

  expand(id: any) {
    this.info.expanded = !id.expanded;
    console.log("clicked");
  }

  onRatingSet(ratings: any) {
    this.setActiveRating.emit(ratings);
  }

  post_comments() {
    // console.log(this.comments, "comments")
    this.setActiveCommenting.emit(this.comments);
  }

  remove_item(id: any) {
    this.setActiveRemoveitem.emit(id);
  }

  supporters() {
    this.info.supportes = this.global_userId;
    let temp_array = [];
    temp_array.push(this.info.supportes);
    this.setActiveSupporters.emit(temp_array);
  }


}
