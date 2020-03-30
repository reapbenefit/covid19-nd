import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  @Input() showPieValue;
  @Input() GraphData;
  @Input() Compare;
  @Input() GraphDataStatus;
  @Input() compareGraph;
  @Input() showCompare;
  @Input() ShowComp;
  @Input() aqm;
  @Input() AQMGraphLocAll;

  public view: any[] = [500, 300];
  public viewcomp: any[] = [600, 400];
  public viewAQM1: any[] = [400, 300];
  public showPie = true;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = "";
  public showYAxisLabel = true;
  public yAxisLabel = "";
  public explodeSlices = true;
  public showDataLabel = true;
  private CompareGraph = false;
  public StatusGraph = [];
  public yScale: number = 10;
  public AQM;
  public AQMGraphLoc1;
  public AQMGraphLoc2;
  public colorScheme = {
    domain: ["#EF5350", "#AB47BC", "#B2FF59", "#EEFF41", "#FFD740", "#FF7043"]
  };
  public colorSchemeAQM = {
    domain: ["#FFEB3B", "#FF9800", "#FF5722"]
  };
  public Legends = [
    {
      "index":"0-50",
      "remark":"Good",
      "color":"#00b050"
    },
    {
      "index":"51-100",
      "remark":"Satisfactory",
      "color":"#92d050"
    },
    {
      "index":"101-200",
      "remark":"Moderate",
      "color":"#ffff00"
    },
    {
      "index":"201-300",
      "remark":"Poor",
      "color":"#ff0"
    },
    {
      "index":"301-400",
      "remark":"Very Poor",
      "color":"#f00"
    },
    {
      "index":"401-500",
      "remark":"Severe",
      "color":"#c00000"
    }
  ]

  constructor(private dataService: DataService,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  private AQMList;
  ngDoCheck() {
    this.AQMList = this.dataService.AQMDataList
  }

  public single: any[] = [];
  public multi: any[] = [];
  private showbar = false;
  public NoData = false;
  public AQMGraphLoc1Nm;
  public AQMGraphLoc2Nm;
  ngOnChanges(changes: SimpleChanges) {
    this.showPie = this.showPieValue;
    this.single = this.GraphData;
    this.StatusGraph = this.GraphDataStatus;
    this.multi = this.compareGraph;
    this.AQM = this.aqm;
    if (this.AQM == true) {
      if (this.AQMGraphLocAll.location1 != undefined) {
        this.AQMGraphLoc1 = this.AQMGraphLocAll.location1.data;
        this.AQMGraphLoc1Nm = this.AQMGraphLocAll.location1.place;
        for (let xa = 0; xa < this.AQMGraphLoc1.length; xa++) {
          if (xa == this.AQMGraphLoc1.length - 1) {
            this.AQMGraphLoc1[xa].showX = true;
          } else {
            this.AQMGraphLoc1[xa].showX = false;
          }
        }
      }
      if (this.AQMGraphLocAll.location2 != undefined) {
        this.AQMGraphLoc2 = this.AQMGraphLocAll.location2.data;
        this.AQMGraphLoc2Nm = this.AQMGraphLocAll.location2.place;
        for (let xa1 = 0; xa1 < this.AQMGraphLoc2.length; xa1++) {
          if (xa1 == this.AQMGraphLoc2.length - 1) {
            this.AQMGraphLoc2[xa1].showX = true;
          } else {
            this.AQMGraphLoc2[xa1].showX = false;
          }
        }
      }
      // if (this.AQMGraphLoc1.length > 0 || this.AQMGraphLoc2.length > 0) {
      //   this.NoData = false;
      // } else {
      //   this.NoData = true;
      // }
    }
    // if (this.showCompare == true) {
    //   this.CompareGraph = true;
    if (this.single != undefined) {
      if (this.single.length == 0) {
        this.NoData = false;
      } else {
        this.NoData = true;
      }
    }
    // } else {
    //   this.CompareGraph = false;
    // }
  }

  public location1;
  selectedAQMData1(event) {
    this.AQMGraphLocAll = [];
    var obj = {
      "cityId": this.dataService.SelectedCity,
      "stationId": event
    }
    this.dataService.AQMDataStn(obj).subscribe(data => {
      this.location1 = data;
      this.AQMGraphLoc1 = this.location1.location.data;
      this.AQMGraphLoc1Nm = this.location1.location.place;
      for (let xa = 0; xa < this.AQMGraphLoc1.length; xa++) {
        if (xa == this.AQMGraphLoc1.length - 1) {
          this.AQMGraphLoc1[xa].showX = true;
        } else {
          this.AQMGraphLoc1[xa].showX = false;
        }
      }
    },
      error => {
        console.log(error);
      })
  }

  public location2;
  selectedAQMData2(event) {
    this.AQMGraphLocAll = [];
    var obj = {
      "cityId": this.dataService.SelectedCity,
      "stationId": event
    }
    this.dataService.AQMDataStn(obj).subscribe(data => {
      this.location2 = data;
      this.AQMGraphLoc2 = this.location2.location.data;
      this.AQMGraphLoc2Nm = this.location2.location.place;
      for (let xa1 = 0; xa1 < this.AQMGraphLoc2.length; xa1++) {
        if (xa1 == this.AQMGraphLoc2.length - 1) {
          this.AQMGraphLoc2[xa1].showX = true;
        } else {
          this.AQMGraphLoc2[xa1].showX = false;
        }
      }
    },
      error => {
        console.log(error);
      })
  }

  onSelect(event) {
    console.log(event);
  }

  open(content, type) {
    let size
    if (type == 'cityData') {
      size = "sm";
    } else {
      size = "lg";
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

}
