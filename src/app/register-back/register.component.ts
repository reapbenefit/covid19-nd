import { Component, NgZone, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { ToasterService } from 'angular2-toaster';
import { KeycloakService } from 'keycloak-angular';
import { MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  preview_fields:any;
  selectedRow: Number;
  selectedorgRow: Number;
  private geoCoder;
  count: number = 0;
  coordinates: Coordinates;

  @ViewChild("Userlist") private UserlistRef: TemplateRef<Object>;
  @ViewChild("Orglist") private OrglistRef: TemplateRef<Object>;

  constructor(private dataService: DataService,
    private modalService: NgbModal,
    public toasterService: ToasterService,
    private mapsAPILoader: MapsAPILoader,
    public router: Router,) { }

  ngOnInit() {
    this.dataService.getRegistrationForm({lang:'en'})
    .subscribe(
      response => {
        console.log(response,"incoming register data");
        let payload = {
          components: response
        }
        this.preview_fields=payload;
      });

      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;
      });
  }



  public orgUserdata: any;
  public organisations: any;
  
  getforminputdata(e) {

    e = e || window.event;
    let temp = e.target.className;
    let temp1 = temp.split(" ");

    console.log(temp1, "temp1temp1temp1")

    if (temp1[3] === "custom_btn_css") {
      const modalRef = this.modalService.open(GoogleMapsComponent,
        {
          // scrollable: true,
          // windowClass: 'myCustomModalClass',
          // keyboard: false,
          // backdrop: 'static'
        });
      let data = {
        prop1: 'Some Data',
        prop2: 'From Parent Component',
        prop3: 'This Can be anything'
      }

      modalRef.componentInstance.fromParent = data;
      modalRef.result.then((result) => {
        this.coordinates = result;

      }, (reason) => {
      });
    } else if (temp1[3] === "add_user") {

      let payload = {
        orgid:  window.sessionStorage.getItem("orgId") || "0"
      }

      this.modalService.open(this.UserlistRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
      });

      this.dataService.getorguserdata(payload).subscribe(orguserlist => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.orgUserdata = orguserlist;
        this.orgUserdata.map(
          (obj) => {
            obj['selected'] = false;
            return obj;
          });
        console.log(this.orgUserdata, "this.orgUserdatathis.orgUserdata");

      });

    } else if (temp1[3] === "org_list") {

      console.log("org list blosck")
      this.modalService.open(this.OrglistRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
      });

      this.dataService.getOrgList().subscribe(orglist => {
        // console.log(orguserlist, "orguserlistorguserlist");
        this.organisations = orglist;
        this.organisations.map(
          (obj) => {
            obj['selected'] = false;
            return obj;
          });
        console.log(this.organisations, "this.organisationsorganisations.orgUserdata");

      });

    }

  }


  public checkedRows: Array<any> = [];
  public checkedorgRows: Array<any> = [];

  add_members() {
    document.getElementById("member_close").click();
  }

  changed() {
    this.count = 0;
    // this.orgUserdata.forEach(item => {
    //   if (item['selected'] == true) {
    //     this.count = this.count + 1;
    //     if (this.count > 1) {
    //       this.toggleButton = true;
    //     }
    //     else {
    //       this.toggleButton = false;
    //     }
    //   }
    // })
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

  selected_click(value: any) {
    console.log(value, "org valueee");
  }

  private getAddressParts(object): Object {
    let address = {};
    const address_components = object.address_components;
    address_components.forEach(element => {
      address[element.types[0]] = element.short_name;
    });
    return address;
  }


  current_location:any;
  submit_form(form_value) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.current_location = pos.coords.latitude + ", " + pos.coords.longitude;
        this.geoCoder.geocode({ 'location': { lat: pos.coords.latitude, lng: pos.coords.longitude } }, (results, status) => {


          // const currentaddress = {
          //   address: {
          //     formatted_address: results[0].formatted_address,
          //     address_parts: this.getAddressParts(results[0]),

          //   },
          //   latitude: pos.coords.latitude,
          //   longitude: pos.coords.longitude
          // };

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


          let payload = {
            form_data: form_value['data'],
            // selectedAddress: this.coordinates,
            currentAddress: this.current_location,
            orgId: this.checkedorgRows,
            uname: window.sessionStorage.getItem('uname')
          }

          console.log(payload, "posting current location and selected location submit data");
          // return true;
          this.dataService.registrationForm(payload).subscribe(formtypelist => {
            this.toasterService.pop(
              "success",
              "Success",
              "Form submitted successfully"
            );
             window.sessionStorage.removeItem('personId');
             window.sessionStorage.setItem('personId',formtypelist['personId'])
            this.modalService.dismissAll();
            this.router.navigate(['./app']);
          });

        });
      })

    }

  }
}
