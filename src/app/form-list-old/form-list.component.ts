import { Component, NgZone, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';
import { ward } from '../services/wards';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import *  as  data from '../formly.json';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  form_list: any;
  form_delete_id: any;
  modalReference: NgbModalRef;
  public incoming_data = data; _
  form_name: any;
  @ViewChild('label_close') label_close: ElementRef;
  
  @ViewChild('approve_close') approve_close: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild("Approve_modal") private approvemodal_typeRef: TemplateRef<Object>;
  @ViewChild("add_form_type") private addform_typeRef: TemplateRef<Object>;
  @ViewChild("form_type") private form_typeRef: TemplateRef<Object>;
  @ViewChild("refer_needy") private refer_needyRef: TemplateRef<Object>;
  @ViewChild("signup_volunteer") private signup_volunteerref: TemplateRef<Object>;
  @ViewChild("inforamation_local") private local_informationref: TemplateRef<Object>;
  @ViewChild("deleteinput") private deleteinformationref: TemplateRef<Object>;
  form_data: any;

  form_needy = new FormGroup({});
  model_needy = {};

  form_local = new FormGroup({});
  model_local = {};
  fields = [];
  preview_fields=[];
  dynamicForm: FormGroup;
  previewForm: FormGroup;
  edit_label_input = "";
  update_object: any;
  form_type_list: Object;
  form_type_name: any;
  templateform_name: any;
  approvedata: any;
  previewformname: any;
  delete_object: any;
  constructor(private dataService: DataService,
    private modalService: NgbModal,
    public toasterService: ToasterService,
    public router: Router) {

  }

  ngOnInit() {
    this.get_form_type_list();
    this.get_form_data();

    // this.form_data=this.incoming_data['default'];
   
  }

  get_form_data(){
    let payload = {

    }
    this.dataService.getFormList(payload).subscribe(incomindata => {
      this.form_list = "";
      this.form_list = incomindata;
    });
  }

  get_form_type_list() {
    this.dataService.getFormtype().subscribe(formtypedata => {
      this.form_type_list = formtypedata;
    });
  }

  add_form_types() {
    this.modalService.open(this.addform_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  add_form_type_name() {


    let payload = {
      type: this.form_type_name
    }

    this.dataService.addFormtypname(payload).subscribe(formtypedata => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form deleted successfully"
      );
      this.get_form_type_list();
      document.getElementById("closeModal").click();
    });
  }

  redirect_form_build(type_id) {
     window.sessionStorage.removeItem(type_id);
     window.sessionStorage.setItem("form_type", type_id);
    document.getElementById("clodeModal_formtype").click();
    this.router.navigate(['./formbuilder']);
  }

  delete_form(delete_id: any) {
    console.log(this.form_delete_id,"delete idss");
    // return true;
    let payload={
      id:this.form_delete_id.id,
      status:"Deleted"
    }
    console.log(payload,"payloadpayload")
    // return true;
    this.dataService.approveformdata(payload).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form Deleted successfully"
      );
    });
    this.get_form_data();
    this.router.navigate(['/formlist']);
    this.modalReference.close();
    
  }

  open_mobile(content, delete_form) {
    this.modalReference = this.modalService.open(content);
    this.form_delete_id = delete_form;
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
    //   // this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  open_needy_person(refer_needy) {
    // this.form_name = form_arr.name;
    // this.form_data = JSON.parse(form_arr.schema);
   
    this.modalService.open(refer_needy, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  //open form types
  open_form_types() {
    this.modalService.open(this.form_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  refer_needy_person(refer_needy) {
    this.fields = this.form_data;
    const controls = {};
    this.fields.forEach(res => {
      const validationsArray = [];
      // res.validations.forEach(val => {
      //   if (val.name === 'required') {
      //     validationsArray.push(
      //       Validators.required
      //     );
      //   }
      //   if (val.name === 'pattern') {
      //     validationsArray.push(
      //       Validators.pattern(val.validator)
      //     );
      //   }
      // });
      controls[res.label] = new FormControl('', validationsArray);
    });
    this.dynamicForm = new FormGroup(
      controls
    );
    this.modalService.open(refer_needy, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service_top' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  edit_label(form_object) {
    this.update_object = form_object;
    this.edit_label_input = form_object.label;
    this.modalService.open(this.local_informationref, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service_top' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  // delete_input(form_object){
  //   this.delete_object = form_object;
  //   this.modalService.open(this.deleteinformationref, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service_top' }).result.then((result) => {
  //     // this.closeResult = `Closed with: ${result}`;
  //   });
  // }

  // delete_inputobject(){
  //   console.log(this.delete_object,"this.delete_object");
  // }

  update_label() {
 
    for (var i = 0; i < this.fields.length; i++) {
      if (this.fields[i].id === this.update_object.id) {
        // console.log(this.fields[i].index,"this.fields[i].index");
        // console.log(this.update_object.index,"this.update_object.index");
        this.fields[i].label = this.edit_label_input;
        // break;
      }
      document.getElementById("label_close").click();

    }
  }

  local_information(inforamation_local) {
    this.modalService.open(inforamation_local, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service_top' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }


  preview_form(form_arr) {
    // console.log(form_arr, "form_arrform_arr");
    this.previewformname = form_arr.name;
    this.form_data = form_arr.schema;
    this.preview_fields = this.form_data;
    const controls = {};
    this.preview_fields.forEach(res => {
      const validationsArray = [];
     
      controls[res.label] = new FormControl('', validationsArray);
    });
    this.previewForm = new FormGroup(
      controls
    );
    this.open_needy_person(this.refer_needyRef)
  }

  create_form(form_arr) {
    this.form_data = form_arr.schema;
    this.refer_needy_person(this.signup_volunteerref)

  }

  onSubmitTemplate(form_value) {
   
    let payload={
      components:this.fields,
      name:this.templateform_name,
      type: window.sessionStorage.getItem('form_type'),
      status:"Pending"
    }
    this.dataService.postformdata(payload).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form created successfully"
      );
    });
    this.router.navigate(['/formlist']);
    this.get_form_data();
  }

  open_status(formdata:any){
    console.log(formdata,"formdataformdata");
    this.approvedata=formdata;
    this.modalService.open(this.approvemodal_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  approve_form(){
    
    let payload={
      id:this.approvedata.id,
      status:"Approved"
    }
    // console.log(payload,"payloadpayload")
    // return true;
    this.dataService.approveformdata(payload).subscribe(data => {
      document.getElementById("approve_close").click();
      this.toasterService.pop(
        "success",
        "Success",
        "Form Approved successfully"
      );
    });
    this.get_form_data();
    this.router.navigate(['/formlist']);
  }

}
