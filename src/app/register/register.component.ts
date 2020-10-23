import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  EventEmitter,
} from "@angular/core";
import { DataService } from "../services/data.service";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { GoogleMapsComponent } from "../google-maps/google-maps.component";
import { ToasterService } from "angular2-toaster";
import { KeycloakService } from "keycloak-angular";
import { MapsAPILoader } from "@agm/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { NgxImageCompressService } from "ngx-image-compress";
import { MatSnackBar } from "@angular/material/snack-bar";
import { languages } from "../../helpers/languages";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  showLanguage: boolean = true;
  languageList = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "tn",
      name: "Tamil",
    },
    {
      code: "ka",
      name: "Kannada",
    },
  ];
  selectedLanguage = "en";
  preview_fields: any;
  selectedRow: Number;
  selectedorgRow: Number;
  private geoCoder;
  count: number = 0;
  coordinates: Coordinates;
  otpVerification: string = "";
  mobile: string;
  code: string = "";
  phone: string = "";
  otp: string = "";
  submit_btn: boolean = true;
  close_btn: boolean = false;
  sentOtp: string;
  selectedFile = null;
  @ViewChild("Userlist") private UserlistRef: TemplateRef<Object>;
  @ViewChild("Orglist") private OrglistRef: TemplateRef<Object>;
  @ViewChild("PhoneNumber") private PhoneNumberRef: TemplateRef<Object>;
  @ViewChild("imageUpload") private imageUploadRef: TemplateRef<Object>;
  @ViewChild("Otp") private OtpRef: TemplateRef<Object>;
  public successEmitter: EventEmitter<any>;

  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  modalReference: NgbModalRef;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageName: any;
  isRegistered = "true";
  // ifram_show = true;
  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private imageCompress: NgxImageCompressService,
    public toasterService: ToasterService,
    private mapsAPILoader: MapsAPILoader,
    private _snackBar: MatSnackBar,
    private zone: NgZone,
    public router: Router
  ) {
    this.languageList = languages;
  }

  ngOnInit() {}
  changeLanguage() {
    this.showLanguage = true;
  }
  updateLanguage(e) {
    this.dataService
      .getRegistrationForm({ lang: this.selectedLanguage })
      .subscribe((response) => {
        this.showLanguage = false;
        let payload = {
          components: response,
        };
        this.preview_fields = payload;
        this.preview_fields.components.forEach((element) => {
          if (element.key === "firstName") {
            element.defaultValue =
              window.sessionStorage.getItem("userName") || null;
          }
          if (element.key === "lastName") {
            element.defaultValue =
              window.sessionStorage.getItem("lastName") || null;
          }
        });
      });

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  public orgUserdata: any;
  public organisations: any;

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
      let payload = {
        orgid: window.sessionStorage.getItem("orgId") || "0",
      };

      this.modalReference = this.modalService.open(this.UserlistRef, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "modal_customize_service",
      });

      this.dataService.getorguserdata(payload).subscribe((orguserlist) => {
        this.orgUserdata = orguserlist;
        this.orgUserdata.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
      });
    } else if (temp1[3] === "org_list") {
      this.modalReference = this.modalService.open(this.OrglistRef, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "modal_customize_service",
      });

      this.dataService.getOrgList().subscribe((orglist) => {
        this.organisations = orglist;
        this.organisations.map((obj) => {
          obj["selected"] = false;
          return obj;
        });
      });
    } else if (temp1[3] === "uploadImg") {
      this.modalReference = this.modalService.open(this.imageUploadRef, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "modal_customize_service",
      });
    } else if (temp1[3] === "otp_css") {
      this.code = "";
      this.phone = "";
      this.otp = "";
      this.modalReference = this.modalService.open(this.PhoneNumberRef, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "modal_customize_service",
      });
    }
  }

  public checkedRows: Array<any> = [];
  public checkedorgRows: Array<any> = [];

  add_members() {
    this.modalReference.close();
  }

  phone_number() {
    this.otpVerification = "";
    this.submit_btn = true;
    this.close_btn = false;
    let OTP = "";
    let digits = "0123456789";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    this.sentOtp = OTP;
    this.mobile = "" + this.code + this.phone;
    let payload = {
      flow_id: "5f3cfe0cd6fc056694395443",
      sender: "SLVNIJ",
      unicode: 0,
      recipients: [
        {
          mobiles: this.mobile,
          otp: OTP,
        },
      ],
    };

    this.dataService.sendOtp(payload).subscribe((response) => {
      let res = response;
      if (res["type"] == "success") {
        this.modalService
          .open(this.OtpRef, {
            ariaLabelledBy: "modal-basic-title",
            windowClass: "modal_customize_service",
          })
          .result.then((result) => {});
        document.getElementById("member_close").click();
      }
    });
  }

  phone_check() {
    if (
      (this.code.length == 2 && this.phone.length == 10) ||
      this.otp.length == 4
    ) {
      return false;
    } else {
      return true;
    }
  }

  otp_check() {
    this.submit_btn = false;

    if (this.sentOtp === this.otp) {
      this.otpVerification = "success";
      this.close_btn = true;
    } else {
      this.otpVerification = "fail";
    }
  }

  close_model() {
    console.log(this.otpVerification, "this.otpVerification");
    if (this.otpVerification === "fail") {
      this.otpVerification = "";
      this.submit_btn = true;
      this.close_btn = false;
    } else {
      console.log("called");
      this.modalReference.close();
      this.modalService.dismissAll();
    }
  }

  changed() {
    this.count = 0;
  }
  setClickedRow(index) {
    this.selectedRow = index;
  }

  clickc(value: any) {}

  setorgClickedRow(index) {
    this.selectedorgRow = index;
  }

  selected_click(value: any) {}

  onFileSeletcted(event) {
    this.selectedFile = event.target.files[0];
    let that = this;
    let reader = new FileReader();
    const snackBar = this._snackBar.open("Image added successfully");
    snackBar.onAction().subscribe(() => {});
    reader.onload = (event: any) => {
      let localUrl = event.target.result;
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
    };
    reader.readAsDataURL(this.selectedFile);
    reader.onerror = function (error) {};
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

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {};
    reader.onerror = function (error) {};
  }

  tooo() {
    this.modalReference.close();
  }

  private getAddressParts(object): Object {
    let address = {};
    const address_components = object.address_components;
    address_components.forEach((element) => {
      address[element.types[0]] = element.short_name;
    });
    return address;
  }

  current_location: any;
  submit_form(form_value) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.current_location =
          pos.coords.latitude + ", " + pos.coords.longitude;
        this.geoCoder.geocode(
          { location: { lat: pos.coords.latitude, lng: pos.coords.longitude } },
          (results, status) => {
            if (this.orgUserdata !== undefined) {
              this.orgUserdata = this.orgUserdata.filter((row: any) => {
                if (row.selected !== false) {
                  this.checkedRows.push(row.index);
                } else {
                  return false;
                }
              });
            }

            if (this.organisations !== undefined) {
              this.organisations = this.organisations.filter((row: any) => {
                if (row.selected !== false) {
                  this.checkedorgRows.push(row.index);
                } else {
                  return false;
                }
              });
            }

            let payload = {
              form_data: form_value["data"],
              currentAddress: this.current_location,
              orgId: this.checkedorgRows,
              uname: window.sessionStorage.getItem("uname"),
              firstName: window.sessionStorage.getItem("userName"),
              lastName: window.sessionStorage.getItem("lastName"),
              contact: this.phone,
              ImageData: this.localCompressedURl,
              imageName: this.imageName,
              lang:this.selectedLanguage
            };
            this.dataService.registrationForm(payload).subscribe(
              (formtypelist) => {
                this.toasterService.pop(
                  "success",
                  "Success",
                  "Form submitted successfully"
                );
                window.sessionStorage.removeItem("personId");
                window.sessionStorage.setItem(
                  "personId",
                  formtypelist["personId"]
                );
                const chkUrl = localStorage.getItem("url");
                if (chkUrl) {
                  localStorage.setItem("isregistered", this.isRegistered);
                  this.zone.run(() => this.router.navigateByUrl(chkUrl)).then();
                } else {
                  this.zone.run(() => this.router.navigate(["./"])).then();
                }

                //  this.router.navigate(['/'])
                // this.modalService.dismissAll();
              },
              (err) => {
                this.toasterService.pop(
                  "error",
                  "Error",
                  "Failed to submit to form"
                );
              }
            );
          }
        );
      });
    }
  }
}
