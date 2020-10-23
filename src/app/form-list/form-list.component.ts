import { Component, NgZone, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
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
import {languages} from '../../helpers/languages';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  page = 1;
  pageSize = 8;
  form_list: any;
  form_delete_id: any;
  modalReference: NgbModalRef;
  public incoming_data = data;
  form_name: any;
  @ViewChild('label_close') label_close: ElementRef;
  @ViewChild('approve_close') approve_close: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild("another_template") private another_template: ElementRef;
  @ViewChild("Approve_modal") private approvemodal_typeRef: TemplateRef<Object>;
  @ViewChild("Disable_form") private DisableForm_typeRef: TemplateRef<Object>;
  @ViewChild("content") private content_typeRef: TemplateRef<Object>;
  @ViewChild("add_form_type") private addform_typeRef: TemplateRef<Object>;
  @ViewChild("form_type") private form_typeRef: TemplateRef<Object>;
  @ViewChild("refer_needy") private refer_needyRef: TemplateRef<Object>;
  @ViewChild("signup_volunteer") private signup_volunteerref: TemplateRef<Object>;
  @ViewChild("inforamation_local") private local_informationref: TemplateRef<Object>;
  @ViewChild("deleteinput") private deleteinformationref: TemplateRef<Object>;
  @ViewChild("Orglist") private OrglistRef: TemplateRef<Object>;

  form_data: any;
  languageList=[{
    code:'en',
    name:'English'
  },{
    code:'tn',
    name:'Tamil'
  },{
    code:'ka',
    name:'Kannada'
  }]
  selectedLanguage="en";
  form_needy = new FormGroup({});
  model_needy = {};
  form_local = new FormGroup({});
  model_local = {};
  fields: any;
  preview_fields: any;
  dynamicForm: FormGroup;
  previewForm: FormGroup;
  edit_label_input = "";
  update_object: any;
  form_type_list: Object;
  form_type_name: any;
  templateform_name: any;
  approvedata: any;
  enabledata: any;
  previewformname: any;
  delete_object: any;
  key: string = 'type';
  reverse: boolean = false;
  organisations: any;
  checkedorgRows=[];

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;

  constructor(private dataService: DataService,
    private modalService: NgbModal,
    public toasterService: ToasterService,
    public router: Router) {
      this.languageList = languages;
  }

  ngOnInit() {
    this.get_form_type_list();
    this.get_form_data();

    let payload = {

    }
    this.dataService.getFormList(payload).subscribe(incomindata => {
      this.form_list = incomindata;
    });
  }

  ngAfterViewInit() {
    let payload = {
    }
    this.dataService.getFormList(payload).subscribe(incomindata => {
      this.form_list = incomindata;
    });
  }

  get_form_data() {
    let payload = {

    }
    this.dataService.getFormList(payload).subscribe(incomindata => {
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
    });
  }

  add_form_type_name() {
    let payload = {
      type: this.form_type_name,
      status: "Active"
    }
    // console.log("payload",payload)
    this.dataService.addFormtypname(payload).subscribe(formtypedata => {
      console.log(formtypedata)
      window.sessionStorage.removeItem(formtypedata['index']);
      window.sessionStorage.setItem("form_type", formtypedata['index']);
      document.getElementById("closeModal").click();
      this.router.navigate(['./formbuilder']);
    });
  }

  redirect_form_build(type_id) {
    window.sessionStorage.removeItem(type_id);
    window.sessionStorage.setItem("form_type", type_id);
    document.getElementById("clodeModal_formtype").click();
    this.router.navigate(['./formbuilder']);
  }

  delete_form(delete_id: any) {
    let payload = {
      id: this.form_delete_id.id,
      status: "Disabled"
    }
    this.dataService.approveformdata(payload).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form Disabled successfully"
      );
      this.get_form_data();
      this.modalReference.close();
    });
  }

  open_mobile(delete_form) {
    this.modalReference = this.modalService.open(this.content_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' });
    this.form_delete_id = delete_form;
  }

  open_needy_person(refer_needy) {
    this.modalReference = this.modalService.open(refer_needy, { ariaLabelledBy: 'modal-basic-title', windowClass: '' })
  }


  open_form_types() {
    this.modalService.open(this.addform_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
    });
  }

  refer_needy_person(refer_needy) {
    this.fields = this.form_data;
    const controls = {};
    this.fields.forEach(res => {
      const validationsArray = [];
      controls[res.label] = new FormControl('', validationsArray);
    });
    this.dynamicForm = new FormGroup(
      controls
    );
    this.modalReference = this.modalService.open(refer_needy, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal_width_customize' })
  }

  edit_label(form_object) {
    this.update_object = form_object;
    this.edit_label_input = form_object.label;
    this.modalService.open(this.local_informationref, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service_top' }).result.then((result) => {
    });
  }

  update_label() {
    for (var i = 0; i < this.fields.length; i++) {
      if (this.fields[i].id == this.update_object.id) {
        this.fields[i].label = this.edit_label_input;
        document.getElementById("label_close").click();
      }

    }
  }

  hidden_input(form_object, event) {
    this.update_object = form_object;
    for (var i = 0; i < this.fields.length; i++) {
      if (this.fields[i].id === this.update_object.id) {
        if (event.checked == true) {
          this.fields[i]['hidden'] = true;
          this.fields[i]['disabled'] = true;
        } else {
          this.fields[i]['hidden'] = false;
          this.fields[i]['disabled'] = false;
        }
      }
    }
  }

  local_information(inforamation_local) {
    this.modalService.open(inforamation_local, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service_top' }).result.then((result) => {
    });
  }


  preview_form(form_arr) {
    this.previewformname = form_arr.name;
    this.form_data = form_arr.schema;
    let payload = {
      components: form_arr.schema
    }
    this.preview_fields = payload;
    this.open_needy_person(this.refer_needyRef)
  }

  create_form(form_arr) {
    window.sessionStorage.removeItem('form_type');
    window.sessionStorage.setItem("form_type", form_arr.type);
    this.form_data = form_arr.schema;
    this.refer_needy_person(this.signup_volunteerref)

  }
  getOrg(){
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
   
  }
  add_members() {
    document.getElementById("member_close").click();
  }
  onSubmitTemplate() {

    console.log( window.sessionStorage.getItem('form_type'),"")
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
      components: this.fields,
      name: this.templateform_name,
      type:  window.sessionStorage.getItem('form_type'),
      status: "Pending",
      lang:this.selectedLanguage,
      orgIds:this.checkedorgRows
    }
    // console.log(JSON.stringify(payload))
    this.dataService.postformdata(payload).subscribe(data => {
      document.getElementById("another_template").click();
      this.toasterService.pop(
        "success",
        "Success",
        "Form created successfully"
      );
      this.dataService.getFormList(payload).subscribe(incomindata => {
        this.form_list = incomindata;
      });
    });
  }

  open_status(formdata: any) {
    this.modalReference =this.modalService.open(this.approvemodal_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' })
    this.approvedata = formdata;
  }

  approve_form() {
    let payload = {
      id: this.approvedata.id,
      status: "Approved"
    }
    this.dataService.approveformdata(payload).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form Approved successfully"
      );
      this.get_form_data();
      this.modalReference.close();
    });
  }

  open_enable(formdata: any) {
    this.modalReference =this.modalService.open(this.DisableForm_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' })
    this.enabledata = formdata;
  }

  enable_form() {
    let payload = {
      id: this.enabledata.id,
      status: "Approved"
    }
    this.dataService.approveformdata(payload).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form Enabled successfully"
      );
      this.get_form_data();
      this.modalReference.close();
    });
  }
}
