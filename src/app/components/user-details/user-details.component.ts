import { ToasterService } from 'angular2-toaster';
import { environment } from './../../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Component, OnInit, EventEmitter, Output, Inject, NgZone, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fn } from '@angular/compiler/src/output/output_ast';
import { stringify } from 'querystring';
import { KeycloakService } from "keycloak-angular";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { ChartDataSets, ChartType, RadialChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import * as jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import { chart, Data,base64file } from "./chart.json"
import { capitalize } from '../../../helpers/textHelper';
import { degrees, PDFDocument, rgb, StandardFonts  } from 'pdf-lib';
import * as download from 'downloadjs';
import { languages } from 'src/helpers/languages';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  // @ViewChild("htmlData") private htmlData: TemplateRef<Object>;
  hiddendiv = true;

  userDetails: boolean = true;
  hidePDF:boolean = false;
  sniScore: string;
  @Output() userStats: EventEmitter<boolean> = new EventEmitter();
  dataArray: any;
  imageUrl: string = "../../../assets/noImage.png";
  personId: string = '7';
  orgNames = [];
  edit_icon = "../../../assets/Icons/edit.png";
  private geocoder: any;
  adress: any;
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        display: false
      }
    }
  };
  public radarChartLabels: Label[] = chart;

  public radarChartData: ChartDataSets[] = [{
    data:[],borderColor: "rgba(48,110,249,1)"
  }];
  public radarChartType: ChartType = 'radar';
  legend = false
  @ViewChild("htmlData") htmlData: ElementRef;

  personaImage = "../";
  reapImage = "../../../assets/reapbenefit.png";
  pdfData = Data;
  constructor(private service: DataService,
    private zone: NgZone,
    private dialog: MatDialog,
    private keycloakService: KeycloakService,
    private mapLoader: MapsAPILoader,
    public router: Router, ) {
  }

  ngOnInit() {
    this.personId = window.sessionStorage.getItem('personId');
    this.service.getUserDetails(this.personId).subscribe(response => {
      this.getUSerSniScore();
      this.dataArray = response;
      (this.dataArray[0].orgName).forEach(obj => {
        this.orgNames.push(obj.name);
      });
      this.mapLoader.load().then(async () => {
        this.geocoder = new google.maps.Geocoder();
        await this.geocoder.geocode(
          { location: { lat: this.dataArray[0].lat, lng: this.dataArray[0].long } },
          (results, status) => {
            this.zone.run(() => {
              this.adress = this.getAddressParts(results[1]);
            })
          })
      })
      if (this.dataArray[0].imgName != null) {
        window.sessionStorage.setItem("imageurl", this.dataArray[0].imgName);
        this.imageUrl = environment.baseURL + 'large/image/' + this.dataArray[0].imgName;
      }
    });
  }
  public getImage(type) {
    let img = 'assets/img/CampaignChameleon.png'
    if (type === "rhino") {
      img = "assets/img/ReportingRhino.png";
    }
    if (type === "chemeloen") {
      img = 'assets/img/CampaignChameleon.png';

    }
    if (type === "hippo") {
      img = 'assets/img/HandsonHippo.png';

    }
    if (type === "tiger") {
      img = 'assets/img/TechnoTiger.png';

    }
    if (type === "ant") {
      img = 'assets/img/ActionAnt.png';

    }
    return img;
  }
  public downloadPDF(): void {
    const opt = {
      margin: 0,
      filename: "solveninja.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        // unit: "mm",
        // format: "a4",
        // orientation: "l",
        // putOnlyUsedFonts: true,
        orientation: "landscape",
        unit: "mm",
        format: "letter"
      },
      enableLinks: true,
      pageBreak: { mode: 'avoid-all' }
    };
    const DATA = this.htmlData.nativeElement;
    html2pdf().from(DATA).set(opt).save();

    // html2pdf().from(DATA).toContainer().toCanvas().toPdf().save();
  }
  async  modifyPdf() {
    // Fetch an existing PDF document
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
let existingPdfBytes = "assets/Standard_template.pdf";
    // Load a PDFDocument from the existing PDF bytes
    let img:any = document.createElement('img');
    

//     fetch('assets/Standard_template.pdf')
// .then(res => res.url )
// .then(Blob =>Blob )
// .then(base64 =>  console.log(base64))

    img.src = "assets/img/CampaignChameleon.png"
   
    var canvas:any = document.getElementById('radarChart');
var dataURL = canvas.toDataURL("image/png", 1.0);
const pdfURL= "assets/Standard_template.pdf"
const arrayBufferpdf = await fetch(pdfURL).then(res => res.arrayBuffer())
    const arrayBuffer = await fetch(img.src).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(base64file)
    // const image3 = await pdfDoc.embedPng(img)
    const image3 = await pdfDoc.embedPng(arrayBuffer)
    const image2 = await pdfDoc.embedPng(dataURL)


    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()
    const PAGE_WIDTH = firstPage.getWidth();
    const PAGE_HEIGHT = firstPage.getHeight();
    // Get the width and height of the first page
    // Draw a string of text

    firstPage.drawText(this.pdfData[0]['banner_title'], {
      x: 120,
      y: height / 3 + 350,
      size: 24,
      font: helveticaFont,
      color: rgb(1, 1, 1),
       maxWidth: 200
    })


    firstPage.drawImage(image3,{
      x: 380,
      y:height / 6 + 50,
      width: 100,
       height: 100,
    })
    firstPage.drawText(this.pdfData[0]['personaImgText'], {
      x: 300,
      y:height / 6 + 20,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      // maxWidth: 300
    })
    
    firstPage.drawImage(image2,{
      x: 120,
      y: height / 6 + 30,
      width: 150,
       height: 150,
    })
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    // Trigger the browser to download the PDF document
    download(pdfBytes, "solve_ninja.pdf", "application/pdf");
  }
  
  getUSerSniScore() {
    const usrID = window.sessionStorage.getItem("personId");
    this.service.getSniScore(usrID).subscribe((val: any) => {
      this.hidePDF = true;
      if (val) {
        this.sniScore = val.score;
        let radarData = [];
        for (let thing in val) {
          // console.log(thing,"thing")
          if(!isNaN(val[thing]) && thing !== 'score' && thing !== 'NumberofActions'){
            radarData.push(val[thing])
            // this.radarChartLabels.push(thing)
          }
         
          this.pdfData[0][thing] = val[thing];
        }
        // console.log(radarData,"radarData")
        
          this.radarChartData[0].data = radarData
          // console.log(this.radarChartData)
      }
      this.pdfData[0]['banner_title'] = this.pdfData[0]['banner_title'].replace("##{{username}}##", window.sessionStorage.getItem('userName'));
      this.pdfData[0]['personaImgText'] = this.pdfData[0]['personaImgText'].replace("##{{campaign}}##", capitalize(val.persona));
      this.pdfData[0]['personaImgText'] = this.pdfData[0]['personaImgText'].replace("##{{sniscore}}##", this.sniScore);
    }, err => {
      this.sniScore = '0';
    })
  }

  async doLogout() {
    window.sessionStorage.removeItem("personId");
    await this.keycloakService.logout();
  }

  detailsClose() {
    this.userDetails = !this.userDetails;
    this.userStats.emit(this.userDetails);
    this.router.navigate(["./"]);
  }

  imageDialog() {
    const dialogRef = this.dialog.open(UserImageDialog, {
      data: {
        imageUrl: this.imageUrl,
        personId: this.personId,
        id: this.dataArray[0]['id']
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response == "success") {
        this.service.getUserDetails(this.personId).subscribe(response => {
          this.getUSerSniScore();
          this.dataArray = response;
          (this.dataArray[0].orgName).forEach(obj => {
            this.orgNames.push(obj.name);
          });
          if (this.dataArray[0].imgName != null) {
            this.imageUrl = environment.baseURL + 'large/image/' + this.dataArray[0].imgName;
          }
        });
      }
    });
  }

  editDialog() {
    const dialogRef = this.dialog.open(UserEditDialog, {
      data: {
        rowData: this.dataArray,
        personId: this.personId
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response == "success") {
        this.service.getUserDetails(this.personId).subscribe(response => {
          this.getUSerSniScore();
          this.dataArray = response;
          (this.dataArray[0].orgName).forEach(obj => {
            this.orgNames.push(obj.name);
          });
          if (this.dataArray[0].imgName != null) {
            this.imageUrl = environment.baseURL + 'large/image/' + this.dataArray[0].imgName;
          }
        });
      }
    });
  }

  getAddressParts(map_address) {
    let address = {};
    const address_components = map_address.address_components;
    address_components.forEach((element) => {
      address[element.types[0]] = element.short_name;
    });
    return address["locality"];
  }
}

