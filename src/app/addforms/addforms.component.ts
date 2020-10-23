import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { DataService } from "../services/data.service";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { GoogleMapsComponent } from "../google-maps/google-maps.component";
import { ToasterService } from "angular2-toaster";
declare const google: any;
import { MapsAPILoader } from "@agm/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { MenuService, newMenuList } from "src/app/services/menu.service";
import { MapService } from "src/app/services/map.service";
import { NgxImageCompressService } from "ngx-image-compress";

@Component({
  selector: "app-addforms",
  templateUrl: "./addforms.component.html",
  styleUrls: ["./addforms.component.css"],
})
export class AddformsComponent implements OnInit {
  @Input("id") id: string;
  form_title: string;
  form_type_list: any;
  formtypelistdata: any;
  preview_fields: any;
  selectedValue = "Select Form Types";
  global_form_id: string = "";
  coordinates: Coordinates;
  public orgUserdata: any;
  public organisations: any;
  public categorylist: any;
  public assigneelist: any;
  public checkedcategoryRows: any;
  public checkedassigneeRows: Array<any> = [];
  current_location: string = "";
  private geoCoder;
  public checkedRows: Array<any> = [];
  public checkedorgRows: Array<any> = [];
  selectedRow: Number;
  selectedorgRow: Number;
  modalReference: NgbModalRef;
  selectedMenu;
  selectedFile = null;
  isNewUser: boolean = false;
  @ViewChild("preview_form_details")
  private preview_form_details_needyRef: TemplateRef<Object>;
  @ViewChild("Userlist") private UserlistRef: TemplateRef<Object>;
  @ViewChild("Orglist") private OrglistRef: TemplateRef<Object>;
  @ViewChild("categorymodal") private categoryRef: TemplateRef<Object>;
  @ViewChild("assignemodal") private assigneeRef: TemplateRef<Object>;
  @ViewChild("imageUpload") private imageUploadRef: TemplateRef<Object>;

  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageName: any;
  activeMenu: string;
  public Url: string;

  constructor(
    public dataService: DataService,
    private modalService: NgbModal,
    public toasterService: ToasterService,
    private mapsAPILoader: MapsAPILoader,
    public router: Router,
    private _menuService: MenuService,
    private _mapService: MapService,
    private cdr: ChangeDetectorRef,
    private imageCompress: NgxImageCompressService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this._menuService.selectedMenu$.subscribe((data) => {
      this.activeMenu = data;
      this.selectedMenu = newMenuList.find((item) => item.key === data);
    });
  }

