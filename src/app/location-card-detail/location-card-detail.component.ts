import { Component, OnInit, Input, NgZone , Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToasterService, ToasterConfig } from "angular2-toaster";import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-location-card-detail',
  templateUrl: './location-card-detail.component.html',
  styleUrls: ['./location-card-detail.component.css']
})
export class LocationCardDetailComponent implements OnInit {
  @Input('id') id: string;
  share=false;
  @Output() setActiveRating = new EventEmitter<any>();
  UsersId: any;
  issueInfo: any;
  image_show: boolean = true;
  type:number;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private zone :NgZone,

    private modalService: NgbModal,
    public toasterService: ToasterService,
  ) {}

  ngOnInit() {

    this.id = this.route.firstChild.snapshot.params['id'];
    this.type=this.route.firstChild.snapshot.params['type'];
    if(this.id){
      let payload = {
        uid: this.id,
      };
      try {
        if(this.type == 52){
          this.dataService
          .getAssetDetailByID(payload)
          .subscribe((response) => {
            this.issueInfo = response[0];
            this.issueInfo.formType=this.type;
          });
        }else{
          this.dataService
          .getIssueDetailById(payload)
          .subscribe((response) => {
            this.issueInfo = response[0];
          });
        }
       
      } catch (error) {
        console.log(error)
      }
    }
    
  }
  onRatingSet(ratings: any) {
    this.dataService.checkUser();
    this.zone.run(()=>{
      this.setActiveRating.emit(ratings);
    })
   
  }


  post_comment(comments: any, card_details: any) {
    // this.spinner_show = true;
    // return true;
    // let myCurrentLocation;
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition((pos) => {
        // myCurrentLocation =
        //   "" + pos.coords.latitude + ", " + pos.coords.longitude;

        let payload = {
          id: card_details.id,
          formid: card_details.typeId,
          comment: comments,
          // location: myCurrentLocation,
          userId: window.sessionStorage.getItem("personId"),
        };
        // console.log(payload, "Comments information");
        // return true;
        // this.spinner_show=true;
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          // this.spinner_show = false;
           this.toasterService.pop(
            "success",
            "Success",
            "Comments added successfully"
          );
        });
      // });
    }
  }
  public send_supporter = [];
  Post_Supporters(supporters: any, card_details: any) {
    console.log(supporters, "incoming supporters");

    // let myCurrentLocation;
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition((pos) => {
        // myCurrentLocation =
        //   "" + pos.coords.latitude + ", " + pos.coords.longitude;

        let payload = {
          id: card_details.id,
          formid: card_details.typeId,
          supportes: supporters,
          // location: myCurrentLocation,
        };
        // console.log(payload, "support information");
        // return true;
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          this.toasterService.pop(
            "success",
            "Success",
            "Ratings added successfully"
          );
          this.modalService.dismissAll();
        });
      // });
    }
  }
  post_rating(ratings: any, card_details: any) {
    // let myCurrentLocation;
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition((pos) => {
        // myCurrentLocation =
        //   "" + pos.coords.latitude + ", " + pos.coords.longitude;

        let payload = {
          id: card_details.id,
          formid: card_details.typeId,
          rating: ratings,
          // location: myCurrentLocation,
        };
        // console.log(payload, "rating information");
        // return true;
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          this.toasterService.pop(
            "success",
            "Success",
            "Ratings added successfully"
          );
          this.modalService.dismissAll();
        });
      // });
    }
  }


}