@Component({
  selector: 'user-image-dialog',
  templateUrl: './user-image-dialog.html',
  styleUrls: ['./user-details.component.css']
})

export class UserImageDialog {
  browseName: string = "Choose a Picture";
  imageUrl: any;
  imageChosen: boolean = true;
  personId: string = '';
  id: string = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<UserImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private dataService: DataService) {
    if (data) {
      this.imageUrl = data.imageUrl;
      this.personId = data.personId;
      this.id = data.id;
    }
  }

  ngOnInit() {
  }

  fileChange(evt) {
    if (evt.target.files.length > 0) {
      this.browseName = evt.target.files[0].name;
      let reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
        this.imageChosen = false;
      }
    }
  }

  save() {
    let form_data = {
      upload: [
        {
          url: this.imageUrl,
          originalName: this.browseName
        }
      ],
      personId: this.personId
    };
    let payload = {
      form_data: form_data,
      ImageData: this.imageUrl,
      imageName: this.browseName
    }
    this.dataService.editImageDetails(payload, this.id).subscribe(response => {
      this.dialogRef.close("success");
    });
  }
}

@Component({
  selector: 'user-edit-dialog',
  templateUrl: './user-edit-dialog.html',
  styleUrls: ['./user-details.component.css']
})

export class UserEditDialog {
  dialogTitle: string = "Edit Details"
  id: string = '';
  orgList: any;
  myForm: FormGroup;
  nickName: string = '';
  occupation: string = '';
  org = [];
  orgIds = [];

