import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { DataService } from "../../services/data.service";
import { ToasterService } from "angular2-toaster";
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsComponent } from 'src/app/google-maps/google-maps.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: "app-locationcard",
  templateUrl: "./locationcard.component.html",
  styleUrls: ["./locationcard.component.css"],
})
export class LocationcardComponent implements OnInit {
  public global_userId = "1";
  public incoming_array = ["1", "2", "3"];
  @Input() info;

  @Input() categorylist;
  @Input() share;
  @Input() cardindex;
  @Input() spinner_show = false;

  @Output() setActiveRating = new EventEmitter<any>();
  @Output() setActiveCommenting = new EventEmitter<any>();
  @Output() setActiveSupporters = new EventEmitter<any>();
  @Output() setActiveRemoveitem = new EventEmitter<any>();
  @ViewChild('selectpicker') selectPicker: ElementRef;
  @ViewChild("imageUpload") private imageUploadRef: TemplateRef<Object>;

  imageUrl = '../../../assets/noImage.png';
  image = '';
  commentImage = '../../../assets/noImage.png';
  isAllowed = false;
  comments: string = "";
  conversation:string =""
  user_disabled = "";
  initial_stars = "0";
  supporters_count = 0;
  comment_count = 0;
  conversation_count=0;
  comment_list: any = [];
  conversation_list: any = [];
  members_list: any;
  image_show: boolean = true;
  disabled: boolean = false;
  assetFields: boolean = false;
  issueFields: boolean = false;
  campaignFields: boolean = false;
  ideaFields: boolean = false;
  caseFields: boolean = false;
  solutionFields:boolean=false;
  workingHoursClose: string = "";
  workingHoursOpen: string = "";
  contactName: string = "";
  contactNumber: string = "";
  targetdate: string = "";
  fund: string = "";
  mentor: string = "";
  address: string = "";
  enddate: string = "";
  createdBy: string = "";
  url: string = "";
  type: string = "";
  catName: string = "";
  selectedValue = "";
  memers_name = [];
  cardId = "";
  issueCard="";

  heartIcons = {
    empty: '../assets/Icons/star.png',
    half: '../../assets/Icons/star.png',
    full: '../assets/Icons/star-selected.png',
  }
  userId = window.sessionStorage.getItem('personId');
  username = window.sessionStorage.getItem('userName');
  userImage = window.sessionStorage.getItem('imageurl');
  // added for edit card
  selectedFile = null
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  localCompressedURl: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageName: any;
  coordinates: Coordinates;
  current_location: string = "";
  private geoCoder;
  modelValueAsDate: Date = new Date();
  statuslist = [
    {
      id: 1,
      name: "Open",
    },
    {
      id: 2,
      name: "Closed",
    },
  ]
  locationForm: FormGroup;



  constructor(private dataService: DataService, private zone: NgZone,
    public toasterService: ToasterService,
    private modalService: NgbModal,
    private imageCompress: NgxImageCompressService,
    private mapsAPILoader: MapsAPILoader,
    private fb: FormBuilder,
    public router: Router) {
      this.locationForm = this.fb.group({
        name: ['',[Validators.required]],
        description:['',Validators.required],
        address:['',Validators.required],
        catName:[''],
        contactName:[''],
        contactNumber:['',[Validators.pattern("^[0-9-]*$"), Validators.minLength(10), Validators.maxLength(11)]],
        workingHoursOpen:[''],
        workingHoursClose:[''],
        targetdate:[''],
        fund : [''],
       mentor : [''],
        url: [''],
        type:['']
      });
  }
  get location() { return this.locationForm.controls; }

  public getColor(balance: string): string {
    return balance == "Open" ? "green" : "red";
  }

  ngOnInit() {
    this.getLocationCards();
   
  }

