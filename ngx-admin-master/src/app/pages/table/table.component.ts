import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

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

  constructor(private _adminService: AdminService){
    this.columnDefs = [
              {headerName: 'Place_Org_Name', field: 'place_org_name', editable: true, width: 300},
              {headerName: 'Place_Org_Address', field: 'place_org_address', editable: true},
              {headerName: 'Place_Org_Lat', field: 'place_org_lat', editable: true},
              {headerName: 'Place_Org_Long', field: 'place_org_long', editable: true},
              {headerName: 'Place_Org_Category', field: 'place_org_category', filter: 'agTextColumnFilter', sortable: true, editable: true},
              {headerName: 'Place_Org_Subcategory', field: 'place_org_subcategory', filter: 'agTextColumnFilter', sortable: true, editable: true},
              {headerName: 'Ward_ID', field: 'ward_id', filter: 'agNumberColumnFilter', sortable: true, editable: true},
              {headerName: 'City_ID', field: 'city_id', editable: true},
              {headerName: 'Place_Org_Number', field: 'place_org_number', editable: true},
              {headerName: 'Info', field: 'info', filter: 'agTextColumnFilter', sortable: true, editable: true},
              {headerName: 'Impact', field: 'impact', editable: true},

    ];

    this.editType = "fullRow";
    this.components = { singleClickEditRenderer: getRenderer() };

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
  

  ngOnInit(): void {

   this._adminService.getPublicTableData().subscribe(response => {
    this.rowData = [],
    this.rowList = response;
    this.rowList.forEach(item => {
      this.rowData.push({
        place_org_name: item.place_org_name,
        place_org_address: item.place_org_address,
        place_org_lat: item.place_org_lat,
        place_org_long: item.place_org_long,
        place_org_category: item.place_org_category,
        place_org_subcategory: item.place_org_subcategory,
        ward_id: item.ward_id,
        city_id: item.city_id,
        place_org_number: item.place_org_number,
        info: item.info,
        impact: item.impact
      })
    });
    });
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