  uname: string = '';
  fname: string = '';
  lname: string = '';
  gender: string = '';
  description: string = '';
  contact: number = null;
  eContact: number = null;
  personId: string = '';
  lang :string='';
  langsecondary =[];
  languageList =[];
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<UserEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private toast: ToasterService,

    private dataService: DataService) {
      this.languageList = languages;
    if (data) {
      console.log(data,"datat======")
      this.id = data.rowData[0]['id'];
      this.personId = data.personId;
      this.nickName = data.rowData[0]['nick'];
      this.occupation = data.rowData[0]['occupation'];
      this.org = data.rowData[0]['orgName'];
      this.lang = data.rowData[0]['lang'];
      this.langsecondary = data.rowData[0]['langsecondary'];
      this.org.forEach(obj => {
        this.orgIds.push(obj.id);
      });
      this.uname = data.rowData[0]['username'];
      this.fname = data.rowData[0]['firstName'];
      this.lname = data.rowData[0]['lastname'];
      this.gender = data.rowData[0]['gender'];
      this.description = data.rowData[0]['description'];
      this.contact = data.rowData[0]['contcat'];
      this.eContact = data.rowData[0]['emergencyContact'];
    }

    dataService.getOrgList().subscribe(response => {
      this.orgList = response;
    });

    this.myForm = this.formBuilder.group({
      nickName: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      org: ['', [Validators.required]],
      uname: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      gender: [''],
      description: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.pattern('(?=\\D*\\d).{10,10}')]],
      eContact: ['', [Validators.required, Validators.minLength(10), Validators.pattern('(?=\\D*\\d).{10,10}')]],
      lang:['',Validators.required],
      langsecondary:['']
    });
  }

  ngOnInit() {
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  radioChange(evt) {
  }

  saveUser() {
    let form_data = {
      orgId: this.orgIds,
      occupation: this.occupation,
      nick: this.nickName,
      lastname: this.lname,
      gender: this.gender,
      firstName: this.fname,
      emergencyContact: this.eContact,
      contcat: this.contact,
      description: this.description,
      personId: this.personId,
      lang:this.lang,
     langsecondary:this.langsecondary
    }
    let payload = {
      form_data: form_data
    }
    this.dataService.editUserDetails(payload, this.id).subscribe(response => {
      this.dialogRef.close("success");
    });
  }
}
