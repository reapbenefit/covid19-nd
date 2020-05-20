import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { EditButtonComponent } from '../../edit-button/edit-button.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public rowDat = [];
  public rowData = [];
  public editType;
  public editingRowIndex;
  public components;
  public errorMsg = "";
  public rowList = [];
  public frameworkComponents: any;
  rowDatafromCell = {};
  displayEditModal: any = false;
  formCheck: any;
  modalConfig: any;
  displayModal: any = false;
  public noRowsTemplate;

  tableheight = window.document.body.clientHeight - 200;

  editForm = new FormGroup({
    org_id: new FormControl(),
    name: new FormControl(),
    address: new FormControl(),
    category: new FormControl(null, Validators.required),
    subcategory: new FormControl(null, Validators.required),
    ward_id: new FormControl(),
    city_id: new FormControl(),
    org_number: new FormControl(),
    info: new FormControl(),
    impact: new FormControl(),
  });

  constructor(private _adminService: AdminService){
    
    this.noRowsTemplate =
      `<span class="ag-overlay-loading-center">Loading Data...</span>`;
    
    this.frameworkComponents = {
      buttonRenderer: EditButtonComponent,
    }

    this.columnDefs = [
              {headerName: 'Org ID', field: 'org_id', width: 300, pinned: 'left', hide: true},
              {headerName: 'Name', field: 'name', width: 300, pinned: 'left', sortable: true, filter: 'agTextColumnFilter'},
              {headerName: 'Address', field: 'address', width: 300, pinned: 'left'},
              {headerName: 'Category', field: 'category', filter: 'agTextColumnFilter', width: 300, sortable: true},
              {headerName: 'Subcategory', field: 'subcategory', filter: 'agTextColumnFilter', width: 300, sortable: true},
              {headerName: 'Ward ID', field: 'ward_id', filter: 'agNumberColumnFilter',width: 300, sortable: true},
              {headerName: 'City ID', field: 'city_id', width: 300},
              {headerName: 'Organization Number', field: 'org_number', width: 300},
              {headerName: 'Info', field: 'info', filter: 'agTextColumnFilter', width: 300, sortable: true},
              {headerName: 'Impact', field: 'impact', width: 300, filter: 'agNumberColumnFilter', sortable: true},
              {headerName: 'Action', field: 'action', width: 200, editable: false, pinned: 'right', cellRenderer: 'buttonRenderer', cellRendererParams: {
                onClick: this.onBtnClick1.bind(this),
                label: 'Edit',
                
              }}

    ];

  //  this.editType = "fullRow";
    //this.components = { singleClickEditRenderer: getRenderer() };

  }

  onBtnClick1(e) {
    this.rowDatafromCell = e.rowData;
    console.log(e.rowData.ward_id);
    this.editForm.patchValue({
      org_id: e.rowData.org_id,
      name: e.rowData.name,
      address: e.rowData.address,
      category: e.rowData.category,
      subcategory: e.rowData.subcategory,
      ward_id: e.rowData.ward_id,
      city_id: e.rowData.city_id,
      org_number: e.rowData.org_number,
      info: e.rowData.info,
      impact: e.rowData.impact
    });

    this.formCheck = this.editForm.value;
    this.displayEditModal = true;
  }

  hideModal() {
    this.displayModal = false;
    this.displayEditModal = false;
  }

  onEditFormSubmit() {

    console.log("called");
    if (this.formCheck === this.editForm.value) {
      console.log("go 1");
      this.displayEditModal = false;
    } else {
      console.log("go 2");
      console.log(this.editForm.value);
      
      this._adminService.EditFormSubmit(this.editForm.value).subscribe(response => {
        console.log(response);
        if (response['msg'] === 'Success') {
          this.displayEditModal = false;
          this.getDBData();
        }
      });
    }
  }

  onCellClicked($event){
    // check whether the current row is already opened in edit or not
    if(this.editingRowIndex != $event.rowIndex) {
      console.log($event);
      $event.api.startEditingCell({
        rowIndex: $event.rowIndex,
        colKey: $event.column.colId
      });
      this.editingRowIndex = $event.rowIndex;
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  getDBData()
  {
    console.log("hello");
    this._adminService.getPublicTableData().subscribe(response => {
      console.log(response);
      this.rowData = [];
      this.rowList = response;
      this.rowList.forEach(item => {
        this.rowData.push({
          org_id: item.place_org_id,
          name: item.place_org_name,
          address: item.place_org_address,
          category: item.place_org_category,
          subcategory: item.place_org_subcategory,
          ward_id: item.ward_id,
          city_id: item.city_id,
          org_number: item.place_org_number,
          info: item.info,
          impact: item.impact
        });
      });
      });

  }
  

  ngOnInit(): void {

    this.getDBData();
    console.log(this.rowData);

  }
}


function getRenderer() {
  function CellRenderer() {}
  CellRenderer.prototype.createGui = function() {
    var template =
      '<span><span id="theValue" style="padding-left: 2px;"></span><button style="float:left" id="theButton">#</button></span>';
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = template;
    this.eGui = tempDiv.firstElementChild;
  };
  CellRenderer.prototype.init = function(params) {
    this.createGui();
    this.params = params;
    var eValue = this.eGui.querySelector("#theValue");
    eValue.innerHTML = params.value;
    this.eButton = this.eGui.querySelector("#theButton");
    this.buttonClickListener = this.onButtonClicked.bind(this);
    this.eButton.addEventListener("click", this.buttonClickListener);
  };
  CellRenderer.prototype.onButtonClicked = function() {
    var startEditingParams = {
      rowIndex: this.params.rowIndex,
      colKey: this.params.column.getId()
    };
    this.params.api.startEditingCell(startEditingParams);
  };
  CellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  CellRenderer.prototype.destroy = function() {
    this.eButton.removeEventListener("click", this.buttonClickListener);
  };
  return CellRenderer;
}

function editClicked(){
  window.alert("edit clicked: ");
}

function editCellRendererFunc(params) {
  params.$scope.editClicked = editClicked;
  //return '<button ng-click="ageClicked(data.age)" ng-bind="data.age"></button>';
  return '<button ng-click="editClicked()">Edit</button>';
}


