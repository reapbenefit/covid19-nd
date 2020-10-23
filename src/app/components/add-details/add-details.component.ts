import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  ChangeDetectorRef ,
  Input
} from "@angular/core";
import { DataService } from "../../services/data.service";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { GoogleMapsComponent } from "../../google-maps/google-maps.component";
import { ToasterService } from "angular2-toaster";
declare const google: any;
import { MapsAPILoader } from "@agm/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { MenuService, newMenuList } from "src/app/services/menu.service";
import { MapService } from "src/app/services/map.service";
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: "app-add-details",
  templateUrl: "./add-details.component.html",
  styleUrls: ["./add-details.component.css"],
})
export class AddDetailsComponent implements OnInit {
  @Input('id') id: string;
  form_type_list: any;
  formtypelistdata: any;
  preview_fields: any;
  selectedValue = "Select Form Types";
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
  formModalRef: NgbModalRef;
  selectedMenu;
  selectedFile = null
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
    private _snackBar: MatSnackBar

  ) {
    this._menuService.selectedMenu$.subscribe((data) => {
      this.selectedMenu = newMenuList.find((item) => item.key === data);
    });
  }

  ngOnInit() {
    // console.log(this.id)
    this.get_form_type_list();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  get_form_type_list() {
    this.dataService.getFormtype().subscribe((formtypedata) => {
      this.form_type_list = formtypedata;
    });
  }
  findOrg(arr1,arr2){
    return arr1.some(item => arr2.includes(item)) 
  }
filterForm(formtypelist){
 let languages:any=['en'];
 let orgIDs:any = [78]
//  console.log(window.sessionStorage.getItem("orgId"))
 let selectedorg = window.sessionStorage.getItem("orgId") 
 const selectedLan =  window.sessionStorage.getItem("lang")
// console.log(selectedorg)
 if (selectedorg){
  selectedorg =selectedorg
 const orgid:any =selectedorg.split(',')
 orgid.forEach(element => {
  orgIDs.push(parseInt(element))
 });

  // console.log(orgIDs)
 } 
 if (selectedLan){
  languages.push(selectedLan)
 } 
 console.log(orgIDs,languages)
 const filteredArr= formtypelist.filter((item) => languages.includes(item.lang)
//  item.lang === selectedLan
 );
//  console.log(filteredArr," filtered")
const newArr =filteredArr.filter(element => {  
  if(element.orgIds!=null && element.orgIds!=undefined && element.orgIds!='') {
  const containsOrg = this.findOrg(orgIDs,element.orgIds)
  console.log(containsOrg)
    return containsOrg;
  }
});
this.formtypelistdata = newArr;

//  console.log(newArr,"new filtered")
}
  getSelectedvalue(selectedValue) {
    let payload = {
      type: this.selectedValue,
    };
     this.dataService.getFormlisttype(payload).subscribe((formtypelist) => {
      //  this.formtypelistdata = formtypelist;
       this.filterForm(formtypelist);
     });

   // window.location.href = '#/mycomponent'
  }

  global_form_id: string = "";

  preview_form_approved(form_arr) {
    this.global_form_id = form_arr.index;
    let payload = {
      components: form_arr.schema,
    };
    this.preview_fields = payload;
    console.log(form_arr)
    this.router.navigate(["./addforms",form_arr.type,form_arr.index,form_arr.id])
    this.modalService.dismissAll();
  }

  preview_modal_close() {
    this.formModalRef.close();
  }

  changed(category_id) {
    this.checkedcategoryRows = category_id.index;
  }

  setClickedRow(index) {
    this.selectedRow = index;
  }

  clickc(value: any) {
  }

  setorgClickedRow(index) {
    this.selectedorgRow = index;
  }

  selectedOrgItems = []
  selected_click(value: any) {
  }

  tooo() {
    this.modalReference.close();
  }


  close_assignee() {
    this.modalReference.close();
  }

  add_caetgory() {
    this.modalReference.close();
  }

  add_members() {
    this.modalReference.close();
  }

  form_type_close() {
    this.modalService.dismissAll();
    this.router.navigate(["./"]);
  }
}