  public getLocationCards () {
    this.locationForm.patchValue({
      name: this.info.name,
      description:this.info.description,
      address:this.info.address,
      catName:this.info.catName,
      contactName:this.info.contactName,
      contactNumber:this.info.contactNumber,
      workingHoursOpen:this.info.workingHoursOpen,
      workingHoursClose:this.info.workingHoursClose,
      targetdate:this.info['targetdate'],
      fund : this.info['fund'],
     mentor : this.info['mentor'],
      url: this.info['url'],
      type:this.info['type']
    })
    this.cardId = "card" + this.cardindex;
    this.issueCard = "isssuecard" + this.cardindex;
    this.locationForm.patchValue({
      name: this.info.name,
      description:this.info.description,
      address:this.info.address,
      catName:this.info.catName,
      contactName:this.info.contactName,
      contactNumber:this.info.contactNumber,
      workingHoursOpen:this.info.workingHoursOpen,
      workingHoursClose:this.info.workingHoursClose,
      targetdate:this.info['targetdate'],
      fund : this.info['fund'],
     mentor : this.info['mentor'],
      url: this.info['url'],
      type:this.info['type']
    })
    this.workingHoursClose = this.info["workingHoursClose"];
    this.workingHoursOpen = this.info["workingHoursOpen"];
    this.contactName = this.info["contactName"];
    this.contactNumber = this.info["contactNumber"];
    this.targetdate = this.info["targetdate"];
    this.fund = this.info["fund"];
    this.mentor = this.info["mentor"];
    this.address = this.info["address"];
    this.createdBy = this.info["createdBy"];
    this.url = this.info["url"];
    if (this.url) {
      this.url = this.url.startsWith("http") ? this.url : "http://" + this.url;
    }
    this.enddate = this.info["enddate"];
    this.type = this.info["type"];
    this.catName = this.info["catName"];
    this.imageUrl =
      environment.baseURL + "large/image/" + this.info["creatorImg"];

    if (this.info.imgName) {
      this.image_show = true;
      this.image = environment.baseURL + "large/image/" + this.info.imgName;
    } else {
      this.image_show = false;
    }

    if (this.info.formType == 49) {
      //report issue 49
      this.assetFields = false;
      this.campaignFields = false;
      this.ideaFields = false;
      this.caseFields = false;
      this.issueFields = true;
      this.solutionFields = false;
    } else if (this.info.formType == 52) {
      //report asset 52
      this.issueFields = false;
      this.campaignFields = false;
      this.ideaFields = false;
      this.caseFields = false;
      this.assetFields = true;
      this.solutionFields = false;
    } else if (this.info.formType == 51) {
      //campaign 51
      this.issueFields = false;
      this.assetFields = false;
      this.ideaFields = false;
      this.caseFields = false;
      this.campaignFields = true;
      this.solutionFields = false;
    } else if (this.info.formType == 50) {
      //idea 50
      this.issueFields = false;
      this.assetFields = false;
      this.campaignFields = false;
      this.caseFields = false;
      this.ideaFields = true;
      this.solutionFields = false;
    } else if (this.info.formType == 53) {
      //case study 53
      this.issueFields = false;
      this.assetFields = false;
      this.campaignFields = false;
      this.ideaFields = false;
      this.caseFields = true;
      this.solutionFields = false;
    } else if (this.info.formType == 57) {
      // actofsolution
      this.solutionFields= true;
      this.issueFields = false;
      this.assetFields = false;
      this.campaignFields = false;
      this.ideaFields = false;
      this.caseFields = false;
    }

    if (this.members_list) {
      this.isAllowed =
        this.members_list.find((m) => m.index == this.userId) != undefined;
    }
    if (!this.isAllowed) {
      this.isAllowed = this.info.userId == this.userId;
    }

    this.info["expanded"] = false;
    if (this.info.supportes != null) {
      this.initial_stars = this.info.avgRating;
      this.supporters_count = this.info.supportes.length;
      this.comment_count = this.info.comment.length;
      this.comment_list = this.info.comment;
      if(this.info.formType !== 52) {
        this.conversation_list = this.info.conversation;
        if (this.info.conversation) {
          this.conversation_count = this.info.conversation.length;
        }
      }
      
      this.commentImage = environment.baseURL + "large/image/";
      this.members_list = this.info.members;
      if (this.info.status == "Open") {
        this.selectedValue = "1";
        this.disabled = false;
      } else {
        this.selectedValue = "2";
        this.disabled = true;
      }

      if (this.info.members != undefined) {
        this.info.members.forEach((element) => {
          this.memers_name.push(`${element.name}`);
        });
      }

      if (this.info.supportes != 0) {
        this.info.supportes.forEach((element) => {
          if (element === this.userId) {
            this.user_disabled = element;
          } else {
            this.user_disabled = "";
          }
        });
      }
    }
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

 
  public deleteComments(commentid, index) {
      try {
        if ((this.info.formType == "52" || this.info.formType == "6")) {
          this.dataService
            .deleteAssetCommentsById(commentid)
            .subscribe((res) => {
              this.zone.run(() => {
                if(res['affected'] === 1){
                index = this.comment_list.findIndex(function(com) {
                  return com.id === commentid;
              });
                if (index > -1) {
                  this.comment_list.splice(index, 1);
                }
                this.toasterService.pop(
                  "success",
                  "Success",
                  "Comment deleted"
                );
              }else{
                this.toasterService.pop(
                  "error",
                  "Failed",
                  "Failed to delete comment"
                );
              }
                this.getLocationCards();
              });
            });
        } else{
          this.dataService
          .deleteIssueCommentsById(commentid)
          .subscribe((res) => {
            this.zone.run(() => {
              if(res['affected'] === 1){
                index = this.comment_list.findIndex(function(com) {
                  return com.id === commentid;
              });
                if (index > -1) {
                  this.comment_list.splice(index, 1);
                }
                this.toasterService.pop(
                  "success",
                  "Success",
                  "Comment deleted"
                );
              }else{
                this.toasterService.pop(
                  "error",
                  "Failed",
                  "Failed to delete comment"
                );
              }
              this.getLocationCards();
            });
          });
        } 
      } catch (error) {
        this.toasterService.pop(
          "error",
          "Failed",
          "Failed to delete comment"
        );
      }
  }
public deleteConversation(id,index){
  this.dataService
  .deleteIssueConversation(id)
  .subscribe((res) => {
    this.zone.run(() => {
      if(res['affected'] === 1){
        index = this.conversation_list.findIndex(function(com) {
          return com.id === id;
      });
        if (index > -1) {
          this.conversation_list.splice(index, 1);
        }
        this.conversation_count = this.conversation_list.length
        this.toasterService.pop(
          "success",
          "Success",
          "Update deleted"
        );
      }else{
        this.toasterService.pop(
          "error",
          "Failed",
          "Failed to delete update"
        );
      }
      this.getLocationCards();
    });
  },err=> {
    this.toasterService.pop(
      "error",
      "Failed",
      "Failed to delete update"
    );
  });
}
  public navigate(info): void {
    console.log(info)
    let evetype=''
    if (info.formType===49 || info.formType===52){
      evetype='report share'
    }
    if (info.formType==51) {
      evetype = 'campaign share'
    }
    const payload = {
      event :evetype,
      userId:window.sessionStorage.getItem("personId")
      }
      if (evetype!=''){
    this.dataService.postSniscore(payload).subscribe(data=>{
      console.log(data)
    })
      }
    this.zone
      .run(() =>
     
        this.router.navigate(["locationcardDetail", info.formType, info.id])
      )
      .then();
  }

  updateImage() {
    this.zone.run(() => {
      this.modalService
        .open(this.imageUploadRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {
          // console.log(result, "res")

        });
    })

  }
  close() {
    document.getElementById("assignee_close").click();
  }
  onFileSeletcted(event) {
    this.selectedFile = event.target.files[0]
    let that = this;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      //me.modelvalue = reader.result;
      let localUrl = event.target.result;
      //that.compressFile(localUrl,that.selectedFile['name']);
      var fileName = that.selectedFile['name'];
      var image = localUrl;
      var orientation = -1;
      this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
          this.imageName = fileName;
          this.image = this.localCompressedURl;
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          const imageFile = new File([result], this.imageName, { type: 'image/jpeg' });
        });
      // this.abibase64Img = reader.result
    };
    reader.readAsDataURL(this.selectedFile);
    reader.onerror = function (error) {
      // console.log('Error: ', error);
    };

  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  updateLocation() {
    const modalRef = this.modalService.open(GoogleMapsComponent, {});
    let data = {
      lat: this.info.lat,
      long: this.info.long,
      adress: this.info.address,
    };
    // this.coordinates = data;
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result != 'dismiss') {
          this.info.address = result.address.formatted_address;
          this.info.lat = result.latitude
          this.info.long = result.longitude
          this.coordinates = result;
        }

      },
      (reason) => { }
    );
  }
  editCard(action) {
    this.zone.run(() => this.info.editable = !this.info.editable);
    let selectedCategory
    this.categorylist.forEach(element => {
      if (element.type === this.locationForm.value.catName) {
        selectedCategory = element.index
      }
    });
    if (action == 'update') {
      this.dataService.checkUser().then(isLoggedIn => {
        if (isLoggedIn) {
          this.zone.run(() => {
                    let payload, imgName;
                    if (this.imageName) {
                      imgName = this.imageName
                    } else {
                      imgName = this.info.imgName
                    }

                    if (this.info.formType === 52) {

                      payload = {
                        "form_data": {
                          description: this.locationForm.value.description,
                          name: this.locationForm.value.name,
                          "contactNumber": this.locationForm.value.contactNumber,
                          "contactPersonName": this.locationForm.value.contactName,
                          "workingHoursOpen": this.locationForm.value.workingHoursOpen,
                          "workingHoursClose": this.locationForm.value.workingHoursClose,
                        },
                        selectedAddress: this.coordinates,
                        submissionTypeId: this.info.sub_id,
                        typeId: this.info.typeId,
                        userId: window.sessionStorage.getItem("personId"),
                        index: this.info.index,
                        category: selectedCategory,
                        ImageData: this.localCompressedURl,
                        imageName: imgName
                      }
                      if (this.coordinates) {
                        payload['locationId'] = this.info.locationId
                      }
                      // console.log(this.isAllowed)
                      // if (this.isAllowed) {
                      this.dataService.editassetDetails(payload, this.info.id).subscribe((data) => {
                        this.toasterService.pop(
                          "success",
                          "Success",
                          " updated successfully"
                        );
                        this.info.name = this.locationForm.value.name
                        this.info.description = this.locationForm.value.description
                        // this.info =  this.locationForm.value.address
                        this.info.catName = this.locationForm.value.catName
                        this.info.contactName = this.locationForm.value.contactName
                        this.info.contactNumber = this.locationForm.value.contactNumber
                        this.info.workingHoursOpen = this.locationForm.value.workingHoursOpen
                        this.info.workingHoursClose = this.locationForm.value.workingHoursClose


                      });
                      // }
                    } else {
                      payload = {
                        "form_data": {
                          "name": this.locationForm.value.name,
                          // "activityName ": "test",
                          "description": this.locationForm.value.description,
                          "URL": this.locationForm.value.url,
                          "needMentorship": this.locationForm.value.mentor,
                          "contactNumber": this.locationForm.value.contactNumber,
                          "contactPersonName": this.locationForm.value.contactName,
                          "deadline": this.locationForm.value.targetdate,
                          "amountOfFunding": this.locationForm.value.fund,
                          // "issueType": "Report",
                        },
                        selectedAddress: this.coordinates,
                        "assigned_users": [],
                        submissionTypeId: this.info.sub_id,
                        typeId: this.info.typeId,
                        index: this.info.index,
                        category: selectedCategory,
                        userId: window.sessionStorage.getItem("personId"),
                        "ImageData": this.localCompressedURl,
                        "imageName": imgName
                      }
                      if (this.coordinates) {
                        payload['locationId'] = this.info.locationId
                      }
                      // if (this.isAllowed) {
                      this.dataService.editissueDetails(payload, this.info.id).subscribe((data) => {

                        this.toasterService.pop(
                          "success",
                          "Success",
                          " updated successfully"
                        );
                        this.info.name = this.locationForm.value.name
                        this.info.description = this.locationForm.value.description
                        // this.info =  this.locationForm.value.address
                        this.info.catName = this.locationForm.value.catName
                        this.info.contactName = this.locationForm.value.contactName
                        this.info.contactNumber = this.locationForm.value.contactNumber
                        this.info.workingHoursOpen = this.locationForm.value.workingHoursOpen
                        this.info.workingHoursClose = this.locationForm.value.workingHoursClose
                        this.info.targetdate = this.locationForm.value.targetdate
                        this.info.fund = this.locationForm.value.fund
                        this.info.mentor = this.locationForm.value.mentor
                        this.info.url = this.locationForm.value.url
                        this.info.type = this.locationForm.value.type
                      });
                      // }
                    }

          })
        }
      })

    }

  }
  getAddressParts(map_address) {
    let address = {};
    const address_components = map_address.address_components;
    address_components.forEach((element) => {
      address[element.types[0]] = element.short_name;
    });
    return address;
  }
  getSelectedvalue(event) {
    let payload = {
      userId: window.sessionStorage.getItem("personId"),
      index: this.info.index,
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

  expand(id: any) {
    this.info.expanded = !id.expanded;
  }

  onRatingSet(ratings: any) {
    this.dataService.checkUser();
    this.zone.run(() => {
      if (navigator.geolocation) {
        let payload = {
          id: this.info.id,
          formid: this.info.typeId,
          rating: ratings,
          // location: myCurrentLocation,
        };
        this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
          this.toasterService.pop(
            "success",
            "Success",
            "Ratings added successfully"
          );
        });
      }
    });
  }

  post_comments() {
    this.dataService.checkUser().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.zone.run(() => {
          let commentId = ''
          this.setActiveCommenting.emit(this.comments);
          if (navigator.geolocation) {
            let payload = {
              id: this.info.id,
              formid: this.info.typeId,
              comment: this.comments,
              // location: myCurrentLocation,
              userId: window.sessionStorage.getItem("personId"),
            };
            this.dataService.post_ratingdata(payload).subscribe((formtypelist) => {
               commentId = formtypelist['Comments']['cid']
                this.comment_list.push({ id:commentId,text: this.comments, name: this.username, commenterPic: this.userImage })
              // this.spinner_show = false;
              this.toasterService.pop(
                "success",
                "Success",
                "Comments added successfully"
              );
              setTimeout(() => {
                this.comments = null
              }, 100);
            });
            // });
          }
          
         
        });
      }
    });
  }
  post_updates() {
    this.dataService.checkUser().then(isLoggedIn => {
      if (isLoggedIn) {
        this.zone.run(() => {
          // this.setActiveCommenting.emit(this.comments);
          if (navigator.geolocation) {
            let payload = {
              id: this.info.id,
              formid: this.info.typeId,
              conversation: this.conversation,
              // location: myCurrentLocation,
              userId: window.sessionStorage.getItem("personId"),
            };
            this.dataService.addConversation(payload).subscribe((res:any) => {
              // this.spinner_show = false;
              this.toasterService.pop(
                "success",
                "Success",
                "Update added successfully"
              );

              this.conversation_list.push({id:res.cid, Conversation: this.conversation, name: this.username, commenterPic: this.userImage })
          //  console.log(this.conversation_list)
          this.conversation_count = this.conversation_list.length

           setTimeout(() => {
            this.conversation = null
          }, 0);
            });
            // });
            
          }

         
        });
      }
    });
  }
  remove_item(id: any) {
    this.setActiveRemoveitem.emit(id);
  }
  supporters() {
    this.dataService.checkUser();
    let payload = {
      id: this.info["id"],
      formid: this.info["typeId"],
      supportes: window.sessionStorage.getItem("personId"),
      userId: window.sessionStorage.getItem("personId"),
    };
    this.dataService.post_ratingdata(payload).subscribe((response) => {
      this.zone.run(() => {
        if (response['text'] == 1) {
          this.supporters_count++;
          this.toasterService.pop(
            "success", "",
            "Thanks for supporting"
          );
        }
        if (response['text'] == 0) {

          this.toasterService.pop(
            "success", "",
            "You have supported already"
          );
        }
      });
    });
  }

  checkUser() {
    this.dataService.checkUser();
  }
  clickcollapse() {
    this.zone.run(() =>  {
      this.info.colComment = !this.info.colComment
      if (this.info.colComment) {
        this.info.colIssue = false;
      }
    });
  }
  collapseIssue() {
    this.zone.run(() =>  {
      this.info.colIssue = !this.info.colIssue
      if (this.info.colIssue) {
        this.info.colComment = false;
      }
    });
  }
  getLocalHelp(){
    window.open("https://api.whatsapp.com/send/?phone=919513607460&text=LocalHelp", "_blank");
  }
}
