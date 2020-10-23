import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { element } from "protractor";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-sniscore",
  templateUrl: "./sniscore.component.html",
  styleUrls: ["./sniscore.component.css"],
})
export class SniscoreComponent implements OnInit {
  @ViewChild("popContent") popContent: TemplateRef<Object>;
  selectedRow: any;
  successUpdate:boolean=false;
  errorUpdate:boolean=false;
  SniData: any;
  sniForm: FormGroup;
  p: number = 1;
  itemsPerPage=15;
  constructor(
    private dataService: DataService,
    private zone: NgZone,
    public fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getSniDetail();

    this.sniForm = this.fb.group({
      Total: ["", [Validators.required]],
      Section: ["", [Validators.required]],
      Parameter: ["", [Validators.required]],
      DATA: ["", [Validators.required]],
      HANDSONSKILLS: ["", [Validators.required]],
      CITIZENSHIP: ["", [Validators.required]],
      PROBLEMSOLVING: ["", [Validators.required]],
      COMMUNICATION: ["", [Validators.required]],
      CRITICALTHINKING: ["", [Validators.required]],
      COMMUNITYCOLLABORATION: ["", [Validators.required]],
      APPLIEDEMPATHY: ["", [Validators.required]],
      GRIT: ["", [Validators.required]],
      ENTREPRENEURIALSKILLS: ["", [Validators.required]],
      Score: ["", [Validators.required]],
    });
  }

  getSniDetail() {
    this.dataService.getSniData().subscribe((res: any) => {
      this.SniData = res;
    });
  }

  openModal(selected) {
    this.selectedRow = selected;
    this.successUpdate = false;
    this.errorUpdate=false;
    const modalRef = this.modalService.open(this.popContent, {
      ariaLabelledBy: "modal-basic-title",
      windowClass: "modal_customize_service",
    });
  }

  submitForm() {
    let payload = this.selectedRow;
    this.successUpdate = false;
    this.errorUpdate=false;
    try {
      this.dataService.upDateSniScore(payload).subscribe((res) => {
        this.successUpdate = true;
        setTimeout(()=>{
          this.modalService.dismissAll();
        },500)
        
      });
    } catch (error) {
      this.errorUpdate = true;
      setTimeout(()=>{
        this.modalService.dismissAll();
      },500)
    }
    
  }
}
