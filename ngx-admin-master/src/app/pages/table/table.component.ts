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
  public rowList;
  public frameworkComponents: any;
  rowDatafromCell = {};
  displayEditModal: any = false;
  formCheck: any;
  modalConfig: any;
  displayModal: any = false;

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('',
      [Validators.required,
      Validators.pattern(/^(([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.)(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){2}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)]),
    category: new FormControl('', Validators.required),
    subcategory: new FormControl('', Validators.required),
    ward_id: new FormControl('', Validators.required),
    city_id: new FormControl('', Validators.required),
    org_number: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    impact: new FormControl('', Validators.required),
  });

  constructor(private _adminService: AdminService){
    this.frameworkComponents = {
      buttonRenderer: EditButtonComponent,
    }

    this.columnDefs = [
              {headerName: 'Name', field: 'name', width: 300, pinned: 'left'},
              {headerName: 'Address', field: 'address', width: 300, pinned: 'left'},
              {headerName: 'Category', field: 'category', filter: 'agTextColumnFilter', width: 300, sortable: true},
              {headerName: 'Subcategory', field: 'subcategory', filter: 'agTextColumnFilter', width: 300, sortable: true},
              {headerName: 'Ward ID', field: 'ward_id', filter: 'agNumberColumnFilter',width: 300, sortable: true},
              {headerName: 'City ID', field: 'city_id', width: 300},
              {headerName: 'Organization Number', field: 'org_number', width: 300},
              {headerName: 'Info', field: 'info', filter: 'agTextColumnFilter', width: 300, sortable: true},
              {headerName: 'Impact', field: 'impact', width: 300, filter: 'agTextColumnFilter', sortable: true},
              {headerName: 'Action', field: 'action', width: 200, editable: false, pinned: 'right', cellRenderer: 'buttonRenderer', cellRendererParams: {
                onClick: this.onBtnClick1.bind(this),
                label: 'Edit'
              }}

    ];

  //  this.editType = "fullRow";
    //this.components = { singleClickEditRenderer: getRenderer() };

  }

  onBtnClick1(e) {
    this.rowDatafromCell = e.rowData;
    console.log(e.rowData.ward_id);
    this.editForm.patchValue({
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
    if (this.formCheck === this.editForm.value) {
      this.displayEditModal = false;
    } else {
    /*  this._adminService.editRowDB(this.editForm.value).subscribe(response => {
        if (response['status'] === 'Success') {
          this.displayEditModal = false;
          this.getDBData();
        }
      });*/
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
    this._adminService.getPublicTableData().subscribe(response => {
      this.rowData = [],
      this.rowList = response;
      this.rowList.forEach(item => {
        this.rowData.push({
          name: item.place_org_name,
          address: item.place_org_address,
          category: item.place_org_category,
          subcategory: item.place_org_subcategory,
          ward_id: item.ward_id,
          city_id: item.city_id,
          org_number: item.place_org_number,
          info: item.info,
          impact: item.impact
        })
      });
      });

  }
  

  ngOnInit(): void {

    this.getDBData();

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


