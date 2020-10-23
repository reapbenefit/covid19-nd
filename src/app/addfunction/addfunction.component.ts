import { Component, NgZone, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { ToasterService } from 'angular2-toaster';
import { KeycloakService } from 'keycloak-angular';
import { MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AddDetailsComponent } from '../components/add-details/add-details.component';

@Component({
  selector: 'app-addfunction',
  templateUrl: './addfunction.component.html',
  styleUrls: ['./addfunction.component.css']
})
export class AddfunctionComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => this.openPopup());
  }

  openPopup() {
    const modalRef = this.modalService.open(AddDetailsComponent, { ariaLabelledBy: "modal-basic-title", windowClass: "modal_customize_service", backdrop: 'static' });
    let data = {
      prop1: "Some Data",
      prop2: "From Parent Component",
      prop3: "This Can be anything",
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {

      },
      (reason) => { }
    );
  }
}


