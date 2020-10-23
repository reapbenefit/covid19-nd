import { Component, NgZone, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import { FormControl, FormGroup } from '@angular/forms';
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
import {languages} from '../../helpers/languages';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
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
  selectedOrg;
  @ViewChild('json') jsonElement?: ElementRef;
  @ViewChild("Orglist") private OrglistRef: TemplateRef<Object>;

  public form: Object = {
    components: []
  };

  global_form_data: any;
  form_name: string;
  showSidebar = false;
  organisations: any;
  checkedorgRows: any=[];

  constructor(private dataService: DataService,
    public toasterService: ToasterService,
    private modalService: NgbModal,
    public router: Router,) {
      this.languageList = languages
     }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event)
    this.global_form_data = event.form;
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }

  onSubmit(submission: any) {
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
  post_form_data(e){
    if (this.organisations !== undefined) {
      this.organisations = this.organisations.filter((row: any) => {
        if (row.selected !== false) {
          this.checkedorgRows.push(row.index);
          // console.log(this.checkedorgRows, "orgs selected");
        } else {
          return false;
        }
      });
    }
    this.global_form_data["name"]=this.form_name;
    // this.global_form_data["type"]=localStorage.getItem('form_type_name');
    this.global_form_data["type"]= window.sessionStorage.getItem('form_type');
    this.global_form_data["status"]="Pending";
    this.global_form_data['lang'] = this.selectedLanguage;
    this.global_form_data['orgIds'] =this.checkedorgRows;
    var i = 0;    
    this.global_form_data.components.map(
      (obj) => {
        obj['id'] = i;
        obj['disabled'] = false;
        obj['hidden'] = false;
        i++
        return obj;
      });
     

    let payload = {
      form_data: this.global_form_data
    }
// console.log(JSON.stringify(payload))

    this.dataService.postformdata(this.global_form_data).subscribe(data => {
      this.toasterService.pop(
        "success",
        "Success",
        "Form created successfully"
      );
    });
    this.router.navigate(['/formlist']);
  }

}
