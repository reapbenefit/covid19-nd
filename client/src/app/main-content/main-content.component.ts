import { Component, OnInit, ElementRef, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ward } from '../services/wards';
import { DataService } from '../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @ViewChild('bar') bar: ElementRef;
  @ViewChild('pie') pie: ElementRef;

  @Input() mapData;
  @Input() graphData;
  @Input() compare;
  @Input() showgraphs;
  @Input() graphDataStatus;
  @Input() showComp;
  @Input() AQMGraphLoc;
  @Input() AQM;
  @Input() selIssCat;
  @Input() WardDetails;
  @Input() showGovernance;
  @Input() wardAgencyList;
  @Input() showAgencies;
  @Input() IssueData;
  @Input() showIssues;
  @Output() hideGraphs = new EventEmitter();
  public MapData;
  public GraphData;
  public GraphData1;
  public GraphData2;
  public Compare;
  public showGraphs = false;
  public GraphDataStatus;
  public Wards;
  public ShowComp = false;
  public AQMGraphLocAll;
  public aqm;
  public SelIssCat;
  public ward1Selected;
  public ward2Selected;
  constructor(private dataService: DataService,
    private modalService: NgbModal) { }

  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select Ward', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 500, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Ward', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  ngOnInit() {
    this.Wards = ward;
    this.Wards.sort(this.dynamicSort("name"));
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
  @Output() WardData = new EventEmitter();
  public wardDataEvent;
  public GovRes;
  public AgencyRes;
  public issueRes;
  wardDetails(event) {
    this.wardDataEvent = event;
    let govObj = {
      "cityId": Number(this.dataService.SelectCityID),
      "wardId": this.wardDataEvent.id
    }
    if (this.ShowGovernance == true) {
      this.dataService.getGovernance(govObj).subscribe(data => {
        this.GovRes = data;
        this.wardIssueData = this.GovRes.issues;
        this.WardDetailsData = this.GovRes.wardDetail[0];
      });
    }
    if (this.ShowAgencies == true) {
      this.dataService.getAgencies(govObj).subscribe(data => {
        this.AgencyRes = data;
        this.WardAgencyList = this.AgencyRes.wardAgencyList;
      });
    }
    if (this.ShowIssues == true) {
      let issObj = {
        "cityId": Number(this.dataService.SelectCityID),
        "wardId": this.wardDataEvent.id,
        "category": this.dataService.SelIssCat
      }
      this.dataService.getReports(issObj).subscribe(data => {
        this.issueRes = data;
        this.validateData(this.issueRes.graph);
      });
    }
    this.WardData.emit(this.wardDataEvent);
  }

  public WardDetailsData = {};
  public wardIssueData = [];
  public WardAgencyList = [];
  public ShowGovernance = false;
  public ShowAgencies = false;
  public ShowIssues = false;
  public issueData;

  ngOnChanges(changes: SimpleChanges) {
    if (this.WardDetails != undefined) {
      this.ShowGovernance = this.showGovernance;
      this.WardDetailsData = this.WardDetails.wardDetail[0];
      this.wardIssueData = this.WardDetails.issues
    } else {
      this.WardDetailsData = {};
    }
    if (this.wardAgencyList != undefined) {
      this.ShowAgencies = this.showAgencies
      this.WardAgencyList = this.wardAgencyList;
    }
    this.ShowIssues = this.showIssues;
    if (this.IssueData != undefined) {
      this.issueData = this.IssueData;
      this.validateData(this.IssueData);
    }
    this.MapData = this.mapData;
    this.GraphData = this.graphData;
    this.Compare = this.compare;
    this.showGraphs = this.showgraphs;
    this.GraphDataStatus = this.graphDataStatus;
    this.ShowComp = this.showComp;
    this.AQMGraphLocAll = this.AQMGraphLoc;
    this.aqm = this.AQM
    this.SelIssCat = this.selIssCat
    this.showCompare = false;
    this.ward2Selected = undefined;
    this.ward1Selected = undefined;
    this.ward1Data = undefined;
    this.ward2Data = undefined;
    if (this.showGraphs == true) {
      this.GraphData = undefined;
      this.GraphDataStatus = undefined;
      this.AQMGraphLocAll = undefined;
      // this.showGraphs = false;
      setTimeout(() => {
        this.GraphData = this.graphData;
        this.GraphDataStatus = this.graphDataStatus;
        this.AQMGraphLocAll = this.AQMGraphLoc;
        this.showGraphs = true;
      }, 10);
    }
  }

  public colorScheme = {
    domain: ["#EF5350", "#AB47BC", "#B2FF59", "#EEFF41"]
  };
  public view: any[] = [500, 100];
  public viewComp: any[] = [400, 100];
  public showXAxis = false;
  public showYAxis = false;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = '';
  public showYAxisLabel = true;
  public yAxisLabel = '';
  public showDataLabel = true;
  public IssueDataList = [];

  GetDataForCompare() {
    let obj = {
      "cityId": this.dataService.SelectedCity,
      "wardId1": this.ward1,
      "wardId2": this.ward2,
      "category": this.dataService.SelIssCat == undefined ? undefined : this.dataService.SelIssCat
    }
    this.dataService.compareReport(obj).subscribe(data => {
      console.log(data);
      this.wardData = data;
      this.GraphData1 = this.wardData.graph;
      this.validateCompareWardData(this.GraphData1);
    },
      error => {
        console.log(error);
      });
  }

  validateData(data) {
    this.IssueDataList = [];
    data.wardGraph
    for (let wg = 0; wg < data.wardGraph.length; wg++) {
      let graph = {
        "name": data.wardGraph[wg].category,
        "series": [
          {
            "name": "Open",
            "value": data.wardGraph[wg].open
          },
          {
            "name": "Assigned",
            "value": data.wardGraph[wg].assigned
          }, {
            "name": "Resolved",
            "value": data.wardGraph[wg].resolved
          }
        ]
      }
      let Isswardsdata = {
        "name": data.wardGraph[wg].category,
        "agency": data.wardGraph[wg].agency,
        "cntNum": data.wardGraph[wg].contactNum,
        "graphData": [graph]
      }
      this.IssueDataList.push(Isswardsdata);
    }
  }

  showPie = true;
  ChartView(type) {
    if (type == "Bar") {
      this.showPie = true;
    } else {
      this.showPie = false;
    }
  }

  private showCompare = false;
  compareMethod(type) {
    this.showCompare = !this.showCompare;
  }

  private ward1;
  compareSelected1(event) {
    if (event.value.id != undefined) {
      this.ward1 = event.value.id;
    }
  }

  private statusSelected;
  StatusSelected(event) {
    this.statusSelected = event
  }

  public ward2;
  public wardData;
  public multi = [];
  public multi2 = []
  public compareGraph;
  public ward1Data;
  public ward2Data;
  compareSelected2(event) {
    if (event.value.id != undefined) {
      this.ward2 = event.value.id;
    }
  }

  public ward1DataGraph = [];
  public ward2DataGraph = [];
  validateCompareWardData(data) {
    data.wardGraph
    let IsswardsdataComp2
    let IsswardsdataComp1
    let ward1Graph
    let ward2Graph
    if (data.ward1.length > 0) {
      for (let wg = 0; wg < data.ward1.length; wg++) {
        let graphComp1 = {
          "name": data.ward1[wg].category,
          "series": [
            {
              "name": "Open",
              "value": data.ward1[wg].open
            },
            {
              "name": "Assigned",
              "value": data.ward1[wg].assigned
            }, {
              "name": "Resolved",
              "value": data.ward1[wg].resolved
            }
          ]
        }
        IsswardsdataComp1 = {
          "name": data.ward1[wg].category,
          "agency": data.ward1[wg].agency,
          "cntNum": data.ward1[wg].contactNum,
          "graphData": [graphComp1]
        }
        ward1Graph = IsswardsdataComp1.graphData == undefined ? [] : IsswardsdataComp1.graphData;
      }
    }
    if (data.ward2.length > 0) {
      for (let wg = 0; wg < data.ward2.length; wg++) {
        let graphComp2 = {
          "name": data.ward2[wg].category,
          "series": [
            {
              "name": "Open",
              "value": data.ward2[wg].open
            },
            {
              "name": "Assigned",
              "value": data.ward2[wg].assigned
            }, {
              "name": "Resolved",
              "value": data.ward2[wg].resolved
            }
          ]
        }
        IsswardsdataComp2 = {
          "name": data.ward2[wg].category,
          "agency": data.ward2[wg].agency,
          "cntNum": data.ward2[wg].contactNum,
          "graphData": [graphComp2]
        }
        ward2Graph = IsswardsdataComp2.graphData == undefined ? [] : IsswardsdataComp2.graphData;
      }
    }
    this.ward1DataGraph = ward1Graph == undefined ? [] : ward1Graph;
    this.ward2DataGraph = ward2Graph == undefined ? [] : ward2Graph;
  }

  hideGraph() {
    this.showGraphs = false;
    this.hideGraphs.emit(this.showGraphs);
  }
  hideGovernance() {
    this.ShowGovernance = false;
    this.hideGraphs.emit(this.ShowGovernance);
  }
  hideAgencies() {
    this.ShowAgencies = false;
    this.hideGraphs.emit(this.ShowAgencies);
  }
  hideIssues() {
    this.ShowIssues = false;
    this.hideGraphs.emit(this.ShowIssues);
  }

  open(content, type) {
    let size
    if (type == "comapre") {
      size = "lg";
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }
}