  ngOnInit() {
    const CurrentUrl = this.router.url.substr(1);
    this.Url = CurrentUrl;
    localStorage.setItem("url", this.Url.toString());
    const isRegisteredUser = localStorage.getItem("isregistered");
    this.id = this.route.firstChild.snapshot.params["id"];
    this.selectedValue = this.route.firstChild.snapshot.params["type"];
    this.global_form_id = this.route.firstChild.snapshot.params["index"];
    let payload = {
      uid: this.id,
    };
    if(isRegisteredUser){
      localStorage.removeItem('url')
      localStorage.removeItem('isregistered')
    }
    this.dataService.getFormById(payload).subscribe((response) => {
      console.log(response)
      this.form_title = response[0].name;
      let payloadcomp = {
        components: response[0].schema
      };
      this.preview_fields = payloadcomp
    });
    this.get_form_type_list();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  public checkUserisNew() {
    this.dataService.checkUser().then((isLoggedin) => {
      isLoggedin;
      console.log(isLoggedin);
      this.isNewUser = true;
    });
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }
  backToFormType() {
    this.router.navigate(["addfunction"]);
  }

  get_form_type_list() {
    this.dataService.getFormtype().subscribe((formtypedata) => {
      this.form_type_list = formtypedata;
    });
  }

  getforminputdata(e) {
    e = e || window.event;
    let temp = e.target.className;
    let temp1 = temp.split(" ");
    if (temp1[3] === "custom_btn_css") {
      const modalRef = this.modalService.open(GoogleMapsComponent, {});
      let data = {
        prop1: "Some Data",
        prop2: "From Parent Component",
        prop3: "This Can be anything",
      };

      modalRef.componentInstance.fromParent = data;
      modalRef.result.then(
        (result) => {
          this.coordinates = result;
        },
        (reason) => {}
      );
    } else if (temp1[3] === "add_user") {
      if (this.organisations) {
        this.selectedOrgItems = this.organisations
          .filter((org) => org.selected)
          .map((org) => org.index);
      }
      let payload = {
        orgid:
          this.selectedOrgItems.length > 0
            ? this.selectedOrgItems
            : window.sessionStorage.getItem("orgId") || "0",
      };

      this.modalService
        .open(this.UserlistRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getorguserdata(payload).subscribe((orguserlist) => {
        this.orgUserdata = orguserlist;
        this.orgUserdata.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
        console.log(this.orgUserdata, "this.orgUserdatathis.orgUserdata");
      });
    } else if (temp1[3] === "org_list") {
      this.modalService
        .open(this.OrglistRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getOrgList().subscribe((orglist) => {
        this.organisations = orglist;
        this.organisations.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
      });
    } else if (temp1[3] === "category_css") {
      console.log("category list blosck");
      this.modalService
        .open(this.categoryRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getCategoryList().subscribe((categlist) => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.categorylist = categlist;
        this.categorylist.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
      });
    } else if (temp1[3] === "add_assignee") {
      if (this.organisations) {
        this.selectedOrgItems = this.organisations
          .filter((org) => org.selected)
          .map((org) => org.index);
      }
      let payload = {
        orgid:
          this.selectedOrgItems.length > 0
            ? this.selectedOrgItems
            : window.sessionStorage.getItem("orgId") || "0",
      };

      this.modalService
        .open(this.assigneeRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});

      this.dataService.getorguserdata(payload).subscribe((orguserlist) => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.assigneelist = orguserlist;
        this.assigneelist.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
        // console.log(this.assigneelist, "this.assigneelist.orgUserdata");
      });
    } else if (temp1[3] === "uploadImg") {
      this.modalService
        .open(this.imageUploadRef, {
          ariaLabelledBy: "modal-basic-title",
          windowClass: "modal_customize_service",
        })
        .result.then((result) => {});
    }
  }

  onFileSeletcted(event) {
    this.selectedFile = event.target.files[0];
    let that = this;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      //me.modelvalue = reader.result;
      let localUrl = event.target.result;
      //that.compressFile(localUrl,that.selectedFile['name']);
      var fileName = that.selectedFile["name"];
      var image = localUrl;
      var orientation = -1;
      this.sizeOfOriginalImage =
        this.imageCompress.byteCount(image) / (1024 * 1024);
      this.imageCompress
        .compressFile(image, orientation, 50, 50)
        .then((result) => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage =
            this.imageCompress.byteCount(result) / (1024 * 1024);
          this.imageName = fileName;
          const imageBlob = this.dataURItoBlob(
            this.imgResultAfterCompress.split(",")[1]
          );
          const imageFile = new File([result], this.imageName, {
            type: "image/jpeg",
          });
        });
      // this.abibase64Img = reader.result
    };
    reader.readAsDataURL(this.selectedFile);
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpeg" });
    return blob;
  }

  getAddressParts(map_address) {
    let address = {};
    const address_components = map_address.address_components;
    address_components.forEach((element) => {
      address[element.types[0]] = element.short_name;
    });
    return address;
  }

  changed(category_id) {
    // this.count = 0;
    this.checkedcategoryRows = category_id.index;
  }

  setClickedRow(index) {
    this.selectedRow = index;
  }

  clickc(value: any) {
    console.log(value);
  }

  setorgClickedRow(index) {
    this.selectedorgRow = index;
  }

  selectedOrgItems = [];
  selected_click(value: any) {
    console.log(value, "org valueee");
  }
  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  tooo() {
    document.getElementById("assignee_close").click();
  }

  submit_form(form_value) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.current_location =
          pos.coords.latitude + ", " + pos.coords.longitude;
        this.geoCoder.geocode(
          { location: { lat: pos.coords.latitude, lng: pos.coords.longitude } },
          (results, status) => {
            this.zone.run(() => {
              const currentaddress = {
                address: {
                  formatted_address: results[0].formatted_address,
                  address_parts: this.getAddressParts(results[0]),
                },
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              };

              // console.log(this.orgUserdata,"org data length")

              if (this.orgUserdata !== undefined) {
                this.orgUserdata = this.orgUserdata.filter((row: any) => {
                  if (row.selected !== false) {
                    this.checkedRows.push(row.index);
                    console.log(this.checkedRows, "members selected");
                  } else {
                    return false;
                  }
                });
              }

              if (this.organisations !== undefined) {
                this.organisations = this.organisations.filter((row: any) => {
                  if (row.selected !== false) {
                    this.checkedorgRows.push(row.index);
                    console.log(this.checkedorgRows, "orgs selected");
                  } else {
                    return false;
                  }
                });
              }

              // if (this.categorylist !== undefined) {
              //   this.categorylist = this.categorylist.filter((row: any) => {
              //     if (row.selected !== false) {
              //       this.checkedcategoryRows="";
              //       this.checkedcategoryRows=row.index;
              //       console.log(this.checkedcategoryRows, "category selected");
              //     } else {
              //       return false;
              //     }
              //   });
              // }

              if (this.assigneelist !== undefined) {
                this.assigneelist = this.assigneelist.filter((row: any) => {
                  if (row.selected !== false) {
                    this.checkedassigneeRows = [];
                    this.checkedassigneeRows.push(row.index);
                    console.log(this.checkedassigneeRows, "category selected");
                  } else {
                    return false;
                  }
                });
              }

              let payload = {
                form_data: form_value["data"],
                selectedAddress: this.coordinates,
                currentAddress: currentaddress,
                submissionTypeId: this.selectedValue,
                members: this.checkedRows,
                form_id: this.global_form_id,
                orgId: this.checkedorgRows,
                assigned_users: this.checkedassigneeRows,
                userId: window.sessionStorage.getItem("personId"),
                category: this.checkedcategoryRows,
                ImageData: this.localCompressedURl,
                imageName: this.imageName,
              };

              this.dataService.submissionForm(payload).subscribe(
                (formtypelist: any) => {
                  if (formtypelist.submission != undefined) {
                    if (formtypelist.submission.selectedAddress != undefined) {
                      this._mapService.currentLat =
                        formtypelist.submission.selectedAddress.latitude;
                      this._mapService.currentLng =
                        formtypelist.submission.selectedAddress.longitude;
                      let menu = newMenuList.find(
                        (m) => m.key == this.activeMenu
                      );
                      if (menu) {
                        this._mapService.getMapLocations$.next({
                          key: menu.key,
                          endPoint: menu.endPoint,
                        });
                      }
                    } else {
                      if (formtypelist.submission.currentAddress != undefined) {
                        this._mapService.currentLat =
                          formtypelist.submission.currentAddress.latitude;
                        this._mapService.currentLng =
                          formtypelist.submission.currentAddress.longitude;
                        let menu = newMenuList.find(
                          (m) => m.key == this.activeMenu
                        );
                        if (menu) {
                          this._mapService.getMapLocations$.next({
                            key: menu.key,
                            endPoint: menu.endPoint,
                          });
                        }
                      }
                    }
                  }
                  this.toasterService.pop(
                    "success",
                    "Success",
                    "Form submitted successfully"
                  );

                  this.router.navigate(["./"]);

                  this.modalService.dismissAll();

                  // let _req = {
                  //   key: "pins",
                  //   endPoint: "reports",
                  // };
                  // if (this.selectedMenu) {
                  //   _req = {
                  //     key: this.selectedMenu.key,
                  //     endPoint: this.selectedMenu.endPoint,
                  //   };
                  // }
                  // console.log(_req,"_req_req");
                  // // this._mapService.updateMapCoordinates();
                  // this._mapService.getLocations(_req, true).subscribe((res) => {
                  //   console.log(res,"location response");
                  //   this.toasterService.pop(
                  //     "success",
                  //     "Success",
                  //     "Form submitted successfully"
                  //   );

                  //   this.router.navigate(["./"])

                  //   this.modalService.dismissAll();
                  // });
                },
                (error) => {}
              );
            });
          }
        );
      });
    }
  }

  close_assignee() {
    document.getElementById("assignee_close").click();
  }

  add_caetgory() {
    document.getElementById("category_close").click();
  }

  add_members() {
    document.getElementById("member_close").click();
  }

  form_type_close() {
    this.modalService.dismissAll();
    this.router.navigate(["./"]);
  }
}
