import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { DataService } from "../../services/data.service";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { MapsAPILoader } from "@agm/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { TreeviewItem, TreeviewConfig } from "ngx-treeview";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { HttpClient } from "@angular/common/http";
import { ToasterConfig } from "angular2-toaster";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ToasterService } from "angular2-toaster";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class Header implements OnInit {
  @Input() activeMenu: string;
  selectedValue = "Select Form Types";
  @ViewChild("content") private contentmodalRef: TemplateRef<Object>;
  userDetails: boolean = false;
  @Output() userStats: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public router: Router,
    public http: HttpClient,
    private _matIconReistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    public toasterService: ToasterService,
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
    this.getSelectedvalue();
  }

  formtypelistdata: any;
  getSelectedvalue() {
    let payload = {
      type: "5",
    };
    this.dataService.getFormlisttype(payload).subscribe((formtypelist) => {
      this.formtypelistdata = formtypelist;
    });
  }

  open_modal() {
    this.modalService.open(this.contentmodalRef, {
      ariaLabelledBy: "modal-basic-title",
      windowClass: "modal_customize_service",
    });
  }

  async doLogout() {
    window.sessionStorage.removeItem("personId");
    await this.keycloakService.logout();
  }

  userDetailsToggle() {
    this.userDetails = !this.userDetails;
    this.userStats.emit(this.userDetails);
    this.userDetails = !this.userDetails;
  }
}
