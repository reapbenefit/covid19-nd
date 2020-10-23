import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
declare let $: any;

@Component({
  selector: 'app-formtype-list',
  templateUrl: './formtype-list.component.html',
  styleUrls: ['./formtype-list.component.css']
})
export class FormtypeListComponent implements OnInit {
  page = 1;
  pageSize = 8;
  form_type_list: any;
  form_type_disabled: any;
  modalReference: NgbModalRef;
  form_delete_id: any;
  form_enable_id: any;
  form_enable: boolean = false;
  form_disable: boolean = true;
  key: string = 'type';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  itemsperpage = "5"
  @ViewChild("enable_form_type") private enableform_typeRef: TemplateRef<Object>;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    public toasterService: ToasterService,) { }

  ngOnInit() {
    this.get_form_type_list();
    this.get_form_type_list_disabled();
  }

  get_form_type_list() {
    this.dataService.getFormtype().subscribe(formtypedata => {
      this.form_type_list = "";
      this.form_type_list = formtypedata;
    });
  }

  get_form_type_list_disabled() {
    this.dataService.getFormtypedisabled().subscribe(formtypedisableddata => {
      this.form_type_disabled = "";
      this.form_type_disabled = formtypedisableddata;
    });
  }

  tabClick(event) {
    if (event.tab.textLabel === "Form Enable") {
      this.p = 0;
      this.p = 1;
      this.get_form_type_list();
      this.form_disable = false;
      this.form_enable = true;
    } else if (event.tab.textLabel === "Form Disable") {
      this.p = 0;
      this.p = 1;
      this.get_form_type_list_disabled();
      this.form_disable = true;
      this.form_enable = false;
    }
  }

  open_mobile(content, delete_form) {
    this.modalReference = this.modalService.open(content);
    this.form_delete_id = delete_form;
  }
  enable_form(content, delete_form) {
    this.modalService.open(this.enableform_typeRef, { ariaLabelledBy: 'modal-basic-title', windowClass: 'modal_customize_service' }).result.then((result) => {
    });
    this.form_enable_id = delete_form;
  }

  delete_form(delete_id: any) {
    let payload = {
      id: this.form_delete_id['index'],
      status: "Disabled"
    }
    this.dataService.deleteformtype(payload).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form Disabled successfully"
      );
      this.get_form_type_list();
      this.get_form_type_list_disabled();
      this.modalReference.close();
    });

  }

  enable_formtype(delete_id: any) {
    let payload = {
      id: this.form_enable_id['index'],
      status: "Active"
    }
    this.dataService.enableformtype(payload).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form Enabled successfully"
      );
      this.get_form_type_list();
      this.get_form_type_list_disabled();
      document.getElementById("closeModal").click();
    });
  }
}
