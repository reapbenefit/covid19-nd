import { Component, NgZone, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { } from 'googlemaps';
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
import  *  as  data  from  '../formly.json';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  @ViewChild('json') jsonElement?: ElementRef;
  public form: Object = {
    components: []
  };

  global_form_data:any;
  form_name:string;

  constructor(private dataService: DataService,
    public toasterService: ToasterService,
    public router: Router,) { }

  ngOnInit() {
  }

  onChange(event) {
    this.global_form_data=event.form;
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }

  onSubmit(submission: any) {
  }

  post_form_data(){
    this.global_form_data["name"]=this.form_name;
    this.global_form_data["type"]= window.sessionStorage.getItem('form_type');
    this.global_form_data["status"]="Pending";
    var i = 0;    
    this.global_form_data.components.map(
     (obj) => {
          obj['id'] = i;
          // console.log(obj,"objobjobj")
          i++
          return obj;
     });
    

     let payload={
      form_data:this.global_form_data
    }
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
